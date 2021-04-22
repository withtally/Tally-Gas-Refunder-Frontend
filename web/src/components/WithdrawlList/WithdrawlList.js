import { Text, Flex, useMediaQuery, Link } from '@chakra-ui/react'
import { getExplorerTransactionLink, useEthers } from '@usedapp/core'
import { ExternalLinkIcon } from '@chakra-ui/icons'
const WithdrawlList = ({ withdrawls }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  const { chainId } = useEthers()
  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text>Recipient</Text>
        {withdrawls.map((withdrawl, index) => (
          <Text key={index}>{withdrawl.recipient}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Value</Text>
        {withdrawls.map((withdrawl, index) => (
          <Text key={index}>{withdrawl.value}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Tx</Text>
        {withdrawls.map((withdrawl, index) => (
          <Link
            key={index}
            isExternal
            href={getExplorerTransactionLink(withdrawl.txHash, chainId)}
          >
            <ExternalLinkIcon />
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}

export default WithdrawlList
