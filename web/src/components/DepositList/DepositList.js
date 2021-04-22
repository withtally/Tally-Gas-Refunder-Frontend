import { Text, Flex, useMediaQuery, Link } from '@chakra-ui/react'
import { getExplorerTransactionLink, useEthers } from '@usedapp/core'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const DepositList = ({ deposits }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  const { chainId } = useEthers()

  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text>Depositor</Text>
        {deposits.map((deposit, index) => (
          <Text key={index}>{deposit.depositor}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Value</Text>
        {deposits.map((deposit, index) => (
          <Text key={index}>{deposit.value}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Tx</Text>
        {deposits.map((deposit, index) => (
          <Link
            key={index}
            isExternal
            href={getExplorerTransactionLink(deposit.txHash, chainId)}
          >
            <ExternalLinkIcon />
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}

export default DepositList
