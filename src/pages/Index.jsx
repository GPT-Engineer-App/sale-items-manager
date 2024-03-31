import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Grid, Image, Select, Flex, Spacer, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import { FaPlus, FaSearch } from "react-icons/fa";

const items = [
  {
    id: 1,
    title: "Vintage Armchair",
    description: "Beautiful vintage armchair in great condition.",
    image: "https://images.unsplash.com/photo-1707197724068-185ff219329b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYXJtY2hhaXJ8ZW58MHx8fHwxNzExOTE1NTQ2fDA&ixlib=rb-4.0.3&q=80&w=1080",
    condition: "Used - Very Good",
    zipCode: "12345",
    status: "For Sale",
    price: 150,
  },
  {
    id: 2,
    title: "Modern Dining Table",
    description: "Sleek and modern dining table, seats 6 comfortably.",
    image: "https://images.unsplash.com/photo-1685644201646-9e836c398c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkaW5pbmclMjB0YWJsZXxlbnwwfHx8fDE3MTE5MTU1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    condition: "New",
    zipCode: "67890",
    status: "For Sale",
    price: 500,
  },
  // Add more items...
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    condition: "",
    zipCode: "",
    price: "",
  });

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // TODO: Implement actual submission logic
    console.log("New item submitted:", newItem);
    onClose();
    toast({
      title: "Item posted.",
      description: "Your item has been successfully posted for sale.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesSearchTerm = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = selectedCondition === "" || item.condition === selectedCondition;
    const matchesStatus = selectedStatus === "" || item.status === selectedStatus;
    const matchesPrice = maxPrice === "" || item.price <= parseInt(maxPrice);
    return matchesSearchTerm && matchesCondition && matchesStatus && matchesPrice;
  });

  return (
    <Box p={8}>
      <Flex align="center" mb={8}>
        <Heading as="h1" size="xl" mr={4}>
          Marketplace
        </Heading>
        <Spacer />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
          Post an Item
        </Button>
      </Flex>

      <Flex mb={8}>
        <Input placeholder="Search items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mr={4} />
        <Select placeholder="Condition" value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} mr={4}>
          <option value="New">New</option>
          <option value="Used - Like New">Used - Like New</option>
          <option value="Used - Very Good">Used - Very Good</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Acceptable">Used - Acceptable</option>
        </Select>
        <Select placeholder="Status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} mr={4}>
          <option value="For Sale">For Sale</option>
          <option value="Sold">Sold</option>
        </Select>
        <Input placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} mr={4} />
        <Button leftIcon={<FaSearch />} colorScheme="blue">
          Search
        </Button>
      </Flex>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={8}>
        {filteredItems.map((item) => (
          <Box key={item.id} borderWidth={1} borderRadius="lg" p={4}>
            <Image src={item.image} alt={item.title} mb={4} />
            <Heading as="h2" size="md" mb={2}>
              {item.title}
            </Heading>
            <Text mb={2}>{item.description}</Text>
            <Text mb={2}>
              <strong>Condition:</strong> {item.condition}
            </Text>
            <Text mb={2}>
              <strong>Location:</strong> {item.zipCode}
            </Text>
            <Text mb={2}>
              <strong>Price:</strong> ${item.price}
            </Text>
            <Text>
              <strong>Status:</strong> {item.status}
            </Text>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post an Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={newItem.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={newItem.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Condition</FormLabel>
              <Select name="condition" value={newItem.condition} onChange={handleInputChange}>
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Very Good">Used - Very Good</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Acceptable">Used - Acceptable</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Zip Code</FormLabel>
              <Input name="zipCode" value={newItem.zipCode} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input name="price" type="number" value={newItem.price} onChange={handleInputChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
