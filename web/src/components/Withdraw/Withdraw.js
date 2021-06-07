import {
  useToast,
  Button,
  Spinner,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useEthers, useContractFunction, useEtherBalance } from '@usedapp/core'
import { Contract, utils } from 'ethers'
import { useEffect, useState } from 'react'

import Refunder from '../../common/ABI/Refunder'

const Withdraw = ({ contractAddress }) => {
  const balance = useEtherBalance(contractAddress)
  const { library } = useEthers()
  const [withdrawlAmount, setWithdrawlAmount] = useState('0')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )
  const { state, send } = useContractFunction(contract, 'withdraw', {
    transactionName: 'Withdraw',
  })

  useEffect(() => {
    if (balance) setWithdrawlAmount(balance.toString())
  }, [balance])

  //Modal Refs
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button size="sm" marginRight="1em" onClick={onOpen} ref={finalRef} margin="1em">
        Withdraw
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw Funds</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Withdraw Amount"
                value={withdrawlAmount}
                onChange={(e) => setWithdrawlAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={state.status == 'Success' ? 'green' : 'blue'}
              mr={3}
              isLoading={state.status == 'Mining' ? true : false}
              onClick={() => send(withdrawlAmount)}
            >
              {state.status == 'Success' ? 'success' : 'withdraw'}
            </Button>
            <Button onClick={onClose}>
              {state.status == 'Success' ? 'Close' : 'Cancel'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Withdraw
