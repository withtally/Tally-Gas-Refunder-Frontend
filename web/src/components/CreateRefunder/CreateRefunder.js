import { Contract } from 'ethers'
import { useToast, Button, Spinner } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import Factory from '../../common/ABI/refunderFactory.json'

const CreateRefunder = () => {
  const toast = useToast()

  const { library, account } = useEthers()

  const [contract, setContract] = useState(null)
  const [pendingTx, setPendingTx] = useState(false)


  useEffect(() => {
    /// TODO: Support multiple networks
    const createContract = () => {
      const address = '0xB5A62b20551b88623c8ef082af3b8c929d89f221'
      setContract(new Contract(address, Factory.abi, library.getSigner()))
    }
    if (account) createContract()
  }, [library, account])

  const waitForMinedTx = async (tx) => {
    setPendingTx(true)
    const txReceipt = await library.getTransactionReceipt(tx)
    if (txReceipt && txReceipt.blockNumber) {
      setPendingTx(false)
      toast({
        title: 'Tx Mined',
        description: `Tx Hash: ${tx} has been included in block: ${txReceipt.blockNumber}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      return txReceipt
    }
  }
  const createRefunder = async () => {
    if (!contract) {
      toast({
        title: 'Connect Wallet',
        description: 'To create a refunder, first connect your wallet.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
      return
    }
    try {
      const tx = await contract.createRefunder()
      waitForMinedTx(tx)
    } catch (error) {
      toast({
        title: 'Transaction Error',
        description: JSON.stringify(error),
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      {pendingTx ? (
        <Button isLoading loadingText="tx Pending">
          Create
        </Button>
      ) : (
        <Button onClick={() => createRefunder()}>Create</Button>
      )}
    </>
  )
}

export default CreateRefunder
