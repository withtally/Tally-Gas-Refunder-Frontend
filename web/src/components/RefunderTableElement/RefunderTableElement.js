import {
  Tr,
  Td,
  Text,
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
        {' '}
        <Text
          fontSize="sm"
          fontWeight="bold"
          marginRight="15px"
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
        >
          <Link to={routes.refundables({ refunder: refunder.id })}>
            {isLargerThan1100 ? refunder.id : shortenIfAddress(refunder.id)}
          </Link>
        </Text>
      </Td>
      <Td>
        <ChakraLink href={getExplorerAddressLink(refunder.owner, chainId)}>
          {shortenIfAddress(refunder.owner)}
        </ChakraLink>
      </Td>
      <Td isNumeric>{balance ? Number(utils.formatEther(balance)).toFixed(4) : '0'}</Td>
      <Td isNumeric>{refunder.version}</Td>
      <Td isNumeric>{refunder.refundCount}</Td>
      <Td isNumeric>{refunder.refundableCount}</Td>
      <Td>
        {refunder.isPaused ? (
          <Badge colorScheme="red">Paused</Badge>
        ) : (
          <Badge colorScheme="green">Active</Badge>
        )}
      </Td>
    </Tr>
  )
}

export default RefunderTableElement
