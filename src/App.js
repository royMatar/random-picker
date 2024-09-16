import "./App.css";
import { useState } from "react";
import { ChakraProvider, Box, Input, Button, Text, Switch, VStack, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import Framer Motion

function App() {
  const [data, setData] = useState(""); // Manages the input data
  const [list, setList] = useState([]); // Manages the list
  const [randomItem, setRandomItem] = useState(null); // Stores the selected random item
  const [del, setDel] = useState(false); // Controls whether to delete the item or not

  const handleData = () => {
    const splitData = data.toUpperCase().split(""); // Splits the string into an array
    setList(splitData); // Updates the list with the split data
  };

  const handleRandomPick = () => {
    if (list.length === 0) return; // If list is empty, do nothing
    const randomIndex = Math.floor(Math.random() * list.length); // Get random index
    const item = list[randomIndex]; // Get the random item
    setRandomItem(item); // Set the selected random item

    // Remove the item from the list if del is true
    if (del === true) {
      const updatedList = [...list];
      updatedList.splice(randomIndex, 1);
      setList(updatedList);
    }
  };

  return (
    <ChakraProvider>
      <Box className="App" textAlign="center" p={4}>
        <Text fontSize="4xl" mb={4}>Random Picker</Text>

        {/* Instruction to user */}
        <Text fontSize="lg" mb={2}>
          Type letters to add to the list:
        </Text>

        {/* Input to add items */}
        <VStack spacing={4} mb={4}>
          <Input
            type="text"
            maxW={600}
            placeholder="Enter characters"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleData}>
            Add to List
          </Button>
        </VStack>

        {/* Display the list */}
        <Text fontSize="lg" mb={4}>
          List: {list.join(", ") || "No items yet"}
        </Text>

        {/* Pick random item button */}
        <Button colorScheme="blue" onClick={handleRandomPick} isDisabled={list.length === 0}>
          Pick Random Item
        </Button>

        {/* Show the random item with animation */}
        {randomItem && (
          <>
            <Text fontSize="xl" color="green.500" mt={4}>
              Random Item:
            </Text>
            <motion.div
              key={randomItem} // Key to trigger re-render when randomItem changes
              initial={{ scale: 0, opacity: 0 }} // Initial state (hidden)
              animate={{ scale: 1, opacity: 1 }} // Animation state (visible)
              transition={{ duration: 0.5 }} // Animation duration
            >
              <Text as="h1" fontSize="150px" fontWeight="bold" color="blue.500">
                {randomItem}
              </Text>
            </motion.div>
          </>
        )}

        {/* Switch to toggle delete option */}
        <HStack mt={6} justify="center">
          <Text>Delete selected item:</Text>
          <Switch
            isChecked={del}
            onChange={() => setDel(!del)}
            colorScheme="red"
          />
        </HStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
