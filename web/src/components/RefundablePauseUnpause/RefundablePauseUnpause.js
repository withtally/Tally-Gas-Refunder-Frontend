import { useContractFunction, useEthers, useContractCall } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { Button, Badge } from '@chakra-ui/react'
import { utils, Contract } from 'ethers'

import Refunder from '../../common/ABI/Refunder'

const RefundablePauseUnpause = ({ refundable, contractAddress }) => {
  const { chainId, library } = useEthers()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    const doContract = () => {
      const instance = new Contract(
        contractAddress,
        Refunder.abi,
        library.getSigner()
      )
      setContract(instance)
    }
    if (refundable) doContract()
  }, [refundable, library, contractAddress])

  const output = useContractCall({
    abi: new utils.Interface(Refunder.abi),
    address: contractAddress,
    method: 'getRefundable',
    args: [refundable.target, refundable.identifier],
  })
  const { state, send } = useContractFunction(contract, 'updateRefundable', {
    transactionName: 'RefundableUpdate',
  })

  const toggleRefundableEnable = ({ values }) => {
    {
      try {
        send(
          values.target,
          values.identifier,
          values.isRefundable,
          values.validatingContract,
          values.validatingIdentifier
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      {' '}
      <Badge
        ariant="solid"
        colorScheme={output && output[0]?.isSupported ? 'green' : 'red'}
      >
        {output && output[0]?.isSupported ? 'Enabled' : 'Disabled'}
      </Badge>{' '}
      <Button
        bgColor={output && output[0]?.isSupported ? 'red.300' : 'green.300'}
        textColor="white"
        size="sm"
        onClick={() =>
          toggleRefundableEnable({
            values: {
              ...refundable,
              isRefundable: !refundable.isRefundable,
            },
          })
        }
      >
        {output && output[0]?.isSupported ? 'Turn off' : 'Turn on'}
      </Button>{' '}
    </>
  )
}

export default RefundablePauseUnpause
