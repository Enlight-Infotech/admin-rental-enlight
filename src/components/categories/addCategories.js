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

function AddCategories({ open, handleClose, refreshData }) {
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [categoryImg, setCategoryImg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName || !categoryDesc || !categoryImg || !categoryId) {
            alert("Please fill all fields and select an image");
            return;
        }

        const formData = {
            categoryName,
            categoryDesc,
            imageUrl:
                "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?cs=srgb&dl=pexels-designecologist-1779487.jpg&fm=jpg",
            categoryId,
        };

        try {
            const response = await axios.post(
                "http://localhost:5500/api/admin/categories/add",
                formData
            );

            alert("Category added successfully!");
            console.log(response.data);

            setCategoryName("");
            setCategoryDesc("");
            setCategoryImg(null);
            setCategoryId("");
            refreshData();
            handleClose();
        } catch (err) {
            console.error(err);
            alert("Error adding category");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Category</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {/* Category ID */}
                        <TextField
                            label="Category ID (use hyphen instead of space)"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[A-Za-z]+(-[A-Za-z]+)*$",
                                title:
                                    "Category ID must contain only letters (a-z) and hyphens. No spaces or numbers.",
                            }}
                            fullWidth
                        />

                        {/* Category Name */}
                        <TextField
                            label="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            fullWidth
                            required
                        />

                        {/* Description */}
                        <TextField
                            label="Category Description"
                            multiline
                            minRows={4}
                            value={categoryDesc}
                            onChange={(e) => setCategoryDesc(e.target.value)}
                            fullWidth
                            required
                        />

                        {/* Image Upload */}
                        <Button variant="outlined" component="label">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setCategoryImg(e.target.files[0])}
                                required
                            />
                        </Button>

                        {categoryImg && (
                            <small style={{ color: "green" }}>
                                Selected: {categoryImg.name}
                            </small>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Add Category
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddCategories;
