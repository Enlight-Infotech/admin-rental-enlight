import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Cateogry from '../categories';
import Products from '../products/products';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <Box sx={{ p: 2 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab label="Cateogry" />
                <Tab label="Products" />
                <Button sx={{ml: 'auto'}} style={{marginRight: '10px'}} onClick={handleLogout} variant="outlined" color="secondary">Logout</Button>
            </Tabs>
            {/* Tab Panels */}
            {value === 0 && (
                <Box sx={{ p: 0 }}>
                    <Cateogry />
                </Box>
            )}

            {value === 1 && (
                <Box sx={{ p: 0 }}>
                    <Products />
                </Box>
            )}
        </Box>
    );
}