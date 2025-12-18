import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchEstimations, deleteEstimationThunk } from '../../store/slice/estimation/estimation-slice'
import BreadcrumbComponent from '../../components/common/breadcrumb/Breadcrumd'

const EstimationList: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { data: estimations } = useAppSelector((s) => s.estimations)

  useEffect(() => {
    dispatch(fetchEstimations())
  }, [dispatch])


    const [filterBy, setFilterBy] = useState<string>('all')
    const [dateRange, setDateRange] = useState<string>('all')
    const [status, setStatus] = useState<string>('all')

    const resetFilters = () => {
      setFilterBy('all')
      setDateRange('all')
      setStatus('all')
    }
  
    const filtered = useMemo(() => {
      return estimations.filter((p: any) => {
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
  

    const OpenAddModel = () => {
    navigate("/estimations/new")
  }

  return (
    <div>
      {/* <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Estimations</h1>
        <Link to="/estimations/new" className="bg-blue-600 text-white px-3 py-2 rounded">New Estimation</Link>
      </div> */}

      <BreadcrumbComponent  Name="Estimations"  isOpenAddModel= {OpenAddModel}  resetFilters={resetFilters} dateRange={dateRange} setDateRange={setDateRange} setStatus={setStatus} />

      <div className="mt-4 bg-white rounded shadow overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Created At</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {estimations.map((e: any) => (
              <tr key={e.id} className="border-t">
                <td className="p-2">{e.title}</td>
                <td className="p-2">{e.createdAt}</td>
                <td className="p-2">
                  <Link to={`/estimations/${e.id}/edit`} className="text-blue-600 mr-2">Edit</Link>
                  <button onClick={async () => { await dispatch(deleteEstimationThunk(e.id)); dispatch(fetchEstimations()) }} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EstimationList
