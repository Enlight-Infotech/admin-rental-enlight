import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

function DeleteProduct({ open, handleClose, refreshData, selectedRows }) {
    async function deleteProduct(id) {
        try {
            const response = await axios.post("http://localhost:5500/api/admin/products/delete", {
                ids: selectedRows
            });


            const data = await response.data;
            console.log(data.message);

            // Refresh table after delete
            refreshData();
            handleClose();  // Close dialog

        } catch (error) {
            console.error("Delete error:", error);
        }
    }
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Delete Product</DialogTitle>

            <DialogContent dividers>
                <Box display="flex" flexDirection="column" gap={2}>
                    {/* Category ID */}
                    <p>Are you sure you want to delete this product?</p>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={deleteProduct} variant="contained" type="submit">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteProduct;
