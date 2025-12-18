import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { projectListHandler } from '../../store/slice/project/project-slice'
import TableComponent from '../../components/common/table/Table'
import BreadcrumbComponent from '../../components/common/breadcrumb/Breadcrumd'
import { Button } from 'flowbite-react'
import { deleteProjectHandler } from '../../store/slice/project/project-delete-slice'

const ProjectList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: projects = [] } = useAppSelector((s) => s.projects)
  const [projectDataList, setProjectDataList] = useState<any[]>([]);
  
  const [page, setPage] = useState<number>(1)
  const pageSize = 10
  const total = projects ? projects.length : 0
 
  const [filterBy, setFilterBy] = useState<string>('all')
  const [dateRange, setDateRange] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')

  useEffect(() => {
    let reqUser = {
      page: page,
      limit: pageSize,
    }
    dispatch(projectListHandler(reqUser))
  }, [dispatch])

  useEffect(() => {
    if (projects && projects.length) {
      setProjectDataList(projects)
    } 
  }, [projects])

  const resetFilters = useCallback(() => {
    setFilterBy('all')
    setDateRange('all')
    setStatus('all')
  }, [])

  const filtered = useMemo(() => {
    return (projectDataList || projects || []).filter((p: any) => {
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
  }, [projects, status, dateRange, filterBy, projectDataList])

  const OpenAddModel = useCallback(() => {
    navigate("/projects/add")
  }, [navigate])

  const Deletecall = useCallback((id:string) => {
    dispatch(deleteProjectHandler(id))
  }, [dispatch])

  const projectColumns = useMemo(() => [
    { key: "customer", label: t('customer').toUpperCase() },
    { key: 'ref', label: t('ref_number').toUpperCase() },
    { key: 'projectRef', label: t('project_reference').toUpperCase(), render: (row: any) => (<div><div className="font-medium">{row.name}</div><div className="text-xs text-gray-400">{row.projectNumber}</div></div>) },
    { key: 'location', label: t('project_location').toUpperCase(), render: (row: any) => (<div><div>{row.area}</div><div className="text-xs text-gray-400">{row.address}</div></div>) },
     { key: 'action', label: t('action').toUpperCase(), render: (row: any) => (
     <div className='flex'> 
      <Button className="ml-2 text-gray-800" size="sm" onClick={() => navigate(`/projects/${row.id}`)}>{t('edit')}</Button>
      <Button className="ml-2" size="sm" color="failure" onClick={() =>Deletecall(row?.id)}>{t('delete')}</Button>
     </div>) },
  ], [t]);

  return (
    <div>
      <BreadcrumbComponent  Name={t('projects')}  isOpenAddModel= {OpenAddModel}  resetFilters={resetFilters} dateRange={dateRange} setDateRange={setDateRange} setStatus={setStatus} />
      <TableComponent columns={projectColumns} data={filtered || []} />
    </div>
  )
}

export default ProjectList