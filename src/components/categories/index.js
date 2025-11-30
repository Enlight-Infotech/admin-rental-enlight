import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddCategories from "./addCategories";
import DeleteCategories from "./delete-categories";

const Cateogry = () => {
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategoryDelete, setSelectedCategoryDelete] = useState();
  async function getCategories() {
    setCategoryLoading(true);
    const response = await axios.get("http://localhost:5500/api/admin/categories/get");
    const products = response.data.resultData;
    setCategoryData(products);
    setCategoryLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, [])

  const columns = [
    { field: 'key', headerName: 'ID', width: 300 },
    { field: 'categoryName', headerName: 'Name', width: 300 },
    { field: 'categoryDesc', headerName: 'Description', width: 300 },
    { field: 'imageUrl', headerName: 'Image URL', width: 300 },
  ];

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  function toggleDeleteDialog() {
    setShowDeleteDialog(!showDeleteDialog);
  }

  function deleteCategory() {
    
    setShowDeleteDialog(true);
  }

  return (
    <div style={{ p: 2, padding: "10px" }}>
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button sx={{marginRight: '10px'}} onClick={deleteCategory} variant="contained" color="error" {...(categoryLoading && { loading: true })}>Delete</Button>
        <Button onClick={toggleDialog} variant="outlined" color="secondary" {...(categoryLoading && { loading: true })}>Add Category</Button>
      </div>
      <Box sx={{ width: 'auto' }}>
        <DataGrid
          columns={columns}
          rows={categoryData}
          loading={categoryLoading}
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
      <AddCategories
        open={showDialog}
        handleClose={toggleDialog}
        refreshData={getCategories}
      />
      <DeleteCategories 
        open={showDeleteDialog} 
        handleClose={toggleDeleteDialog} 
        refreshData={getCategories}
        selectedRows={(selectedRows.length > 0) ? selectedRows : [selectedCategoryDelete]}
      />

    </div>
  );
};

export default Cateogry;
