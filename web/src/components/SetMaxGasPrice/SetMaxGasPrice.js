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
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Contract, utils } from 'ethers'
import { useEthers, useContractFunction, useEtherBalance } from '@usedapp/core'
import { Form, Field, Formik } from 'formik'

import Refunder from '../../common/ABI/Refunder'

const SetMaxGasPrice = ({ contractAddress }) => {
  const { library } = useEthers()
  const [gasPrice, setGasPrice] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )
  const { state, send } = useContractFunction(contract, 'setMaxGasPrice', {
    transactionName: 'setMaxGasPrice',
  })

  //Modal Refs
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  //Initial Value
  const initialValues = { maxGasPrice: '' }

  const validateGasPrice = (value) => {
    let error
    if (!value) {
      error = 'A value is required'
      return error
    } else if (isNaN(value)) {
      error = 'Value must be a number'
      return error
    }
    return error
  }

  //Close Modal
  useEffect(() => {
    if (state.status == 'Success') {
      setTimeout(() => {
        onClose()
      }, 1500)
    }
  }, [state, onClose])

  return (
    <>
      <Button
        size="sm"
        marginRight="1em"
        onClick={onOpen}
        ref={finalRef}
        margin="1em"
      >
        Set Max Gas price
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            send(values.maxGasPrice)
          }}
        >
          {(props) => (
            <ModalContent>
              <ModalHeader>Set Max Gas Price</ModalHeader>
              <Text margin="1.5em">
                This is the maximum gas price the refunder is willing to cover
                and is important to protect against griefing or usage in
                congested periods.
              </Text>
              <ModalCloseButton />
              <Form>
                <ModalBody pb={6}>
                  <Field name="maxGasPrice" validate={validateGasPrice}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.maxGasPrice && form.touched.maxGasPrice
                        }
                      >
                        <FormLabel htmlFor="maxGasPrice">
                          Max Gas Price in Wei
                        </FormLabel>
                        <Input
                          {...field}
                          id="maxGasPrice"
                          ref={initialRef}
                          placeholder="gas price"
                        />
                        <FormErrorMessage>
                          {form.errors.maxGasPrice}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Link href="https://ethgasstation.info/" isExternal>
                    <Text fontSize="xs">EthGasStation</Text>
                  </Link>
                  <Spacer />
                  <Button
                    colorScheme="teal"
                    isLoading={state.status == 'Mining'}
                    type="submit"
                  >
                    {state.status == 'Success'
                      ? 'Success!'
                      : 'Set Max Gas Price'}
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default SetMaxGasPrice
