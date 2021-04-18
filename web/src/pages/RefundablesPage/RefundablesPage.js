import { routes } from '@redwoodjs/router'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
  Text,
  Spinner,
  Flex,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  useMediaQuery,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  getExplorerAddressLink,
  useEthers,
  shortenAddress,
} from '@usedapp/core'
import { query } from '../../common/queries/refundablesByRefunder'

const RefundablesPage = ({ refunder }) => {
  const subgraphURL =
    'https://api.thegraph.com/subgraphs/name/withtally/gas-refunder-grant-ropsten'

  const { chainId, account } = useEthers()
  const [refunderState, setRefunderState] = useState(null)
  const [isLargerThan828] = useMediaQuery('(min-width: 828px)')

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getRefundables = async () => {
      const data = await fetch(subgraphURL, {
        headers: new Headers(),
        method: 'POST',
        body: JSON.stringify({
          query: query(refunder),
        }),
      }).then((res) => res.json())
      setRefunderState(data.data.refunder)
      setLoading(false)
    }
    getRefundables()
  }, [])

  if (loading)
    return (
      <>
        {' '}
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </>
    )

  return (
    <>
      <Flex flexDirection="column" width="70vw">
        <Flex flexDirection="column" marginBottom=".5em">
          <Text fontSize="md">
            Refunder:{' '}
            {refunderState?.owner == account.toLocaleLowerCase() ? (
              <Badge size="xs" variant="subtle" colorScheme="green">
                You are the Owner
              </Badge>
            ) : (
              <Badge variant="outline" colorScheme="gray">
                You are not the Owner
              </Badge>
            )}
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            bgGradient="linear(to-r, green.200, pink.500)"
            bgClip="text"
          >
            <Link href={getExplorerAddressLink(refunder, chainId)}>
              {isLargerThan828 ? refunder : shortenAddress(refunder)}
            </Link>
          </Text>
          <Flex>
            <Text fontSize="xx-small">
              Owner:{' '}
              <Link href={getExplorerAddressLink(refunderState.owner, chainId)}>
                {refunderState.owner}
              </Link>
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="sm">Balance: {refunderState.balance}</Text>
          <Text fontSize="sm">Deposit Count: {refunderState.depositCount}</Text>
          <Text fontSize="sm">
            Withdrawl Count: {refunderState.withdrawlCount}
          </Text>
          <Text fontSize="sm">Refund Count: {refunderState.refundCount}</Text>
        </Flex>
        <Flex justifyContent="flex-start" marginTop="1.5em">
          <Button size="sm" marginRight="1em">
            Deposit
          </Button>
          <Button size="sm" marginRight="1em">
            Withdraw
          </Button>
          <Button size="sm" marginRight="1em">
            Add Refundable
          </Button>
        </Flex>

        <Accordion marginTop="1.5em" allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Targets
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table
                size="sm"
                varient="striped"
                colorScheme="gray"
                marginTop="2em"
              >
                <Thead>
                  <Tr>
                    <Th>Refund Target</Th>
                    <Th>Function Signature</Th>
                    <Th>Pause/Enable</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {refunderState.refundables.map((re, index) => {
                    return (
                      <Tr key={index}>
                        <Td>
                          <Link
                            href={getExplorerAddressLink(re.target, chainId)}
                            isExternal
                          >
                            <Text fontSize="sm">{re.target}</Text>
                          </Link>
                        </Td>
                        <Td>{re.identifier}</Td>
                        <Td>
                          <Button size="xs">
                            {re.isPaused ? 'enable' : 'pause'}
                          </Button>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Refunds
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>All refunds</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Deposits
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>All refunds</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Withdrawls
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>All refunds</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  )
}

export default RefundablesPage
