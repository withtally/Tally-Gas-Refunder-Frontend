import { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { utils, Contract } from 'ethers'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
import { useContractFunction, useEthers } from '@usedapp/core'

import Refunder from '../../common/ABI/Refunder'

const AddRefundable = ({ contractAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const { library } = useEthers()
  const contract = new Contract(
    contractAddress,
    Refunder.abi,
    library.getSigner()
  )

  const { state, send } = useContractFunction(contract, 'updateRefundable', {
    transactionName: 'RefundableUpdate',
  })

  const generateFuncIdAsBytes = (funcId) => {
    funcId = utils.id(funcId);
    return utils.arrayify(funcId.substr(0, 10));
  }

  useEffect(() => {
    if (state.status == 'Success') {
      setTimeout(() => {
        onClose()
      }, 1500)
    }
  }, [state, onClose])

  const initialValues = {
    target: '',
    identifier: '',
    isRefundable: true,
    validatingContract: '',
    validatingIdentifier: '',
  }

  const validateTarget = (value) => {
    let error
    if (!value) {
      error = 'Contract address is required'
    } else if (!utils.isAddress(value)) {
      error = 'Contract address is not valid'
    }
    return error
  }

  const validateIdentifier = (value) => {
    let error
    if (!value) {
      error = 'Identifier is required'
    }
    return error
  }

  const validateValidatingContract = (value) => {
    let error
    if (value && !utils.isAddress(value)) {
      error = 'Contract address is not valid'
    }
    return error
  }

  const validateValidatingIdentifier = () => {
    let error

    return error
  }

  const onSubmit = (values) => {
    {
      try {
        send(
          values.target,
          values.identifier,
          values.isRefundable,
          values.validatingContract
            ? values.validatingContract
            : '0x0000000000000000000000000000000000000000',
          values.validatingIdentifier
            ? values.validatingIdentifier
            : '0x00000000'
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Button size="sm" margin="1em" onClick={onOpen} ref={finalRef}>
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
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {() => (
                <Form>
                  <Field name="target" validate={validateTarget}>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={form.errors.target && form.touched.target}
                        isRequired
                      >
                        <FormLabel htmlFor="target">Target Contract</FormLabel>
                        <Input {...field} id="target" placeholder="target" />
                        <FormHelperText>
                          This should be a standard contract address
                        </FormHelperText>
                        <FormErrorMessage>
                          {form.errors.target}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="identifier" validate={validateIdentifier}>
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={
                          form.errors.identifier && form.touched.identifier
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="identifier">
                          Function Identifier
                        </FormLabel>
                        <Input
                          {...field}
                          id="identifier"
                          placeholder="4byte hex"
                        />
                        <FormHelperText>
                          This should be the first 4 bytes of a function
                          signature.
                        </FormHelperText>
                        <FormErrorMessage>
                          {form.errors.identifier}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="isRefundable" mt={4}>
                    {({ field }) => (
                      <FormControl mt={4}>
                        <FormLabel htmlFor="isRefundable">
                          Is Refundable
                        </FormLabel>
                        <Select
                          {...field}
                          name="isRefundable"
                          placeholder="Select option"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Select>
                        <FormHelperText>
                          If false is selected, it will disable this refundable.
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    mt={4}
                    name="validatingContract"
                    validate={validateValidatingContract}
                  >
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={
                          form.errors.validatingContract &&
                          form.touched.validatingContract
                        }
                      >
                        <FormLabel htmlFor="validatingContract">
                          Validating Contract
                        </FormLabel>
                        <Input {...field} placeholder="(optional)" />
                        <FormHelperText>
                          Optionally a 3rd party contract can be used to
                          determine if this refundable should make a refund.
                        </FormHelperText>
                        <FormErrorMessage>
                          {form.errors.validatingContract}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    mt={4}
                    name="validatingIdentifier"
                    validate={validateValidatingIdentifier}
                  >
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={
                          form.errors.validatingIdentifier &&
                          form.touched.validatingIdentifier
                        }
                      >
                        <FormLabel htmlFor="validatingIdentifier">
                          Validating Function Identifier
                        </FormLabel>
                        <Input {...field} placeholder="(optional)" />
                        <FormHelperText>
                          Optional first 4 bytes of the validating contracts
                          validating function signature.
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={8}
                    colorScheme="teal"
                    isLoading={state?.status == 'Mining' ? true : false}
                    type="submit"
                  >
                    {state?.status == 'Success' ? 'Success!' : 'Submit'}
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddRefundable

