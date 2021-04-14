import { Link, routes } from '@redwoodjs/router'
import { Flex, Text, Container } from '@chakra-ui/react'
import { Icon, Select } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import Web3Connect from '../../components/Web3Connect'
const SiteLayoutLayout = ({ children }) => {
  return (
    <>
      {' '}
      <Flex flexDirection="column" height="100vh">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          margin="1.5em"
          minHeight="3em"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Gas Refunder
          </Text>
          <Web3Connect />
        </Flex>

        <Flex
          flexDirection="column"
          flex="1"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </Flex>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          margin="1.5em"
          minHeight="3em"
        >
          <Text fontSize="lg">
            Open source project funded by the Compound Grants Committee, built
            by Tally.
          </Text>
          <Icon as={FaGithub} />
        </Flex>
      </Flex>
    </>
  )
}

export default SiteLayoutLayout
