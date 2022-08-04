import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLaunch } from "react-icons/all";
import { NavLink } from "react-router-dom";

import { getMyOrders, orderActions } from "../../Data/reducers/order.reducer";

const Orders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { orders, error } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 120,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "orders__green" : "orders__red";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 180,
            flex: 0.5,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            minWidth: 230,
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
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <NavLink to={`/order/${params.getValue(params.id, "id")}`}>
                        <MdOutlineLaunch />
                    </NavLink>
                );
            },
        },
    ];
    const rows = [];
    orders &&
        orders.forEach((item) => {
            rows.push({
                itemsQty: item?.orderItems?.length,
                id: item?._id,
                status: item?.orderStatus,
                createdAt: item?.createdAt,
                payment: item?.paymentInfo?.status === "succeeded" ? "Successful" : item?.paymentInfo?.status,
                amount: `₹${item?.totalPrice}`,
            });
        });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (error) {
            alert.error(error);
        }
        dispatch(orderActions.reset());
    }, [error, dispatch, alert]);
    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);
    return (
        <div className="container">
            <div className="orders__table">
                <h1 className="heading orders__heading">{user?.name}'s Orders</h1>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>
        </div>
    );
};

export default Orders;
