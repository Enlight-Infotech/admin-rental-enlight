import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddProducts from "./addProducts";
import DeleteProduct from "./delete-product";

const Products = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [productData, setProductData] = useState([]);
  const columns = [
    { field: 'id', headerName: 'Category', width: 150 },
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { field: 'productDesc', headerName: 'Description', width: 300 },
    { field: 'imageUrl', headerName: 'Image URL', width: 300 },
    { field: 'productPrice', headerName: 'Product Price', width: 300 },
    { field: 'discountPrice', headerName: 'Discount Price', width: 300 },
  ];
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [selectedRows, setSelectedRows] = useState([]);
  const [selectedProductDelete, setSelectedProductDelete] = useState();

  async function getProducts() {
    setProductLoading(true);
    const response = await axios.get("http://localhost:5500/api/admin/products/get");
    const products = response.data.resultData;
    setProductData(products);
    setProductLoading(false);
  }

  useEffect(() => {
    getProducts()
  }, [])

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  function deleteProduct() {
    setShowDeleteDialog(true);
  }

  function toggleDeleteDialog() {
    setShowDeleteDialog(!showDeleteDialog);
  }

  return (
    <div style={{ p: 2, padding: "10px" }}>
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button sx={{marginRight: '10px'}} onClick={deleteProduct} variant="contained" color="error" {...(productLoading && { loading: true })}>Delete</Button>
        <Button onClick={toggleDialog} variant="outlined" color="secondary" {...(productLoading && { loading: true })}>Add Product</Button>
      </div>
      <Box sx={{ width: 'auto' }}>
        <DataGrid
          columns={columns}
          rows={productData}
          loading={productLoading}
          rowHeight={38}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            setSelectedRows([...ids.ids]);
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#c8c5c5 !important",
              color: "#000000",
              fontSize: 16,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeader--sortable": {
              backgroundColor: "#c8c5c5 !important",
            },

            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f9f9f9",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#dbeaff !important",
            },
          }}
        />
      </Box>
      <AddProducts
        open={showDialog}
        handleClose={toggleDialog}
        refreshData={getProducts}
      />
      <DeleteProduct 
        selectedRows={(selectedRows.length > 0) ? selectedRows : [selectedProductDelete]} 
        open={showDeleteDialog} 
        handleClose={toggleDeleteDialog} 
        refreshData={getProducts}
      />
    </div>
  );
};

export default Products;
