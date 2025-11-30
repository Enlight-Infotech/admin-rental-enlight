import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Cateogry from '../categories';
import Products from '../products/products';

export default function Home() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab label="Cateogry" />
                <Tab label="Products" />
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