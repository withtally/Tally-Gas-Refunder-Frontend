import { Contract } from 'ethers'
import { useToast, Button } from '@chakra-ui/react'
import { useEthers, useContractFunction } from '@usedapp/core'
import { useRefunderAddress } from '../../common/hooks/useRefunderAddress'
import Factory from '../../common/ABI/RefunderFactory.json'
import { useEffect, useState } from 'react'

const CreateRefunder = () => {
  const { library, chainId } = useEthers()

  const contractAddress = useRefunderAddress(chainId)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (contractAddress) {
      setContract(
        new Contract(contractAddress, Factory.abi, library.getSigner())
      )
    }
  }, [contractAddress, library])

  const { state, send } = useContractFunction(contract, 'createRefunder')

  if (state.status == 'Mining') {
    return (
      <>
        <Button isLoading loadingText="tx Pending" />
      </>
    )
  }

  if (state.status == 'Success') {
    return (
      <>
        <Button colorScheme="teal" onClick={() => send()}>
          Success!
        </Button>
      </>
    )
  }

  if (state.status == 'Fail') {
    return (
      <>
        <Button colorScheme="red" onClick={() => send()}>
          Fail
        </Button>
      </>
    )
  }

  if (!contractAddress) {
    return (
      <>
        <Button>Invalid Network</Button>
      </>
    )
  }

  return (
    <>
      <Button onClick={() => send()}>Create</Button>
    </>
  )
}

export default CreateRefunder
