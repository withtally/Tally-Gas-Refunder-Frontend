import { Link, routes } from '@redwoodjs/router'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'

import RefunderTableElement from '../../components/RefunderTableElement'
import { useEffect, useState } from 'react'

import { getAllRefundersQuery } from '../../common/queries/queries'
import { subgraphURL } from '../../common/API/api'

const HomePage = () => {
  const [refunders, setRefunders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllRefunders = async () => {
      const data = await fetch(subgraphURL, {
        headers: new Headers(),
        method: 'POST',
        body: JSON.stringify({
          query: getAllRefundersQuery(),
        }),
      }).then((res) => res.json())
      setRefunders(data.data.refunders)
      setLoading(false)
    }
    getAllRefunders()
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
    <Flex flexDirection="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginBottom="2em"
        maxWidth="100%"
      >
        <Text fontWeight="bold" fontSize="xl">
          Refunder Contracts
        </Text>
        <Link to={routes.createRefunder()}>
          <Button colorScheme="teal" size="xs">
            Create Refunder
          </Button>
        </Link>
      </Flex>
      <Table maxWidth="70%" border="1px" borderRadius="2px">
        {/* <TableCaption>List of all Refunder Contracts</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Contract</Th>
            <Th>Owner</Th>
            <Th isNumeric>Balance</Th>
            <Th isNumeric>Version</Th>
            <Th isNumeric>Refunds</Th>
            <Th isNumeric>Refundables</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {refunders.map((refunder, index) => {
            return <RefunderTableElement key={index} refunder={refunder} />
          })}
        </Tbody>
        <Tfoot>
          {/* <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr> */}
        </Tfoot>
      </Table>
    </Flex>
  )
}

export default HomePage
