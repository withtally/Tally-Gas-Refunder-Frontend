import { routes } from '@redwoodjs/router'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
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
import { refundablesByRefunder as query } from '../../common/queries/queries'
import Deposit from '../../components/Deposit'
import Withdraw from '../../components/Withdraw'
import AddRefundable from '../../components/AddRefundable'
import PauseRefundable from '../../components/PauseRefundable'
import RefundableTargetList from '../../components/RefundableTargetList'
import RefundableRefundsList from '../../components/RefundableRefundsList'
import DepositList from '../../components/DepositList'
import WithdrawlList from '../../components/WithdrawlList'
import SetMaxGasPrice from 'src/components/SetMaxGasPrice/SetMaxGasPrice'

const RefundablesPage = ({ refunder }) => {
  const subgraphURL =
    'https://api.thegraph.com/subgraphs/name/withtally/gas-refunder-grant-ropsten'

  const { chainId, account } = useEthers()
  const [refunderState, setRefunderState] = useState(null)
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

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
          <Text fontSize="xl" fontWeight="extrabold">
            REFUNDER:{' '}
            {refunderState?.owner == account?.toLocaleLowerCase() ? (
              <Badge size="xs" variant="subtle" colorScheme="green">
                You are the Owner
              </Badge>
            ) : (
              <Badge variant="outline" colorScheme="gray">
                You are not the Owner
              </Badge>
            )}
            {refunderState?.isPaused ? (
              <Badge size="xs" colorScheme="red" marginLeft="1em">
                Paused
              </Badge>
            ) : null}
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            bgGradient="linear(to-r, green.200, pink.500)"
            bgClip="text"
          >
            <Link href={getExplorerAddressLink(refunder, chainId)}>
              {isLargerThan800 ? refunder : shortenAddress(refunder)}
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
          <Text fontSize="xs" fontWeight="extrabold">
            Balance: {refunderState.balance}
          </Text>
          <Text fontSize="xs" fontWeight="extrabold">
            Deposit Count: {refunderState.depositCount}
          </Text>
          <Text fontSize="xs" fontWeight="extrabold">
            Withdrawl Count: {refunderState.withdrawlCount}
          </Text>
          <Text fontSize="xs" fontWeight="extrabold">
            Refund Count: {refunderState.refundCount}
          </Text>
          <Text fontSize="xs" fontWeight="extrabold">
            Max Gas Price: {refunderState.maxGasPrice}
          </Text>
        </Flex>
        <Flex
          justifyContent="flex-start"
          marginTop="1.5em"
          flexDirection={isLargerThan800 ? 'row' : 'column'}
        >
          <Deposit contractAddress={refunderState.id} />
          <Withdraw
            contractAddress={refunderState.id}
            balance={refunderState.balance}
          />
          <SetMaxGasPrice contractAddress={refunderState.id} />
          <AddRefundable contractAddress={refunderState.id} margin="1em" />
          <PauseRefundable
            contractAddress={refunderState.id}
            isPaused={refunderState.isPaused}
          />
        </Flex>

        <Accordion marginTop="1.5em" allowToggle colorScheme="blackAlpha">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold">TARGETS</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <RefundableTargetList
                refunderRefundables={refunderState.refundables}
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold">REFUNDS</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <RefundableRefundsList refunderRefunds={refunderState.refunds} />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold">DEPOSITS</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <DepositList deposits={refunderState.deposits} />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold">WITHDRAWLS</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <WithdrawlList withdrawls={refunderState.withdrawls} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  )
}

export default RefundablesPage
