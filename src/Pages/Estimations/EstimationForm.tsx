import React, { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { createEstimationThunk } from '../../store/slice/estimation/estimation-slice'
import calculateEstimationTotal from '../../utils/calculateEstimationTotal'
import Inputbox from '../../components/common/input/Inputbox'
import { MdAdd } from 'react-icons/md'

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


const calculateItemTotal = (quantity: number, price: number, margin: number) => {
  return calculateEstimationTotal(quantity, price, margin)
}

const EstimationForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [sections, setSections] = useState<Section[]>([emptySection()])

  const addSection = React.useCallback(() => setSections((s) => [...s, emptySection()]), [setSections])
  const removeSection = React.useCallback((sectionId: string) => setSections((s) => s.filter((sec) => sec.id !== sectionId)), [setSections])

  const addItem = React.useCallback((sectionId: string) => {
    setSections((s) => s.map((sec) => (sec.id === sectionId ? { ...sec, items: [...sec.items, emptyItem()] } : sec)))
  }, [setSections])
  const removeItem = React.useCallback((sectionId: string, itemId: string) => {
    setSections((s) => s.map((sec) => (sec.id === sectionId ? { ...sec, items: sec.items.filter((it) => it.id !== itemId) } : sec)))
  }, [setSections])

  const updateItem = React.useCallback((sectionId: string, itemId: string, patch: Partial<Item>) => {
    setSections((s) =>
      s.map((sec) =>
        sec.id === sectionId
          ? { ...sec, items: sec.items.map((it) => (it.id === itemId ? { ...it, ...patch, total: calculateItemTotal(patch.quantity ?? it.quantity, patch.price ?? it.price, patch.margin ?? it.margin) } : it)) }
          : sec,
      ),
    )
  }, [setSections])

  const grandTotal = useMemo(() => {
    return sections.reduce((sg, sec) => sg + sec.items.reduce((st, it) => st + it.total, 0), 0)
  }, [sections])

  const dispatch = useAppDispatch()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(createEstimationThunk({ title: id ? `Estimate ${id}` : 'New Estimate', sections }))
    navigate('/estimations')
  }

  const Closecall = () => {
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

      {/* Form area: left - sections, right - summary */}
      <form onSubmit={submit} className="mt-4 space-y-6 ">
        <div className="md:col-span-2 space-y-6">

          <div className="hidden md:grid grid-cols-8 gap-2 text-xs text-gray-500 px-1 pb-2 border-b">
            <div className="col-span-2 font-semibold">ITEM</div>
            <div className="font-semibold">DESCRIPTION</div>
            <div className="font-semibold">UNIT</div>
            <div className="font-semibold">QUANTITY</div>
            <div className="font-semibold">PRICE ($)</div>
            <div className="font-semibold">MARGIN (%)</div>
          </div>
          {sections.map((section) => (
            <div key={section.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm"><MdAdd  /> </div>
                  <Inputbox type='text' id={`section-${section.id}-title`} name={`section-${section.id}-title`} placeholder="Sample Section" className="text-lg font-semibold border-b pb-1"  onChange={(e:any) => setSections((s) => s.map((sec) => (sec.id === section.id ? { ...sec, title: e.target.value } : sec)))} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">${section.items.reduce((s, it) => s + it.total, 0).toFixed(2)}</div>
                  <button type="button" onClick={() => addItem(section.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">+</button>
                  <button type="button" onClick={() => removeSection(section.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white">-</button>
                </div>
              </div>

              <div className="space-y-3 mt-3">
                {section.items.map((item:any) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-8 gap-2 items-end pt-3">
                    <div className="md:col-span-2">
                      <Inputbox type='text' id={`item-${item.id}-title`} name={`item-${item.id}-title`} placeholder="Item Name"  onChange={(e:any) => updateItem(section.id, item.id, { title: e.target.value })}/>
                    </div>
                    <div>
                      <Inputbox type='text' id={`item-${item.id}-desc`} name={`item-${item.id}-desc`} placeholder="Item Description"  onChange={(e:any) => updateItem(section.id, item.id, { description: e.target.value })}/>
                    </div>
                    <div>
                      <Inputbox type='number' id={`item-${item.id}-unit`} name={`item-${item.id}-unit`} placeholder="Unit" onChange={(e:any) => updateItem(section.id, item.id, { unit: e.target.value })}/>
                    </div>
                    <div>
                      <Inputbox id={`item-${item.id}-qty`} name={`item-${item.id}-qty`} placeholder="Quantity" type="number"  onChange={(e:any) => updateItem(section.id, item.id, { quantity: Number(e.target.value) })} />
                    </div>
                    <div>
                      <Inputbox id={`item-${item.id}-price`} name={`item-${item.id}-price`} placeholder="Price" type="number"  onChange={(e:any) => updateItem(section.id, item.id, { price: Number(e.target.value) })} />
                    </div>
                    <div>
                      <Inputbox id={`item-${item.id}-margin`} name={`item-${item.id}-margin`} placeholder="Margin" type="number"  onChange={(e:any) => updateItem(section.id, item.id, { margin: Number(e.target.value) })} />
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${item.total.toFixed(2)}</div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={() => addItem(section.id)} className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs">+</button>
                        <button type="button" onClick={() => removeItem(section.id, item.id)} className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-xs">−</button>
                      </div>
                    </div>
                  </div>
                ))} 
              </div>
            </div>
          ))}
        </div>

        {/* Summary card */}
        <div className="md:col-span-1 flex flex-end justify-end mt-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Sub Total</div>
              <div className="font-medium">${sections.reduce((s, sec) => s + sec.items.reduce((itS, it) => itS + it.quantity * it.price, 0), 0).toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Total Margin</div>
              <div className="font-medium">${sections.reduce((s, sec) => s + sec.items.reduce((itS, it) => itS + (it.quantity * it.price * (it.margin || 0)) / 100, 0), 0).toFixed(2)}</div>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Total Amount</div>
              <div className="text-2xl font-bold">${grandTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>

       <div className="flex justify-end gap-4 mt-6">
          <button type='submit' className="bg-blue-600 hover:bg-blue-700  text-white  px-4 py-3 rounded-xl w-[12rem] cursor-pointer" >{id ? 'Update' : ' Add '}  Estimate</button>
          <button type="button" className="bg-gray-100 border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-3 rounded-xl w-[12rem] cursor-pointer" onClick={Closecall}> Cancel </button>
        </div>
      </form>
    </div>
  )
}

export default EstimationForm
