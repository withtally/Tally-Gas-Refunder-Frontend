import { useState, useEffect } from 'react'

export function useRefunderAddress(chainId) {
  const [address, setAddress] = useState(null)

  useEffect(() => {

    switch (chainId) {
      case 1: // Mainnet
        setAddress(process.env.REFUNDER_MAINNET)
        break
      case 3: // Ropsten
        setAddress(process.env.REFUNDER_ROPSTEN)
        break
      case 4: // Rinkeby
        console.error('Invalid ChainId: No contract deployed on this chain')
        setAddress(null)

        break
      case 42: // Kovan
        console.error('Invalid ChainId: No contract deployed on this chain')

        setAddress(null)
        break
      case 5: // Gorli
        break
      default:
        console.error('Invalid ChainId: No contract deployed on this chain')
        setAddress(null)
    }
  }, [chainId])

  return address
}
