import {
  Tr,
  Td,
  useMediaQuery,
  Badge,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import {
  useEtherBalance,
  getExplorerAddressLink,
  shortenIfAddress,
  useEthers,
} from '@usedapp/core'
import { utils } from 'ethers'

const RefunderTableElement = ({ refunder }) => {
  const balance = useEtherBalance(refunder.id)
  const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)')
  const { chainId } = useEthers()

  return (
    <Tr>
      <Td>
        <Link to={routes.refundables({ refunder: refunder.id })}>
          {isLargerThan1100 ? refunder.id : shortenIfAddress(refunder.id)}
        </Link>
      </Td>
      <Td>
        <ChakraLink href={getExplorerAddressLink(refunder.owner, chainId)}>
          {shortenIfAddress(refunder.owner)}
        </ChakraLink>
      </Td>
      <Td isNumeric>{balance ? utils.formatEther(balance) : '0'}</Td>
      <Td isNumeric>{refunder.version}</Td>
      <Td isNumeric>{refunder.refundCount}</Td>
      <Td>
        {refunder.isPaused ? (
          <Badge colorScheme="green">Paused</Badge>
        ) : (
          <Badge colorScheme="green">Active</Badge>
        )}
      </Td>
    </Tr>
  )
}

export default RefunderTableElement
