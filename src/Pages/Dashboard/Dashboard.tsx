import React from 'react'
import { FaUserAlt, FaBoxOpen, FaMoneyBillWave, FaClock } from 'react-icons/fa'

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
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Top metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total User" value="40,689" change="+8.5% Up from yesterday" icon={<FaUserAlt size={24} />} />
        <MetricCard title="Total Order" value="10,293" change="+1.3% Up from past week" icon={<FaBoxOpen size={24} />} />
        <MetricCard title="Total Sales" value="$89,000" change={"-4.3% Down from yesterday"} icon={<FaMoneyBillWave size={24} />} />
        <MetricCard title="Total Pending" value="2,040" change={"+1.8% Up from yesterday"} icon={<FaClock size={24} />} />
      </div>

      {/* Sales card */}
      <div className="bg-white rounded-lg shadow-sm ">
        <div className="flex items-center justify-between p-4 ">
          <h2 className="text-lg font-semibold">Sales Details</h2>
          <div className="flex items-center gap-3">
            <select className="text-sm  rounded px-3 py-1 bg-white">
              <option> Today</option>
              <option> Yesterday</option>
              <option> Last 7 day</option>
              <option> Last Month</option>
              <option> Last 3 Month</option>
              <option> All </option>
            </select>
            <div className="border-l pl-2 ml-2">
              <select className="text-sm  rounded px-3 py-1 bg-white">
                <option> Export PDF</option>
                <option> Export CSV</option>

              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="relative h-72">
            {/* Gradient area */}
            <svg viewBox="0 0 1000 300" className="w-full h-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2B6CE4" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#2B6CE4" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
              <path d="M0 200 C120 150 220 60 300 90 C380 120 480 160 560 140 C640 120 740 170 820 140 C900 110 960 120 1000 100 L1000 300 L0 300 Z" fill="url(#g1)" />
              <path d="M0 200 C120 150 220 60 300 90 C380 120 480 160 560 140 C640 120 740 170 820 140 C900 110 960 120 1000 100" stroke="#2B6CE4" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* tooltip marker */}
              <g>
                <circle cx="300" cy="90" r="5" fill="#2B6CE4" />
                <rect x="280" y="50" rx="4" ry="4" width="110" height="28" fill="#2B6CE4" />
                <text x="335" y="70" fill="#fff" fontSize="12" fontWeight="600" textAnchor="middle">64,394.77</text>
              </g>

            </svg>
          </div>
        </div>
      </div>

      {/* Additional lower section sample */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">Quick Stats / Widgets</div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">Recent Activity</div>
      </div>
    </div>
  )
}

export default Dashboard
