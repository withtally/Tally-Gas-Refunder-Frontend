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
import { useEthers, useContractFunction } from '@usedapp/core'
import { Contract, utils } from 'ethers'
import { useState } from 'react'

import Refunder from '../../common/ABI/Refunder.json'

const Deposit = ({ contractAddress }) => {
  console.log(
    '🚀 ~ file: Deposit.js ~ line 6 ~ Deposit ~ contractAddress',
    contractAddress
  )
  const toast = useToast()
  const { library } = useEthers()
  const [depositAmount, setDepositAmount] = useState(utils.parseEther('0.05'))
  console.log("🚀 ~ file: Deposit.js ~ line 32 ~ Deposit ~ depositAmount", depositAmount)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )
console.log("Contract: ", contract)
  const { state, send } = useContractFunction(contract, '')
  console.log("🚀 ~ file: Deposit.js ~ line 42 ~ Deposit ~ state", state)

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button size="sm" marginRight="1em" ref={finalRef} onClick={onOpen}>
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
                placeholder="First name"
                value={depositAmount || 0}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => send({ value: utils.formatEther(depositAmount) })}
            >
              Deposit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Deposit
