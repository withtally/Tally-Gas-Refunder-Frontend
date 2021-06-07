import { Contract } from 'ethers'
import { useToast, Button } from '@chakra-ui/react'
import { useEthers, useContractFunction } from '@usedapp/core'
import { useRefunderAddress } from '../../common/hooks/useRefunderAddress'
import Factory from '../../common/ABI/RefunderFactory'
import { useEffect, useState } from 'react'
import { navigate, routes } from '@redwoodjs/router'

const CreateRefunder = () => {
  const { library, chainId } = useEthers()

  const contractAddress = useRefunderAddress(chainId)
  const [contract, setContract] = useState(null)
  const [createdRefunder, setCreatedRefunder] = useState(null)

  useEffect(() => {
    if (contractAddress) {
      setContract(
        new Contract(contractAddress, Factory.abi, library.getSigner())
      )
    }
  }, [contractAddress, library])

  const { state, send } = useContractFunction(contract, 'createRefunder')

  useEffect(() => {
    const getConfirmedEvents = async () => {
      // from: https://www.chainshot.com/article/ethers-cheat-sheet
      const topic = contract.interface.getEventTopic('RefunderCreated')

      const log = state.receipt.logs.find((x) => x.topics.indexOf(topic) >= 0)

      // finally, you can parse the log with the escrow interface
      // to get a more user-friendly event object
      const deployedEvent = contract.interface.parseLog(log)

      // this will contain the args object with all the event arguments
      setCreatedRefunder(deployedEvent.args?.refunderAddress)
    }

    if (contract && state.receipt) {
      getConfirmedEvents()
    }
  }, [state, contract])

  if (state.status == 'Mining') {
    return (
      <>
        <Button isLoading loadingText="tx Pending" />
      </>
    )
  }

  if (state.status == 'Success' && createdRefunder) {
    return (
      <>
        <Button
          colorScheme="teal"
          onClick={() =>
            navigate(
              routes.refundables({
                refunder: createdRefunder.toLocaleLowerCase(),
              })
            )
          }
        >
          Manage Refunder
        </Button>
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
