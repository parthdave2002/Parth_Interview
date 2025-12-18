export const calculateEstimationTotal = (quantity: number, price: number, margin: number) => {
  const base = quantity * price
  const marginAmount = (base * margin) / 100
  return base + marginAmount
}

export default calculateEstimationTotal
