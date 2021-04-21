import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { useState } from 'react'

const AddRefundable = () => {
  const [target, setTarget] = useState(null)
  const [identifier, setIdentifier] = useState(null)
  const [isRefundable, setIsRefundable] = useState(true)
  const [validatingContract, setValidatingContract] = useState(null)
  const [validatingIdentifier, setValidatingIdentifier] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button size="sm" onClick={onOpen} ref={finalRef}>
        Add Refundable
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Refundable Contract Transaction</ModalHeader>
          <Text margin="1.5em">
            Refundables are contract transactions for which the user can be
            refunded ~95% of the tx gas fee.
          </Text>
          <Text margin="1.5em">
            Example use cases are functions anyone can call and which do not
            rely upon a sepecific msg.sender.
          </Text>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="target-contract" isRequired>
              <FormLabel>Target Contract</FormLabel>
              <Input ref={initialRef} placeholder="Contract Address" />
              <FormHelperText>
                This should be a standard contract address
              </FormHelperText>
            </FormControl>
            <FormControl mt={4} id="function-identifier" isRequired>
              <FormLabel>Function Identifier</FormLabel>
              <Input placeholder="4byte hex"  />
              <FormHelperText>
                This should be the first 4 bytes of a function signature.
              </FormHelperText>
            </FormControl>
            <FormControl mt={4} id="isRefundable">
              <FormLabel>Is Refundable</FormLabel>
              <Select placeholder="Select option" defaultValue="true">
                <option value="true">True</option>
                <option value="false">False</option>
              </Select>
              <FormHelperText>
                If false is selected, it will disable this refundable.
              </FormHelperText>
            </FormControl>
            <FormControl mt={4} id="validating-contract">
              <FormLabel>Validating Contract</FormLabel>
              <Input placeholder="(optional)" />
              <FormHelperText>
                Optionally a 3rd party contract can be used to determine if this
                refundable should make a refund.
              </FormHelperText>
            </FormControl>
            <FormControl mt={4} id="validating-identifier">
              <FormLabel>Validating Function Identifier</FormLabel>
              <Input placeholder="(optional)" />
              <FormHelperText>
                Optional first 4 bytes of the validating contracts validating
                function signature
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddRefundable

// address targetContract,
// bytes4 identifier,
// bool isRefundable_,
// address validatingContract,
// bytes4 validatingIdentifier
