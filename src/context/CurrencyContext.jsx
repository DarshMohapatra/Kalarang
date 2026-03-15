import { createContext, useState, useContext } from 'react'

const CurrencyContext = createContext()

const INR_TO_USD = 85

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR')

  const formatPrice = (inrAmount) => {
    if (currency === 'USD') {
      const usd = inrAmount / INR_TO_USD
      return `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return `₹${inrAmount.toLocaleString('en-IN')}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
