import { Button } from '@chakra-ui/react'
import { utils, Contract } from 'ethers'
import { useContractFunction, useContractCall, useEthers } from '@usedapp/core'
import Refunder from '../../common/ABI/Refunder.json'

const PauseRefundable = ({ isPaused, contractAddress }) => {
  console.log(
    '🚀 ~ file: PauseRefundable.js ~ line 7 ~ PauseRefundable ~ isPaused',
    isPaused
  )
  const { library, account } = useEthers()
  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )
  // console.log("Contract: ", contract)
  //   const status = useContractCall(
  //     account && {
  //       abi: Refunder.abi,
  //       address: contractAddress,
  //       method: 'paused',
  //       args: [],
  //     }
  //   )
  //   console.log(
  //     '🚀 ~ file: PauseRefundable.js ~ line 16 ~ PauseRefundable ~ status',
  //     status
  //   )

  const { state, send } = useContractFunction(
    contract,
    isPaused ? 'unpause' : 'pause'
  )

  return (
    <>
      <Button
        size="sm"
        marginRight="1em"
        onClick={() => send()}
        bgColor={isPaused ? 'green.300' : 'red.300'}
        textColor="white"
      >
        {isPaused ? 'Enable' : 'Pause'}
      </Button>
    </>
  )
}

export default PauseRefundable
