import React, { useMemo, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { estimateListHandler } from '../../store/slice/estimation/estimation-slice'
import BreadcrumbComponent from '../../components/common/breadcrumb/Breadcrumd';
import TableComponent from '../../components/common/table/Table'
import { Button } from 'flowbite-react'
import { t } from 'i18next'
import { deleteestimateHandler } from '../../store/slice/estimation/estimation-delete-slice'

const EstimationList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { data: estimations = [] } = useAppSelector((s) => s.estimations)

  useEffect(() => {
    let reqUser = {
      page: 1,
      limit: 10,
    }
    dispatch(estimateListHandler(reqUser))
  }, [dispatch])


    const [filterBy, setFilterBy] = useState<string>('all')
    const [dateRange, setDateRange] = useState<string>('all')
    const [status, setStatus] = useState<string>('all')

const resetFilters = useCallback(() => {
      setFilterBy('all')
      setDateRange('all')
      setStatus('all')
    }, [])
  
    const filtered = useMemo(() => {
      return ( estimations || []).filter((p: any) => {
        if (status !== 'all' && p.status !== status) return false
        // dateRange simple check: last 7 days, 30 days etc
        if (dateRange !== 'all' && p.createdAt) {
          const days = dateRange === '7' ? 7 : dateRange === '30' ? 30 : 0
          if (days > 0) {
            const created = new Date(p.createdAt)
            const cutoff = new Date()
            cutoff.setDate(cutoff.getDate() - days)
            if (created < cutoff) return false
          }
        }
        // filterBy could be project name / client
        if (filterBy !== 'all') {
          const q = filterBy.toLowerCase()
          if (!(`${p.name || ''}`.toLowerCase().includes(q) || `${p.client || ''}`.toLowerCase().includes(q))) return false
        }
        return true
      })
    }, [estimations, status, dateRange, filterBy])
  
  
    const OpenAddModel = useCallback(() => {
    navigate("/estimations/add")
  }, [navigate])

  const Deletecall = useCallback((id: string) => {
    dispatch(deleteestimateHandler(id))
  }, [dispatch])

  const estimateColumns = useMemo(() => [
    { key: "version", label: t('version').toUpperCase() },
    { key: 'project', label: t('project').toUpperCase() },
    { key: 'customer', label: t('client').toUpperCase() },
    { key: 'dueDate', label: t('created date').toUpperCase() },
    { key: 'modified', label: t('last modified').toUpperCase() },
    { key: 'status', label: t('status').toUpperCase(), render: (row: any) => (<div className='bg-green-700 text-white px-4 rounded-xl'>{row?.status}</div>) },
    {
      key: 'action', label: t('action').toUpperCase(), render: (row: any) => (
        <div className='flex'>
          <Button className="ml-2 text-gray-800" size="sm" onClick={() => navigate(`/projects/${row.id}`)}>{t('edit')}</Button>
          <Button className="ml-2" size="sm" color="failure" onClick={() => Deletecall(row?.id)}>{t('delete')}</Button>
        </div>)
    },
  ], [t]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Estimations</h1>
        <Link to="/estimations/add" className="bg-blue-600 text-white px-3 py-2 rounded">New Estimation</Link>
      </div>

      {/* <BreadcrumbComponent  Name="Estimations"  isOpenAddModel= {OpenAddModel}  resetFilters={resetFilters} dateRange={dateRange} setDateRange={setDateRange} setStatus={setStatus} /> */}
      <TableComponent columns={estimateColumns} data={filtered || []} />
    </div>
  )
}

export default EstimationList
