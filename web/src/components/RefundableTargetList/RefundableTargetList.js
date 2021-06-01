import { Text, Flex, Link, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const RefundableTargetList = ({ refunderRefundables }) => {
  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text marginBottom="1em">Contract Address</Text>
        {refunderRefundables.map((refundable, index) => (
          <Text key={index}>{refundable.target}</Text>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Text  marginBottom="1em">Function Signature</Text>
        {refunderRefundables.map((refundable, index) => (
          <Flex key={index} flexDirection="row">
            <Link
              href={
                'https://www.4byte.directory/api/v1/signatures/?hex_signature=' +
                refundable.identifier
              }
              isExternal
            >
              <Text>
                {refundable.identifier}{' '}
                <IconButton
                  size="xs"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />
              </Text>{' '}
            </Link>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default RefundableTargetList
