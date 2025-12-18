import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaUserAlt, FaBoxOpen, FaMoneyBillWave, FaClock } from 'react-icons/fa'
import { dashboardListHandler } from '../../store/slice/dashboard/dashboard-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const MetricCard: React.FC<{ title: string; value: string; change?: string; icon: React.ReactNode }> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm ">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="mt-2 text-2xl font-bold">{value}</div>
        </div>
        <div className="text-[#2B6CE4] bg-blue-50 rounded-full p-2 h-10 w-10 flex items-center justify-center">{icon}</div>
      </div>
      {change && (
        <div className="mt-3 text-sm text-green-500 flex items-center gap-2">{change}</div>
      )}
    </div>
  )
}

const Dashboard: React.FC = () => {

  const dispatch = useAppDispatch();
  const { data: dashboard = [] } = useAppSelector((s) => s.dashboard)
  const [filter, setFilter] = useState("Last 7 day");
  const [state, setState] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    dispatch(dashboardListHandler());
  }, [dispatch]);

  useEffect(() => {
    if (dashboard) {
      setState(dashboard?.stats);
      setSales(dashboard?.chart?.sales || []);
    }
  }, [dashboard]);

  // For easier testing: if the returned sales array is too short, synthesize ~90 days of data
  useEffect(() => {
    if (!Array.isArray(sales) || sales.length >= 60) return;

    // generate 90 days ending at latest provided date (or today)
    const last = sales.length ? new Date(sales[sales.length - 1].date) : new Date();
    last.setHours(0,0,0,0);
    const start = new Date(last);
    start.setDate(start.getDate() - 89);

    const generated:any[] = [];
    for (let i = 0; i < 90; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const amount = 25000 + Math.round(15000 * (0.5 + 0.5 * Math.sin(i * 0.25)));
      generated.push({ date: d.toISOString().slice(0,10), amount });
    }

    // merge: prefer real sales if they have the same date
    const merged = generated.map(g => {
      const found = sales.find((s:any) => s.date === g.date);
      return found ? found : g;
    });

    setSales(merged);
  }, [sales]);
  // chart layout and margins for tidy axes
  const margins = { left: 60, right: 20, top: 20, bottom: 40 };
  const chart = { width: 1000, height: 300, baselineY: 300 - margins.bottom, chartHeight: 300 - margins.top - margins.bottom };

  const generatePath = (data: any[]) => {
    if (!Array.isArray(data) || data.length === 0) return "";

    const maxAmount = Math.max(...data.map((d: any) => d.amount));
    const max = maxAmount > 0 ? maxAmount : 1;

    if (data.length === 1) {
      const y = chart.baselineY - (data[0].amount / max) * chart.chartHeight;
      return `M${margins.left} ${y}`;
    }

    const innerWidth = chart.width - margins.left - margins.right;
    const stepX = innerWidth / (data.length - 1);

    return data
      .map((d: any, i: number) => {
        const x = margins.left + i * stepX;
        const y = chart.baselineY - (d.amount / max) * chart.chartHeight;
        return `${i === 0 ? "M" : "L"}${x} ${y}`;
      })
      .join(" ");
  };

  // Use real date ranges for filtering instead of slicing by count
  const getFilteredData = () => {
    const nowRaw = new Date();
    const today = new Date(nowRaw.getFullYear(), nowRaw.getMonth(), nowRaw.getDate());
    const copy = (Array.isArray(sales) ? [...sales] : []).sort((a:any,b:any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const inRange = (d:any, from:Date, to:Date) => {
      const dt = new Date(d.date);
      dt.setHours(0,0,0,0);
      return dt.getTime() >= from.getTime() && dt.getTime() <= to.getTime();
    }

    switch (filter) {
      case "Today": {
        const from = new Date(today);
        const to = new Date(today);
        return copy.filter(d => inRange(d, from, to));
      }

      case "Last 7 day": {
        const from = new Date(today);
        from.setDate(today.getDate() - 6);
        return copy.filter(d => inRange(d, from, today));
      }

      case "Last Month": {
        const from = new Date(today);
        from.setDate(today.getDate() - 29);
        return copy.filter(d => inRange(d, from, today));
      }

      case "Last 3 Month": {
        const from = new Date(today);
        from.setDate(today.getDate() - 89);
        return copy.filter(d => inRange(d, from, today));
      }

      case "All":
      default:
        return copy;
    }
  };

  const filteredData = getFilteredData();
  const path = generatePath(filteredData);

  // Axis helpers
  const getYTicks = (data:any[]) => {
    if (!data || data.length === 0) return [];
    const max = Math.max(...data.map((d:any) => d.amount));
    const ticks = 4;
    return Array.from({length: ticks}, (_, i) => Math.round((max * i) / (ticks - 1)));
  }

  const getXTicks = (data:any[]) => {
    if (!data || data.length === 0) return [];
    const n = data.length;
    const indices = new Set([0, Math.floor(n/4), Math.floor(n/2), Math.floor(3*n/4), n-1]);
    return Array.from(indices).map(i => ({ index: i, date: data[i].date }));
  };

  const yTicks = getYTicks(filteredData);
  const xTicks = getXTicks(filteredData);
  const maxAmount = filteredData.length ? Math.max(...filteredData.map((d:any) => d.amount)) : 1;

  // recompute step based on inner width/margins
  const innerWidth = chart.width - margins.left - margins.right;
  const stepXForTicks = filteredData.length > 1 ? innerWidth / (filteredData.length - 1) : 0;
  const formatDateShort = (d:string) => {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };


  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t('dashboard')}</h1>
      </div>

      {/* Top metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title={t('total_users')} value={state?.totalUsers} change={t('change_up_from_yesterday', { percent: '+8.5%' })} icon={<FaUserAlt size={24} />} />
        <MetricCard title={t('total_orders')} value={state?.totalOrders} change={t('change_up_from_past_week', { percent: '+1.3%' })} icon={<FaBoxOpen size={24} />} />
        <MetricCard title={t('total_sales')} value={`$ ${state?.totalSales}`} change={t('change_down_from_yesterday', { percent: '-4.3%' })} icon={<FaMoneyBillWave size={24} />} />
        <MetricCard title={t('total_pending')} value={state?.totalPending} change={t('change_up_from_yesterday', { percent: '+1.8%' })} icon={<FaClock size={24} />} />
      </div>

      {/* Sales card */}
      <div className="bg-white rounded-lg shadow-sm ">
        <div className="flex items-center justify-between p-4 ">
          <h2 className="text-lg font-semibold">{t('sales_details')}</h2>
          <div className="flex items-center gap-3">
            <select className="text-sm  rounded px-3 py-1 bg-white" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="Today">{t('filter_today')}</option>
              <option value="Last 7 day">{t('filter_last_7_day')}</option>
              <option value="Last Month">{t('filter_last_month')}</option>
              <option value="Last 3 Month">{t('filter_last_3_month')}</option>
              <option value="All">{t('filter_all')}</option>
            </select>
            <div className="border-l pl-2 ml-2">
              <select className="text-sm  rounded px-3 py-1 bg-white">
                <option>{t('export_pdf')}</option>
                <option>{t('export_csv')}</option>
            </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="relative h-72">

            <svg viewBox="0 0 1000 300" className="w-full h-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2B6CE4" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#2B6CE4" stopOpacity="0.03" />
                </linearGradient>
              </defs>

              {filteredData.length === 0 ? (
                <>
                  <path d={`M${margins.left} ${chart.height} L${chart.width - margins.right} ${chart.height} L${chart.width - margins.right} ${chart.height} L${margins.left} ${chart.height} Z`} fill="url(#g1)" />
                  <text x={chart.width/2} y={chart.height/2} textAnchor="middle" fill="#666">{t('no_data_selected_range')}</text>
                </>
              ) : (
                <>
                  {/* Y axis grid lines and labels */}
                  {yTicks.map((val, i) => {
                    const y = chart.baselineY - (val / Math.max(1, maxAmount)) * chart.chartHeight;
                    return (
                      <g key={`y-${i}`}>
                        <line x1={margins.left} x2={chart.width - margins.right} y1={y} y2={y} stroke="#F1F5F9" />
                        <text x={margins.left - 8} y={y + 4} fontSize={12} fill="#64748b" textAnchor="end">{val.toLocaleString()}</text>
                      </g>
                    )
                  })}

                  {/* X axis ticks and labels */}
                  {xTicks.map((t:any, idx:any) => {
                    const x = margins.left + t.index * (stepXForTicks);
                    return (
                      <g key={`x-${idx}`}>
                        <line x1={x} x2={x} y1={chart.baselineY} y2={chart.baselineY + 6} stroke="#CBD5E1" />
                        <text x={x} y={chart.baselineY + 22} fontSize={12} fill="#64748b" textAnchor="middle">{formatDateShort(t.date)}</text>
                      </g>
                    )
                  })}

                  <path
                    d={`${path} L${chart.width - margins.right} ${chart.height} L${margins.left} ${chart.height} Z`}
                    fill="url(#g1)"
                  />

                  <path
                    d={path}
                    stroke="#2B6CE4"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard