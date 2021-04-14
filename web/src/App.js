import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { ChakraProvider } from '@chakra-ui/react'
import { ChainId, DAppProvider } from '@usedapp/core'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider>
      <ChakraProvider>
        <DAppProvider config={config}>
          <Routes />
        </DAppProvider>
      </ChakraProvider>
    </RedwoodApolloProvider>
  </FatalErrorBoundary>
)

export default App
