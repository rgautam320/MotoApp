import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import { deleteUserAdmin, getAllUsersAdmin, updateUserAdmin, userActions } from "../../Data/reducers/user.reducer";

const Users = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { users, error, success } = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("");
    const [editItem, setEditItem] = useState({});

    const handleClickOpen = (id, role) => {
        setOpen(true);
        setEditItem(id);
        setRole(role);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            field: "id",
            flex: 0.3,
            headerName: "User ID",
            minWidth: 180,
            type: "string",
            sortable: true,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 80,
            flex: 0.4,
            type: "string",
            sortable: true,
        },
        {
            field: "name",
            headerName: "Name",
            type: "strin",
            minWidth: 80,
            flex: 0.4,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            minWidth: 120,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 50,
            flex: 0.4,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 60,
            type: "string",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <MdOutlineEdit
                            color="blue"
                            className="me-2"
                            onClick={() => handleClickOpen(params.id, params.row.role)}
                            cursor="pointer"
                        />
                        <MdOutlineDelete onClick={() => onDelete(params.id)} color="red" cursor="pointer" />
                    </>
                );
            },
        },
    ];
    const rows = [];
    users &&
        users.forEach((item) => {
            rows.push({
                id: item?._id,
                email: item?.email,
                name: item?.name,
                createdAt: item?.createdAt,
                role: item?.role,
            });
        });

    const onDelete = (id) => {
        swal({
            title: "Confirm Delete",
            text: "Are you sure that you want to delete?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Ok"],
        }).then(async (willDelete) => {
            if (willDelete) {
                await dispatch(deleteUserAdmin(id));
                dispatch(userActions.reset());
                dispatch(getAllUsersAdmin());
            }
        });
    };

    const onUpdate = async (id, role) => {
        await dispatch(updateUserAdmin({ id, role }));
        handleClose();
        dispatch(getAllUsersAdmin());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (error) {
            alert.error(error);
        } else if (success) {
            alert.success(success);
        }
        dispatch(userActions.reset());
    }, [error, dispatch, alert, success]);

    useEffect(() => {
        dispatch(getAllUsersAdmin());
    }, [dispatch]);

    return (
        <div className="container users">
            <h1 className="heading users__heading">Users</h1>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Choose from the given options to update the role of user.</DialogContentText>
                    <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role" fullWidth>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => onUpdate(editItem, role)}>Update</Button>
                </DialogActions>
            </Dialog>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
};

export default Users;
