import React from 'react';
import { FaPlus, FaMinus, FaWallet } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { IconButton } from '@chakra-ui/core'
import { del } from 'idb-keyval'
import WalletContext from '../context/walletContext'

const MotionButton = motion.custom(IconButton)

const SpeedDial = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { state, dispatch } = React.useContext(WalletContext)
  const wrapperRef = React.useRef(null);

  const useOutsideAlerter = (ref: any) => {
    React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  return (<div ref={wrapperRef}>
    <IconButton aria-label="open" isRound icon={isOpen ? FaMinus : FaPlus} position="fixed" bottom="20px" right="20px" onClick={() => setIsOpen(!isOpen)} />
    <AnimatePresence>
      {isOpen &&
        <MotionButton
          aria-label="wallet"
          isRound
          key="me"
          icon={FaWallet}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -20, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          position="fixed"
          bottom="60px"
          right="20px"
          onClick={async () => {
            await del('wallet')
            dispatch({ type: 'ADD_WALLET', payload: { address: '', balance: '', key: '' } })
          }} />}
    </AnimatePresence>
  </div>)
}

export default SpeedDial