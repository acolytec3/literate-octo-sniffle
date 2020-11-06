import React from 'react';
import {
  theme, Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider, Stack, Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure, Heading, Portal, PortalManager, Button
} from '@chakra-ui/core'
import WalletLoader from './components/WalletLoader'
import WalletContext, { initWalletState } from './context/walletContext'
import walletReducer from './reducers/walletReducer'
import Transactions from './components/Transactions';
import SpeedDial from './components/SpeedDial'
import Tokens from './components/Tokens';
import { get} from 'idb-keyval'
import { addWallet } from './providers/wallets'

function App() {
  const [state, dispatch] = React.useReducer(walletReducer, initWalletState)
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    const loadWallet = async (data: string) => {
      let wallet = JSON.parse(data)
      console.log(JSON.parse(data))
      let walletDeets = await addWallet(wallet)
      dispatch({ type: 'ADD_WALLET', payload: { ...walletDeets, key: wallet } })
    }
    get('wallet').then((data : any) => {
    if (data) {
      try{
      loadWallet(data)
      }
      catch (err) { console.log('Error loading wallet', err)}
    }})
  },[])

  const WalletModal = () => {
    return (<Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Load Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <WalletLoader onClose={onClose} />
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
    )
  }

  return (
    <WalletContext.Provider value={{ dispatch, state }}>
      <ChakraProvider theme={theme}>
        <PortalManager >
        <Stack w="100%" align="center" >
            <Heading>ArMob 2.0</Heading>
          <Tabs isFitted align="center" variant="enclosed-colored">
            <TabPanels w="90vw">
              <TabPanel>
                {state.address !== '' ?
                  <Box>
                    <Tokens />
                  </Box>
                  :
                 <Button onClick={onOpen}>Open Wallet</Button>
                  }
              </TabPanel>
              <TabPanel>
              {state.address !== '' ?
                <Transactions />
                :
                <Button onClick={onOpen}>Open Wallet</Button>
                 }
              </TabPanel>
            </TabPanels>
            <TabList position="fixed" bottom="0px" left="0px" w="100vw">
              <Tab>Wallet</Tab>
              <Tab>Transactions</Tab>
            </TabList>
          </Tabs>
        </Stack>
        <Portal >
        <SpeedDial onOpen={onOpen} />
        </Portal>
        <WalletModal />
        </PortalManager>
      </ChakraProvider>
    </WalletContext.Provider>
  );
}

export default App;
