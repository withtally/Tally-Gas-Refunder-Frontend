import { Contract } from 'ethers'
import { useToast, Button } from '@chakra-ui/react'
import { useEthers, useContractFunction } from '@usedapp/core'
import { useEffect } from 'react'
import Factory from '../../common/ABI/RefunderFactory.json'

const CreateRefunder = () => {
  const toast = useToast()
  const { library } = useEthers()

  const contract = new Contract(
    '0xB5A62b20551b88623c8ef082af3b8c929d89f221',
    Factory.abi,
    library.getSigner()
  )

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

  return (
    <>
      <Button onClick={() => send()}>Create</Button>
    </>
  )
}

export default CreateRefunder
