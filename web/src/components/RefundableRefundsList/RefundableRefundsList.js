import { Text, Flex, useMediaQuery } from '@chakra-ui/react'
import { shortenAddress } from '@usedapp/core'

const RefundableRefundsList = ({ refunderRefunds }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text>Caller</Text>
        {refunderRefunds.map((refund, index) => (
          <Text key={index}>{refund.caller}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Target</Text>
        {refunderRefunds.map((refund, index) => (
          <Text key={index}>{refund.target}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Identifier</Text>
        {refunderRefunds.map((refund, index) => (
          <Text key={index}>{refund.identifier}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Refund</Text>
        {refunderRefunds.map((refund, index) => (
          <Text key={index}>{refund.refund}</Text>
        ))}
      </Flex>
    </Flex>
  )
}
export default RefundableRefundsList
