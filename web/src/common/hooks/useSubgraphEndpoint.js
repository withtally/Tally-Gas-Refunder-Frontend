import { useState, useEffect } from 'react'

export function useSubgraphEndpoint(chainId) {
  const [subgraphURL, setSubgraphURL] = useState(null)

  useEffect(() => {

    switch (chainId) {
      case 1: // Mainnet
        console.error('Invalid ChainId: No contract deployed on this chain')
        setSubgraphURL(null)
        break
      case 3: // Ropsten
      setSubgraphURL(process.env.ROPSTEN_SUBGRAPH)
        break
      case 4: // Rinkeby
        console.error('Invalid ChainId: No contract deployed on this chain')
        setSubgraphURL(null)

        break
      case 42: // Kovan
        console.error('Invalid ChainId: No contract deployed on this chain')

        setSubgraphURL(null)
        break
      case 5: // Gorli
        break
      default:
        console.error('Invalid ChainId: No contract deployed on this chain')
        setSubgraphURL(null)
    }
  }, [chainId])

  return subgraphURL
}
