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
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

import { deleteOrderAdmin, getAllOrdersAdmin, orderActions, updateOrderAdmin } from "../../Data/reducers/order.reducer";

const Orders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { allOrders, error, success } = useSelector((state) => state.order);

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [editItem, setEditItem] = useState({});

    const handleClickOpen = (id, status) => {
        setOpen(true);
        setEditItem(id);
        setStatus(status);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            field: "id",
            flex: 0.3,
            headerName: "Order ID",
            minWidth: 180,
            type: "string",
            sortable: false,
            renderCell: (params) => {
                return <NavLink to={`/order/${params.getValue(params.id, "id")}`}>{params.id}</NavLink>;
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 60,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "orders__green" : "orders__red";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 80,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 90,
            flex: 0.5,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            minWidth: 120,
            flex: 0.5,
        },
        {
            field: "payment",
            headerName: "Payment",
            minWidth: 125,
            flex: 0.5,
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
                            onClick={() => handleClickOpen(params.id, params.row.status)}
                            cursor="pointer"
                        />
                        <MdOutlineDelete onClick={() => onDelete(params.id)} color="red" cursor="pointer" />
                    </>
                );
            },
        },
    ];
    const rows = [];
    allOrders &&
        allOrders.forEach((item) => {
            rows.push({
                itemsQty: item?.orderItems?.length,
                id: item?._id,
                status: item?.orderStatus,
                createdAt: item?.createdAt,
                payment: item?.paymentInfo?.status === "succeeded" ? "Successful" : item?.paymentInfo?.status,
                amount: `₹${item?.totalPrice}`,
            });
        });

    const fetchOrders = () => {
        dispatch(getAllOrdersAdmin());
    };

    const onDelete = (id) => {
        swal({
            title: "Confirm Delete",
            text: "Are you sure that you want to delete?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Ok"],
        }).then(async (willDelete) => {
            if (willDelete) {
                await dispatch(deleteOrderAdmin(id));
                dispatch(orderActions.reset());
                fetchOrders();
            }
        });
    };

    const onUpdate = async (id, status) => {
        await dispatch(updateOrderAdmin({ id, status }));
        handleClose();
        dispatch(getAllOrdersAdmin());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (error) {
            alert.error(error);
        } else if (success) {
            alert.success(success);
        }
        dispatch(orderActions.reset());
    }, [error, dispatch, alert, success]);

    useEffect(() => {
        dispatch(getAllOrdersAdmin());
    }, [dispatch]);

    return (
        <div className="container orders">
            <h1 className="heading orders__heading">All Orders</h1>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose from the given options to update the status of this order.
                    </DialogContentText>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status" fullWidth>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => onUpdate(editItem, status)}>Update</Button>
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

export default Orders;
