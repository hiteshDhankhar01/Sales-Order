import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './Pages/Login';
import OrderTable from './Pages/OrderTable';
import SaleOrderForm from './Pages/SaleOrderForm';
import OrderDetails from './Pages/OrderDetails';
// import initialOrders from './data';
import './App.css';
import IntersectionBox from './components/IntersectionBox';

function App() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState('');

    const handleNewOrder = (newOrder) => {
        setOrders([...orders, newOrder]);
    };

    useEffect(() => {
        const authData = localStorage.getItem('auth');
        const storedUser = localStorage.getItem('user');
        if (!authData) {
            navigate('/login');
        } else {
            setUser(storedUser || ''); // Set user if it exists in localStorage
        }
    }, [navigate]);

    const handleLogin = () => {
        localStorage.setItem('auth', 'true');
        navigate('/');
    };

    return (
        <>
            <Header user={user}/>
            <IntersectionBox>
                <Box maxWidth="45rem" marginInline="auto">
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/" element={<OrderTable orders={orders} />} />
                        {/* Pass user prop to SaleOrderForm */}
                        <Route path="/order" element={<SaleOrderForm onNewOrder={handleNewOrder} user={user} />} />
                        <Route path="/order/:orderId" element={<OrderDetails />} />
                        <Route path="/*" element={<div>Page not found</div>} />
                    </Routes>
                </Box>
            </IntersectionBox>
        </>
    );
}

export default App;


{/* <SaleOrderForm onNewOrder={handleNewOrder} />
            <OrderTable orders={orders} /> */}


// import './App.css';
// import { useEffect } from 'react';
// import { Box} from '@chakra-ui/react';
// import { useNavigate, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Login from './Pages/Login';
// import OrderTable from './Pages/OrderTable';
// import SaleOrderForm from './Pages/SaleOrderForm';
// import OrderDetails from './Pages/OrderDetails';


// function App() {

//   const navigate = useNavigate();

//   useEffect(() => {
//     const authData = localStorage.getItem('auth');
//     if (!authData) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleLogin = () => {
//     localStorage.setItem('auth', 'true');
//     navigate('/');
//   };

//   return (
//     <>
//       <Header />
//       <Box maxWidth="45rem" marginInline="auto">
//         <Routes>
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route path="/" element={<OrderTable />} />
//           <Route path="/order" element={<SaleOrderForm />} />
//           <Route path="/order/:orderId" element={<OrderDetails />} />
//           <Route path="/*" element={<div>Page not found</div>} />
//         </Routes>
//       </Box>
//     </>
//   );
// }

// export default App;