import React, { useState } from "react";
import { Box, Flex, Heading, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ user }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("gray.200", "gray.800");
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault(); 
        setIsDropdownOpen(false);
        localStorage.clear();
        navigate('/login');
        location.reload();
    };

    return (
        <Box bg={bg} px={4} shadow='lg'>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <NavLink to={'/'}>
                    <Heading as="h1" size="lg" color="teal">
                        Sales Order
                    </Heading>
                </NavLink>

                <Flex alignItems="center" gap={4} position="relative">
                    <Button
                        onClick={toggleColorMode}
                        borderRadius='full'
                        padding="0.5rem"
                    >
                        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    {user && (
                        <>
                            <Button
                                borderRadius='md'
                                padding="0.5rem"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {user}
                            </Button>
                            {isDropdownOpen && (
                                <Box
                                    position="absolute"
                                    right={0}
                                    top="100%"
                                    width="150px"
                                    bg="white"
                                    boxShadow="md"
                                    borderRadius="md"
                                    zIndex={10}
                                    padding="0.5rem"
                                >
                                    <Button
                                        borderRadius='full'
                                        paddingY="2px"
                                        size="sm"
                                        onClick={handleLogout}
                                        colorScheme="red"
                                        width="100%"
                                    >
                                        Logout
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </Flex>

            </Flex>
        </Box>
    );
};

export default Header;
