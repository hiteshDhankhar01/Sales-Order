import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    Divider,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import orderData from '../assets/Data/sale_order.json';
import customerData from '../assets/Data/customer.json';

const OrderDetails = () => {
    const { orderId } = useParams();

    const order = orderData.find(order => order.invoice_no === orderId);
    const customer = customerData.find(customer => customer.id === order.customer_id);

    return (
        <Box p={4}>
            <Heading as="h1" mb={4} textAlign="center">Order Details</Heading>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Box p={4}>
                    <Text fontSize="xl">Order ID: {order.invoice_no}</Text>
                    <Text fontSize="xl">Customer Name: {customer.name}</Text>
                    <Divider my={4} />
                    <Table variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th>SKU ID</Th>
                                <Th>Item Name</Th>
                                <Th>Price</Th>
                                <Th>Quantity</Th>
                                <Th>Total</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {order.items.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.sku_id}</Td>
                                    <Td>Item Name</Td>
                                    <Td>₹{item.price}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>₹{item.price * item.quantity}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <Divider my={4} />
                    <Text fontSize="xl" fontWeight="bold">Total Price: ₹{calculateTotal(order.items)}</Text>
                </Box>
            </Box>
        </Box>
    );
};

// Function to calculate total price
const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default OrderDetails;
