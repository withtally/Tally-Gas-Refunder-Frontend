import { Text, Flex } from '@chakra-ui/layout'

import CreateRefunder from '../../components/CreateRefunder'
const CreateRefunderPage = () => {
  return (
    <>
      <Flex flexDirection="column" maxWidth="70%">
        <Flex justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="semibold" marginBottom="1em">
            Create Refunder
          </Text>
          <CreateRefunder />
        </Flex>
        <Text>
          Refunders are contracts responsible for refunding eligble
          transactions. On this page you can create a new refunder which is
          deployed from an onchain factory contract.{' '}
        </Text>
        <br />
        <Text>
          Once deployed, the contract can be managed by its owner (the address
          which deployed it) from the &quot;Refunder&quot; page.
        </Text>
      </Flex>
    </>
  )
}

export default CreateRefunderPage
