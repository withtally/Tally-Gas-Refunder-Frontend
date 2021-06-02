import {
  Link,
  IconButton,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import {
  getExplorerAddressLink,
  useEthers,
  shortenIfAddress,
} from '@usedapp/core'

import RefundablePauseUnpause from '../../components/RefundablePauseUnpause'

const RefundableTargetList = ({
  refunderRefundables,
  refunderContractAddress,
}) => {
  const { chainId } = useEthers()

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Target Address</Th>
          <Th>Target Signature</Th>
          <Th>Validating Contract</Th>
          <Th>Validating Signature</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {refunderRefundables.map((refundable, index) => (
          <Tr key={index}>
            <Td>
              <Link href={getExplorerAddressLink(refundable.target, chainId)}>
                {shortenIfAddress(refundable.target)}
              </Link>
            </Td>
            <Td>
              {refundable.identifier}{' '}
              <Link
                href={
                  'https://www.4byte.directory/api/v1/signatures/?hex_signature=' +
                  refundable.identifier
                }
                isExternal
              >
                <IconButton
                  size="xs"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />
              </Link>
            </Td>
            <Td>
              <Link
                href={getExplorerAddressLink(
                  refundable.validatingContract,
                  chainId
                )}
              >
                {refundable.validatingContract ==
                '0x0000000000000000000000000000000000000000'
                  ? '0x000...0000'
                  : shortenIfAddress(refundable.validatingContract)}
              </Link>
            </Td>
            <Td>
              {refundable.validatingIdentifier}
              <Link
                href={
                  'https://www.4byte.directory/api/v1/signatures/?hex_signature=' +
                  refundable.validatingIdentifier
                }
                isExternal
              >
                <IconButton
                  size="xs"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />
              </Link>
            </Td>
            <Td>
              <RefundablePauseUnpause
                refundable={refundable}
                contractAddress={refunderContractAddress}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default RefundableTargetList
