import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteUser from "./delete-user";
import Register from "./register";
import { Navigate, useNavigate } from "react-router-dom";

function Users() {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const [userLoading, setUserLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'createdAt', headerName: 'Created At', width: 200 }
    ];
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedProductDelete, setSelectedProductDelete] = useState();
    const navigate = useNavigate();

    async function getUsers() {
        setUserLoading(true);
        const response = await axios.get("http://localhost:5500/api/auth/users/get");
        const users = response.data.resultData;
        setUserData(users);
        setUserLoading(false);
    }

    useEffect(() => {
        getUsers()
    }, [])

    function openRegisterPage() {
        navigate('/register')
    }

    function deleteUsers() {
        setShowDeleteDialog(true);
    }

    function toggleDeleteDialog() {
        setShowDeleteDialog(!showDeleteDialog);
    }
    return (
        <div style={{ p: 2, padding: "10px" }}>
            <div style={{ textAlign: 'right', marginBottom: '5px' }}>
                <Button sx={{ marginRight: '10px' }} onClick={deleteUsers} variant="contained" color="error" {...(userLoading && { loading: true })}>Delete</Button>
                {storedUserData && storedUserData.role === '1' && <Button onClick={openRegisterPage} variant="outlined" color="secondary" {...(userLoading && { loading: true })}>Add User</Button>}
            </div>
            <Box sx={{ width: 'auto' }}>
                <DataGrid
                    columns={columns}
                    rows={userData}
                    loading={userLoading}
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
            <DeleteUser
                selectedRows={(selectedRows.length > 0) ? selectedRows : [selectedProductDelete]}
                open={showDeleteDialog}
                handleClose={toggleDeleteDialog}
                refreshData={getUsers}
            />
        </div>
    )
}

export default Users