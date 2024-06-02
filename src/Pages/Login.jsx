import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Heading, VStack } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import IntersectionBox from '../components/IntersectionBox'; 

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('Mohit');
    const [password, setPassword] = useState('12345678');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', username);
        onLogin();
    };

    return (
        <IntersectionBox> 
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" maxWidth="35rem" marginInline="auto">
                <VStack as="form" onSubmit={handleSubmit} spacing={4} p={8} boxShadow="lg" borderRadius="md" minWidth="100%" border="1px" borderColor="gray.200">
                    <Heading>Login</Heading>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            textTransform="capitalize"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handlePasswordToggle}>
                                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button type="submit" colorScheme="green">Login</Button>
                </VStack>
            </Box>
        </IntersectionBox>
    );
};

export default Login;
