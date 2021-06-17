import {
  useToast,
  Button,
  Spinner,
  Link,
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
import { useSendTransaction } from '@usedapp/core'
import { useState } from 'react'
import { utils } from 'ethers'

const Deposit = ({ contractAddress }) => {
  const [depositAmount, setDepositAmount] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const { sendTransaction, state } = useSendTransaction({
    transactionName: 'SendEthereum',
  })

  // const state = ""

  const handleClick = () => {
    if (depositAmount) {
      sendTransaction({
        to: contractAddress,
        value: utils.parseEther(depositAmount),
      })
    } else {
      toast({
        title: 'Empty Amount',
        description: 'Please enter a valid ETH amount to deposit',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button
        size="sm"
        marginRight="1em"
        ref={finalRef}
        onClick={onOpen}
        margin="1em"
      >
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
                placeholder="Deposit Amount (in ETH)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </FormControl>
            <Text size="xs" marginTop="1em">
              Convert from Wei{' '}
              <Link href="https://eth-converter.com/" isExternal>
                here
              </Link>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={state.status == 'Success' ? 'green' : 'blue'}
              mr={3}
              isLoading={state.status == 'Mining' ? true : false}
              onClick={() => handleClick()}
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
