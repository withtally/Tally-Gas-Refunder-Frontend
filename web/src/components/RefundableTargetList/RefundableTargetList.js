import { Text, Flex, useMediaQuery } from '@chakra-ui/react'
import { shortenAddress } from '@usedapp/core'

const RefundableTargetList = ({ refunderRefundables }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text>Target Contract Address</Text>
        {refunderRefundables.map((refundable, index) => (
          <Text key={index}>{refundable.target}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text>Function Signature</Text>
        {refunderRefundables.map((refundable, index) => (
          <Text key={index}>{refundable.identifier}</Text>
        ))}
      </Flex>
    </Flex>
  )
}

export default RefundableTargetList
