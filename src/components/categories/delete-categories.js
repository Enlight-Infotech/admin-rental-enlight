import React from "react";
import axios from "axios";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

function DeleteCategories({ open, handleClose, refreshData, selectedRows }) {
    async function deleteCategory() {
        try {
            const response = await axios.post("http://localhost:5500/api/admin/categories/delete", {
                ids: selectedRows
            });

            const data = response.data;   // ✅ FIXED

            console.log(data.message);

            refreshData();  // Refresh table
            handleClose();  // Close dialog

        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Delete Category</DialogTitle>

            <DialogContent dividers>
                <Box display="flex" flexDirection="column" gap={2}>
                    <p>Are you sure you want to delete this category?</p>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={deleteCategory} variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteCategories;
