import { Tr, Td } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { useEtherBalance } from '@usedapp/core'
import { utils } from 'ethers'

const RefunderTableElement = ({ refunder }) => {
  const balance = useEtherBalance(refunder.id)

  return (
    <Tr>
      <Td>
        <Link to={routes.refundables({ refunder: refunder.id })}>
          {refunder.id}
        </Link>
      </Td>
      <Td isNumeric>{balance ? utils.formatEther(balance) : '0'}</Td>
      <Td isNumeric>{refunder.version}</Td>
    </Tr>
  )
}

export default RefunderTableElement
