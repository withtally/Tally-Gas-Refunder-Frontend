import {
  useEthers,
  shortenAddress,
  getExplorerAddressLink,
  getChainName,
} from '@usedapp/core'
import { useMediaQuery } from '@chakra-ui/react'
import { Button, Flex, Link, Text, Tooltip } from '@chakra-ui/react'
const Web3Connect = () => {
  const {
    activateBrowserWallet,
    deactivate,
    active,
    account,
    chainId,
  } = useEthers()
  console.log('Active? ', active)
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)')

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
              {isLargerThan900 ? account : shortenAddress(account)}
            </Text>
          </Link>
        </Tooltip>
      ) : null}
      <Text fontSize="xl" fontWeight="bold" marginRight="15px">
        {account ? getChainName(chainId) : null}
      </Text>
      <Button onClick={() => connectControl()}>
        {account ? 'Disconnect' : 'Connect'}
      </Button>
    </Flex>
  )
}

export default Web3Connect
