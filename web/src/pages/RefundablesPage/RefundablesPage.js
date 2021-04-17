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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getExplorerAddressLink, useEthers } from '@usedapp/core'

const RefundablesPage = ({ refunder }) => {
  console.log('Refunder: ', refunder)
  const subgraphURL =
    'https://api.thegraph.com/subgraphs/name/withtally/gas-refunder-grant-ropsten'

  const query = `{
    refundables(where: { refunder:"${refunder}"}){
      id
      refunder {
        id
      }
      target
      identifier
    }
  }`

  const { chainId } = useEthers()
  const [refundables, setRefundables] = useState([])
  const [loading, setLoading] = useState(true)
  console.log('refundables: ', refundables)
  useEffect(() => {
    const getRefundables = async () => {
      const data = await fetch(subgraphURL, {
        headers: new Headers(),
        method: 'POST',
        body: JSON.stringify({
          query,
        }),
      }).then((res) => res.json())
      console.log('data', data)
      setRefundables(data.data.refundables)
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
      <Text>Refunder: {refunder}</Text>
      <Table variant="simple" maxWidth="70%">
        <TableCaption>List of all Refunder Contracts</TableCaption>
        <Thead>
          <Tr>
            <Th>Target Contract Address</Th>
            <Th>Function Signature</Th>
          </Tr>
        </Thead>
        <Tbody>
          {refundables.map((re, index) => {
            return (
              <Tr key={index}>
                <Td>
                  <Link
                    href={getExplorerAddressLink(re.target, chainId)}
                    isExternal
                  >
                    {re.target}
                  </Link>
                </Td>
                <Td>{re.identifier}</Td>
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

export default RefundablesPage
