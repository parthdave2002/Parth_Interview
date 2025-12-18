import React, { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { createEstimationThunk } from '../../store/slice/estimation/estimation-slice'

type Item = {
  id: string
  title: string
  description?: string
  unit?: string
  quantity: number
  price: number
  margin: number
  total: number
}

type Section = {
  id: string
  title: string
  items: Item[]
}

const emptyItem = (): Item => ({ id: uuidv4(), title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0, total: 0 })
const emptySection = (): Section => ({ id: uuidv4(), title: 'New Section', items: [emptyItem()] })

import calculateEstimationTotal from '../../utils/calculateEstimationTotal'

const calculateItemTotal = (quantity: number, price: number, margin: number) => {
  return calculateEstimationTotal(quantity, price, margin)
}

const EstimationForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [sections, setSections] = useState<Section[]>([emptySection()])

  const addSection = () => setSections((s) => [...s, emptySection()])
  const removeSection = (sectionId: string) => setSections((s) => s.filter((sec) => sec.id !== sectionId))

  const addItem = (sectionId: string) => {
    setSections((s) => s.map((sec) => (sec.id === sectionId ? { ...sec, items: [...sec.items, emptyItem()] } : sec)))
  }
  const removeItem = (sectionId: string, itemId: string) => {
    setSections((s) => s.map((sec) => (sec.id === sectionId ? { ...sec, items: sec.items.filter((it) => it.id !== itemId) } : sec)))
  }

  const updateItem = (sectionId: string, itemId: string, patch: Partial<Item>) => {
    setSections((s) =>
      s.map((sec) =>
        sec.id === sectionId
          ? { ...sec, items: sec.items.map((it) => (it.id === itemId ? { ...it, ...patch, total: calculateItemTotal(patch.quantity ?? it.quantity, patch.price ?? it.price, patch.margin ?? it.margin) } : it)) }
          : sec,
      ),
    )
  }

  const grandTotal = useMemo(() => {
    return sections.reduce((sg, sec) => sg + sec.items.reduce((st, it) => st + it.total, 0), 0)
  }, [sections])

  const dispatch = useAppDispatch()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(createEstimationThunk({ title: id ? `Estimate ${id}` : 'New Estimate', sections }))
    navigate('/estimations')
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{id ? 'Edit' : 'New'} Estimation</h1>
        <div className="space-x-2">
          <button onClick={addSection} className="bg-green-600 text-white px-3 py-2 rounded">+ Add Section</button>
        </div>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-3">
              <input className="text-lg font-semibold" value={section.title} onChange={(e) => setSections((s) => s.map((sec) => (sec.id === section.id ? { ...sec, title: e.target.value } : sec)))} />
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => addItem(section.id)} className="bg-blue-600 text-white px-2 py-1 rounded">+ Item</button>
                <button type="button" onClick={() => removeSection(section.id)} className="bg-red-500 text-white px-2 py-1 rounded">Remove Section</button>
              </div>
            </div>

            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end border-t pt-3">
                  <div className="md:col-span-2">
                    <label className="text-sm">Title</label>
                    <input value={item.title} onChange={(e) => updateItem(section.id, item.id, { title: e.target.value })} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div>
                    <label className="text-sm">Unit</label>
                    <input value={item.unit} onChange={(e) => updateItem(section.id, item.id, { unit: e.target.value })} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div>
                    <label className="text-sm">Qty</label>
                    <input type="number" min={0} value={item.quantity} onChange={(e) => updateItem(section.id, item.id, { quantity: Number(e.target.value) })} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div>
                    <label className="text-sm">Price</label>
                    <input type="number" min={0} value={item.price} onChange={(e) => updateItem(section.id, item.id, { price: Number(e.target.value) })} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div>
                    <label className="text-sm">Margin %</label>
                    <input type="number" min={0} value={item.margin} onChange={(e) => updateItem(section.id, item.id, { margin: Number(e.target.value) })} className="w-full border px-2 py-1 rounded" />
                  </div>
                  <div className="md:col-span-1">
                    <div className="text-sm">Total</div>
                    <div className="font-semibold">{item.total.toFixed(2)}</div>
                    <div className="mt-2">
                      <button type="button" onClick={() => removeItem(section.id, item.id)} className="text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Grand Total</div>
            <div className="text-2xl font-bold">${grandTotal.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Estimation</button>
        </div>
      </form>
    </div>
  )
}

export default EstimationForm
