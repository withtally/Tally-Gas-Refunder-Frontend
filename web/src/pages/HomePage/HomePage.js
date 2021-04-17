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
} from '@chakra-ui/react'
import { useQuery, useQueryErrorResetBoundary } from 'react-query'
import { GraphQLClient, gql } from 'graphql-request'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const subgraphURL =
    'https://api.thegraph.com/subgraphs/name/withtally/gas-refunder-grant-ropsten'

  const query = `{
    refunders{
      id
      owner
      maxGasPrice
      version
    }
  }`

  const [refunders, setRefunders] = useState([])
  console.log(
    '🚀 ~ file: HomePage.js ~ line 30 ~ HomePage ~ refunders',
    refunders
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllRefunders = async () => {
      const data = await fetch(subgraphURL, {
        headers: new Headers(),
        method: 'POST',
        body: JSON.stringify({
          query,
        }),
      }).then((res) => res.json())
      setRefunders(data.data.refunders)
      setLoading(false)
    }
    getAllRefunders()
  }, [])

  if (loading) return <> Loading </>

  return (
    <>
      <Table variant="simple" maxWidth="70%">
        <TableCaption>List of all Refunder Contracts</TableCaption>
        <Thead>
          <Tr>
            <Th>Contract Address</Th>
            <Th isNumeric>Balance</Th>
            <Th isNumeric>Version</Th>
          </Tr>
        </Thead>
        <Tbody>
          {refunders.map((re, index) => {
            return (
              <Tr key={index}>
                <Td>{re.id}</Td>
                <Td isNumeric>balance</Td>
                <Td isNumeric>{re.version}</Td>
              </Tr>
            )
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
    </>
  )
}

export default HomePage
