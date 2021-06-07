import { Button } from '@chakra-ui/react'
import { Contract } from 'ethers'
import { useContractFunction, useEthers } from '@usedapp/core'
import Refunder from '../../common/ABI/Refunder'

const PauseRefundable = ({ isPaused, contractAddress }) => {
  const { library } = useEthers()
  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )


  const { send } = useContractFunction(contract, isPaused ? 'unpause' : 'pause')

  return (
    <>
      <Button
        size="sm"
        marginRight="1em"
        onClick={() => send()}
        bgColor={isPaused ? 'green.300' : 'red.300'}
        textColor="white"
        margin="1em"
      >
        {isPaused ? 'Enable' : 'Pause'}
      </Button>
    </>
  )
}

export default PauseRefundable
