import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, ButtonGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Heading, Divider, FormControl, FormLabel, Input } from '@chakra-ui/react';
import orderData from '../assets/Data/sale_order.json';
import customerData from '../assets/Data/customer.json';
import { useNavigate } from 'react-router-dom';

const OrderTable = ({ orders }) => {
    const [showCompleted, setShowCompleted] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Combine the orders prop with existing orderData
        const combinedOrders = [...orders, ...orderData];

        // Filter orders based on showCompleted state
        const filteredOrders = combinedOrders.filter(order => showCompleted ? order.paid : !order.paid);

        // Map orders with customer data
        const enrichedOrders = filteredOrders.map(order => {
            const customer = customerData.find(customer => customer.id === order.customer_id);
            return {
                ...order,
                customerName: order.customerName || (customer ? customer.name : 'Unknown')
            };
        });

        setData(enrichedOrders);
        console.log(enrichedOrders);
    }, [showCompleted, orders]);

    useEffect(() => {
        if (orders.some(order => order.paid === false)) {
            setShowCompleted(false);
        } else {
            setShowCompleted(true);
        }
    }, [orders]);

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    const calculateTotal = (items) => {
        return items ? items.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
    };

    return (
        <Box p={4}>
            <ButtonGroup mb={4} display='flex' justifyContent='space-between'>
                <Box>
                    <Button mr={2} colorScheme={showCompleted ? 'teal' : 'gray'} onClick={() => setShowCompleted(true)}>
                        Completed Sale Orders
                    </Button>
                    <Button colorScheme={!showCompleted ? 'teal' : 'gray'} onClick={() => setShowCompleted(false)}>
                        Active Sale Orders
                    </Button>
                </Box>
                <Button colorScheme='blue' borderRadius="none" onClick={() => navigate('/order')}>
                    + Sale Order
                </Button>
            </ButtonGroup>

            <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Customer Name</Th>
                        <Th>Total Price</Th>
                        <Th>Last Modified</Th>
                        <Th>Edit/View</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((order, index) => (
                        <Tr key={order.invoice_no}>
                            <Td>{index + 1}</Td>
                            <Td>{order.customerName}</Td>
                            <Td>₹ {calculateTotal(order.items)}</Td>
                            <Td>{order.invoice_date}</Td>
                            <Td>
                                <Button colorScheme="teal" mr={3} onClick={() => handleEdit(order)}>
                                    ...
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Modal for editing the order */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Sale Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedOrder && (
                            <Box p={4}>
                                <Heading as="h1" mb={4} textAlign="center">Order Details</Heading>
                                <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                                    <Box p={4}>
                                        <Text fontSize="xl">Order ID: {selectedOrder.invoice_no}</Text>
                                        <Text fontSize="xl">Customer Name: {selectedOrder.customerName}</Text>
                                        <Divider my={4} />
                                        <form onSubmit={(e) => { e.preventDefault(); }}>
                                            <FormControl mb={4}>
                                                <FormLabel>Customer Name</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={selectedOrder.customerName}
                                                    isReadOnly
                                                />
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <FormLabel>Total Price</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={`₹${calculateTotal(selectedOrder.items)}`}
                                                    isReadOnly
                                                />
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <FormLabel>Last Modified</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={selectedOrder.invoice_date}
                                                    isReadOnly
                                                />
                                            </FormControl>
                                            {/* Add more form fields as needed */}
                                            <Button type="submit" colorScheme="blue" isDisabled>Submit</Button>
                                        </form>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default OrderTable;
