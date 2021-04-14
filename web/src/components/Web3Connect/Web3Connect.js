import {
  useEthers,
  shortenAddress,
  getExplorerAddressLink,
} from '@usedapp/core'
import { Button, Flex, Link, Text, Tooltip } from '@chakra-ui/react'
const Web3Connect = () => {
  const {
    activateBrowserWallet,
    deactivate,
    active,
    account,
    chainId,
  } = useEthers()

  console.log('Account: ', account)

  const connectControl = () => {
    if (account) {
      deactivate()
      return
      // Maybe add a toast here?
    }
    activateBrowserWallet()
  }
  return (
    <Flex alignItems="center">
      <Text fontSize="xl" fontWeight="bold" marginRight="15px">
        ChainId: {chainId}
      </Text>
      {account ? (
        <Tooltip label={account}>
          <Link href={getExplorerAddressLink(account, chainId)} isExternal>
            <Text
              fontSize="sm"
              fontWeight="bold"
              marginRight="15px"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
            >
              {shortenAddress(account)}
            </Text>
          </Link>
        </Tooltip>
      ) : null}
      <Button onClick={() => connectControl()}>
        {account ? 'Disconnect' : 'Connect'}
      </Button>
    </Flex>
  )
}

export default Web3Connect
