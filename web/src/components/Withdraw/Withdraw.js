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
  Input
} from '@chakra-ui/react'
import { useEthers, useContractFunction } from '@usedapp/core'
import { Contract, utils } from 'ethers'
import { useState } from 'react'

import Refunder from '../../common/ABI/Refunder.json'

const Withdraw = ({ contractAddress, owner, balance }) => {
  console.log('🚀 ~ file: Withdraw.js ~ line 9 ~ Withdraw ~ balance', balance)

  const toast = useToast()
  const { library, account } = useEthers()
  const [withdrawlAmount, setWithdrawlAmount] = useState(balance.toString())
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )
  const { state, send } = useContractFunction(contract, 'withdraw')

  return (
    <>
      <Button size="sm" marginRight="1em" onClick={onOpen} ref={finalRef}>
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
              <Input ref={initialRef} placeholder="First name" value={balance}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Withdraw
