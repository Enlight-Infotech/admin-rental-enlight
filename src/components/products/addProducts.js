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

function AddProducts({ open, handleClose, refreshData }) {
    const [ProductId, setProductId] = useState("");
    const [ProductName, setProductName] = useState("");
    const [ProductDesc, setProductDesc] = useState("");
    const [ProductImg, setProductImg] = useState(null);
    const [productPrice, setProductPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ProductName || !ProductDesc || !ProductImg || !ProductId) {
            alert("Please fill all fields and select an image");
            return;
        }

        const formData = {
            productName: ProductName,
            productDesc: ProductDesc,
            imageUrl:
                "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?cs=srgb&dl=pexels-designecologist-1779487.jpg&fm=jpg",
            productId: ProductId,
            productPrice: productPrice,
            discountPrice: discountPrice,
        };

        try {
            const response = await axios.post(
                "http://localhost:5500/api/admin/products/add",
                formData
            );

            alert("Product added successfully!");
            console.log(response.data);

            setProductName("");
            setProductDesc("");
            setProductImg(null);
            setProductId("");

            setProductPrice(0);
            setDiscountPrice(0);
            refreshData();
            handleClose();
        } catch (err) {
            console.error(err);
            alert("Error adding product");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Product</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {/* Product ID */}
                        <TextField
                            label="Product ID (use hyphens instead of spaces)"
                            value={ProductId}
                            onChange={(e) => setProductId(e.target.value)}
                            required
                            inputProps={{
                                pattern: "^[A-Za-z]+(-[A-Za-z]+)*$",
                                title:
                                    "Product ID must contain only letters (a-z) and hyphens. No spaces or numbers.",
                            }}
                            fullWidth
                        />

                        {/* Product Name */}
                        <TextField
                            label="Product Name"
                            value={ProductName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            fullWidth
                        />

                        {/* Description */}
                        <TextField
                            label="Product Description"
                            value={ProductDesc}
                            onChange={(e) => setProductDesc(e.target.value)}
                            multiline
                            minRows={4}
                            required
                            fullWidth
                        />

                        {/* Image Upload */}
                        <Button variant="outlined" component="label">
                            Upload Product Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setProductImg(e.target.files[0])}
                                required
                            />
                        </Button>

                        {ProductImg && (
                            <small style={{ color: "green" }}>
                                Selected: {ProductImg.name}
                            </small>
                        )}

                        {/* Product Price */}
                        <TextField
                            label="Product Price"
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                            fullWidth
                        />

                        {/* Discount Price */}
                        <TextField
                            label="Discount Price"
                            type="number"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            required
                            fullWidth
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Add Product
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddProducts;
