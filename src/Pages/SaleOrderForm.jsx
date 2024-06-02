import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Tag, TagLabel, TagCloseButton, Flex, UnorderedList, ListItem, VStack, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const products = [
    { sku_id: 301, name: "Product 1" },
    { sku_id: 302, name: "Product 2" },
    { sku_id: 303, name: "Product 3" },
    { sku_id: 304, name: "Product 4" },
    { sku_id: 305, name: "Product 5" },
    { sku_id: 306, name: "Product 6" },
    { sku_id: 307, name: "Product 7" },
    { sku_id: 308, name: "Product 8" },
    { sku_id: 309, name: "Product 9" }
];

const SaleOrderForm = ({ onNewOrder, user, customerId }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([...products]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const { register, handleSubmit, setValue, watch } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const handleProductSelect = (product) => {
        setSelectedProducts([...selectedProducts, product]);
        setAvailableProducts(availableProducts.filter(item => item !== product));
    };

    const handleRemoveProduct = (productToRemove) => {
        setSelectedProducts(selectedProducts.filter(product => product !== productToRemove));
        setAvailableProducts([...availableProducts, productToRemove]);
    };


    const onSubmit = (data) => {
        const formattedDate = startDate.toISOString().split('T')[0];
        const selectedProductDetails = selectedProducts.map((product, index) => ({
            sku_id: product.sku_id,
            price: Number(data[`sellingRate${index}`]),
            quantity: Number(data[`totalItems${index}`]),
        }));
        console.log(user)
        const formData = {
            customerName: user,
            customer_id: customerId,
            invoice_no: data.invoice_no,
            invoice_date: formattedDate,
            items: selectedProductDetails,
            paid: data.paid === 'yes',
        };
        console.log("Form Data:", formData);
        onNewOrder(formData);
        navigate('/');
    };

    return (
        <Box maxWidth="700px" margin="4rem auto">
            <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb='4'>
                    <FormLabel>All Products</FormLabel>
                    <Flex border='1px' borderColor='gray.200' borderRadius='md' alignItems='center'>
                        <Flex my="2" pl='2'>
                            {selectedProducts.map((product, index) => (
                                <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="gray" mr="2" mt="2">
                                    <TagLabel>{product.name}</TagLabel>
                                    <TagCloseButton onClick={() => handleRemoveProduct(product)} />
                                </Tag>
                            ))}
                        </Flex>

                        <Input
                            className='productInput'
                            type='text'
                            placeholder='Add product...'
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                        />
                    </Flex>
                    {isInputFocused && (
                        <UnorderedList mt="4" p='2' borderRadius='md' overflow='hidden' border='1px' borderColor='gray.200'>
                            {availableProducts.map((product, index) => (
                                <ListItem
                                    key={index}
                                    listStyleType='none'
                                    textAlign='start'
                                    borderRadius='md'
                                    width='100%'
                                    onMouseDown={() => handleProductSelect(product)}
                                    cursor="pointer"
                                    _hover={{ backgroundColor: "gray.500", color: "white" }}
                                    p="2"
                                >
                                    {product.name}
                                </ListItem>
                            ))}
                        </UnorderedList>
                    )}
                </FormControl>
                {selectedProducts.map((product, index) => (
                    <Box key={index} borderRadius='md' border='1px' width='100%' borderColor='gray.200' p="2" mb="4">
                        <FormLabel>{index + 1}. SKU {product.sku_id}</FormLabel>
                        <FormControl mb="4">
                            <Flex justify="space-between" align="center">
                                <Box flex="1" mr="2">
                                    <FormLabel htmlFor={`sellingRate${index}`}>Selling Rate</FormLabel>
                                    <Input id={`sellingRate${index}`} type="number" placeholder="Enter selling rate" {...register(`sellingRate${index}`)} />
                                </Box>
                                <Box flex="1" ml="2">
                                    <FormLabel htmlFor={`totalItems${index}`}>Total Items</FormLabel>
                                    <Input id={`totalItems${index}`} type="number" placeholder="Enter total items" {...register(`totalItems${index}`)} />
                                </Box>
                            </Flex>
                        </FormControl>
                    </Box>
                ))}
                <Flex width='100%' justifyContent='space-between' alignItems='center'>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel my='auto'>Invoice Date</FormLabel>
                        <DatePicker className='date' selected={startDate} onChange={(date) => setStartDate(date)} />
                    </FormControl>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel my='auto'>Paid</FormLabel>
                        <RadioGroup defaultValue="no">
                            <Stack direction="row">
                                <Radio value="yes" {...register(`paid`)}>Yes</Radio>
                                <Radio value="no" {...register(`paid`)}>No</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </Flex>
                <FormControl mb='4'>
                    <FormLabel>Invoice Number</FormLabel>
                    <Input type='text' placeholder='Enter invoice number' {...register('invoice_no')} />
                </FormControl>
                <Button type="submit" mt="4" colorScheme="teal">Submit</Button>
            </VStack>
        </Box>
    );
};

export default SaleOrderForm;

// import React, { useState } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Tag, TagLabel, TagCloseButton, Flex, UnorderedList, ListItem, VStack, Radio, RadioGroup, Stack } from "@chakra-ui/react";
// import { useForm } from 'react-hook-form';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// const products = [
//     { sku_id: 301, name: "Product 1" },
//     { sku_id: 302, name: "Product 2" },
//     { sku_id: 303, name: "Product 3" },
//     { sku_id: 304, name: "Product 4" },
//     { sku_id: 305, name: "Product 5" },
//     { sku_id: 306, name: "Product 6" },
//     { sku_id: 307, name: "Product 7" },
//     { sku_id: 308, name: "Product 8" },
//     { sku_id: 309, name: "Product 9" }
// ];

// const SaleOrderForm = ({ onNewOrder }) => {
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [availableProducts, setAvailableProducts] = useState([...products]);
//     const [isInputFocused, setIsInputFocused] = useState(false);
//     const { register, handleSubmit, setValue, watch } = useForm();
//     const [startDate, setStartDate] = useState(new Date());

//     const handleProductSelect = (product) => {
//         setSelectedProducts([...selectedProducts, product]);
//         setAvailableProducts(availableProducts.filter(item => item !== product));
//     };

//     const handleRemoveProduct = (productToRemove) => {
//         setSelectedProducts(selectedProducts.filter(product => product !== productToRemove));
//         setAvailableProducts([...availableProducts, productToRemove]);
//     };

//     const onSubmit = (data) => {
//         const formattedDate = startDate.toISOString();
//         const selectedProductDetails = selectedProducts.map((product, index) => ({
//             sku_id: product.sku_id,
//             sellingRate: data[`sellingRate${index}`],
//             totalItems: data[`totalItems${index}`],
//         }));
//         const formData = { ...data, selectedDate: formattedDate, products: selectedProductDetails, paid: data.paid };
//         console.log("Form Data:", formData);
//         onNewOrder(formData); // Invoke the callback with new order data
//     };

//     return (
//         <Box maxWidth="700px" margin="4rem auto">
//             <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
//                 <FormControl mb='4'>
//                     <FormLabel>All Products</FormLabel>
//                     <Flex border='1px' borderColor='gray.200' borderRadius='md' alignItems='center'>
//                         <Flex my="2" pl='2'>
//                             {selectedProducts.map((product, index) => (
//                                 <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="gray" mr="2" mt="2">
//                                     <TagLabel>{product.name}</TagLabel>
//                                     <TagCloseButton onClick={() => handleRemoveProduct(product)} />
//                                 </Tag>
//                             ))}
//                         </Flex>

//                         <Input
//                             className='productInput'
//                             type='text'
//                             placeholder='Add product...'
//                             onFocus={() => setIsInputFocused(true)}
//                             onBlur={() => setIsInputFocused(false)}
//                         />
//                     </Flex>
//                     {isInputFocused && (
//                         <UnorderedList mt="4" p='2' borderRadius='md' overflow='hidden' border='1px' borderColor='gray.200'>
//                             {availableProducts.map((product, index) => (
//                                 <ListItem
//                                     key={index}
//                                     listStyleType='none'
//                                     textAlign='start'
//                                     borderRadius='md'
//                                     width='100%'
//                                     onMouseDown={() => handleProductSelect(product)}
//                                     cursor="pointer"
//                                     _hover={{ backgroundColor: "gray.500", color: "white" }}
//                                     p="2"
//                                 >
//                                     {product.name}
//                                 </ListItem>
//                             ))}
//                         </UnorderedList>
//                     )}
//                 </FormControl>
//                 {selectedProducts.map((product, index) => (
//                     <Box key={index} borderRadius='md' border='1px' width='100%' borderColor='gray.200' p="2" mb="4">
//                         <FormLabel>{index + 1}. SKU {product.sku_id}</FormLabel>
//                         <FormControl mb="4">
//                             <Flex justify="space-between" align="center">
//                                 <Box flex="1" mr="2">
//                                     <FormLabel htmlFor={`sellingRate${index}`}>Selling Rate</FormLabel>
//                                     <Input id={`sellingRate${index}`} type="number" placeholder="Enter selling rate" {...register(`sellingRate${index}`)} />
//                                 </Box>
//                                 <Box flex="1" ml="2">
//                                     <FormLabel htmlFor={`totalItems${index}`}>Total Items</FormLabel>
//                                     <Input id={`totalItems${index}`} type="number" placeholder="Enter total items" {...register(`totalItems${index}`)} />
//                                 </Box>
//                             </Flex>
//                         </FormControl>
//                     </Box>
//                 ))}
//                 <Flex width='100%' justifyContent='space-between' alignItems='center'>
//                     <FormControl display='flex' alignItems='center'>
//                         <FormLabel my='auto' >Invoice Date</FormLabel>
//                         <DatePicker className='date' selected={startDate} onChange={(date) => setStartDate(date)} />
//                     </FormControl>
//                     <FormControl display='flex' alignItems='center'>
//                         <FormLabel my='auto'>Paid</FormLabel>
//                         <RadioGroup defaultValue="no">
//                             <Stack direction="row">
//                                 <Radio value="yes" {...register(`paid`)}>Yes</Radio>
//                                 <Radio value="no" {...register(`paid`)}>No</Radio>
//                             </Stack>
//                         </RadioGroup>
//                     </FormControl>
//                 </Flex>
//                 <Button type="submit" mt="4" colorScheme="teal">Submit</Button>
//             </VStack>
//         </Box>
//     );
// };

// export default SaleOrderForm;
