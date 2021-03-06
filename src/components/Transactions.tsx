import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaCaretRight, FaSearch } from "react-icons/fa";
import WalletContext, { token } from "../context/walletContext";
import { getTxns } from "../providers/wallets";

const Txn = (txn: any, tokens: token[]) => {
  let amount = txn.node.quantity.ar;
  let token = "AR";
  if (parseFloat(txn.node.quantity.ar) === 0) {
    let input = txn.node.tags.filter((tag: any) => tag.name === "Input");

    if (input.length > 0) {
      let inputs = JSON.parse(input[0].value);
      if (inputs.hasOwnProperty("qty")) amount = inputs.qty;
      let contract = txn.node.tags.filter(
        (tag: any) => tag.name === "Contract"
      )[0].value;
      let tokenObjects = tokens.filter((token) => token.contract === contract);
      tokenObjects.length > 0 ? token = tokenObjects[0].ticker : token = 'of some PST' //a hack to show this isn't an AR transaction until I figure out a better way to do it
    }
  }

  return (
    <AccordionItem key={txn.node.id} textAlign="left">
      <AccordionButton
        key={txn.node.id + "button"}
        bg="white"
        border="1px"
        borderColor="grey"
      >
        <Text
          key={txn.node.id + "display"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          ID: {txn.node.id}
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel border="1px">
        <Heading size="xs" fontSize="12px">
          Metadata
        </Heading>
        <SimpleGrid columns={2}>
          <Text fontSize={10}>Transaction ID: </Text>
          <Text
            cursor="pointer"
            onClick={() => navigator.clipboard.writeText(txn.node.id)}
            fontSize={10}
          >
            {txn.node.id}
          </Text>
          <Text fontSize={10}>Fee: </Text>
          <Text fontSize={10}>{txn.node.fee.ar} AR</Text>
          {txn.node.recipient && (
            <React.Fragment>
              <Text fontSize={10}>Recipient: </Text>
              <Text
                cursor="pointer"
                onClick={() =>
                  navigator.clipboard.writeText(txn.node.recipient)
                }
                fontSize={10}
              >
                {txn.node.recipient}
              </Text>
            </React.Fragment>
          )}
          {txn.node.owner && (
            <React.Fragment>
              <Text fontSize={10}>From: </Text>
              <Text
                cursor="pointer"
                onClick={() =>
                  navigator.clipboard.writeText(txn.node.owner.address)
                }
                fontSize={10}
              >
                {txn.node.owner.address}
              </Text>
              <Text fontSize={10}>Amount: </Text>
              <Text fontSize={10}>
                {amount} {token}
              </Text>
            </React.Fragment>
          )}
        </SimpleGrid>
        {txn.node.tags.length > 0 && (
          <Heading size="xs" fontSize="12px">
            Transaction Tags
          </Heading>
        )}
        {txn.node.tags.map((tag: any) => {
          return (
            <SimpleGrid
              key={txn.node.id + tag.name}
              columns={2}
              textAlign="left"
              overflow="auto"
            >
              <Text fontSize={10} key={tag.toString()}>
                {tag.name}
              </Text>
              <Text fontSize={10} key={tag.name + tag.value}>
                {tag.value}
              </Text>
            </SimpleGrid>
          );
        })}
      </AccordionPanel>
    </AccordionItem>
  );
};

const Transactions = () => {
  const { state } = React.useContext(WalletContext);
  const [loading, setLoading] = React.useState(false);
  const [txns, setTxns] = React.useState([]);
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");
  const [filter, setFilter] = React.useState("from");

  React.useEffect(() => {
    async function getTransactions() {
      setLoading(true);
      switch (filter) {
        case "from":
          let fTxns = await getTxns({ address: state.address });
          setTxns(fTxns);
          break;
        case "to":
          let tTxns = await getTxns({ to: state.address });
          setTxns(tTxns);
          break;
        default:
          let Txns = await getTxns({ address: state.address });
          setTxns(Txns);
      }
      setLoading(false);
    }
    if (state.address !== "") {
      getTransactions();
    } else setTxns([]);
  }, [state.address, filter]);

  const retrieveTransactionsForTag = async () => {
    setLoading(true);
    let txns = await getTxns({
      address: state.address,
      name: name,
      value: value,
    });
    setTxns(txns);
    setLoading(false);
  };

  const getTxnsWithCursor = async () => {
    setLoading(true);
    //@ts-ignore
    let cursor = txns[txns.length - 1].cursor;
    let txnsWithCursor;
    filter === "from"
      ? (txnsWithCursor = await getTxns({
          address: state.address,
          cursor: cursor,
        }))
      : (txnsWithCursor = await getTxns({ to: state.address, cursor: cursor }));
    setTxns(txnsWithCursor);
    setLoading(false);
  };

  return (
    <Box h="100%">
      <RadioGroup
        onChange={(evt) => setFilter(evt.toString())}
        value={filter}
        defaultValue="from"
      >
        <Stack direction="row" spacing={4}>
          <Radio defaultChecked value="from">
            From Wallet
          </Radio>
          <Radio value="to">To Wallet</Radio>
        </Stack>
      </RadioGroup>
      {!loading ? (
        <>
          <Accordion allowToggle allowMultiple w="100%">
            {/* @ts-ignore */}
            {txns.length > 0 ? txns.map((txn) => Txn(txn, state.tokens)) : null}
          </Accordion>
          <Button
            my={2}
            isDisabled={txns.length < 10}
            leftIcon={<FaCaretRight />}
            onClick={() => getTxnsWithCursor()}
          >
            Next 10
          </Button>
          <Popover>
            <PopoverTrigger>
              <IconButton
                position="fixed"
                bottom="6%"
                left="5%"
                aria-label="search transactions"
                icon={<FaSearch />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <Stack>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setName(evt.target.value)
                  }
                />
                <Input
                  placeholder="Value"
                  value={value}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(evt.target.value)
                  }
                />
                <Button
                  isDisabled={name === "" || value === ""}
                  onClick={() => {
                    retrieveTransactionsForTag();
                    setName("");
                    setValue("");
                  }}
                >
                  Search by Tag
                </Button>
              </Stack>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <Spinner position="fixed" bottom="50%" right="50%" />
      )}
    </Box>
  );
};

export default Transactions;
