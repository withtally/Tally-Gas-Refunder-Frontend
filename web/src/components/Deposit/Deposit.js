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
import { useEthers, useContractFunction, useNotifications } from '@usedapp/core'
import { Contract, utils } from 'ethers'
import { useState } from 'react'

import Refunder from '../../common/ABI/Refunder.json'

const Deposit = ({ contractAddress }) => {

  const { library } = useEthers()
  const [depositAmount, setDepositAmount] = useState(utils.parseEther('0.05'))
  const { isOpen, onOpen, onClose } = useDisclosure()

  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )
  const { state, send } = useContractFunction(contract, '')

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button size="sm" marginRight="1em" ref={finalRef} onClick={onOpen} margin="1em">
        Deposit
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit Funds</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Deposit Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={state.status == 'Success' ? 'green' : 'blue'}
              mr={3}
              isLoading={state.status == 'Mining' ? true : false}
              onClick={() => send({ value: depositAmount })}
            >
              Deposit
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

export default Deposit
