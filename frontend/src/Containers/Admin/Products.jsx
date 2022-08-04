import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

import AddProductModal from "../../Components/Admin/AddProductModal";

import { deleteProduct, getAllProductsAdmin, productActions, updateProduct } from "../../Data/reducers/product.reducer";

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { productsAdmin, error, success } = useSelector((state) => state.product);

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editItem, setEditItem] = useState({});

    const handleClickOpen = (params) => {
        setOpen(true);
        setEditItem(params);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenModal(false);
    };

    const columns = [
        {
            field: "id",
            flex: 0.3,
            headerName: "Product ID",
            minWidth: 180,
            type: "string",
            sortable: false,
            renderCell: (params) => {
                return <NavLink to={`/product/${params.getValue(params.id, "id")}`}>{params.id}</NavLink>;
            },
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 80,
            flex: 0.6,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 60,
            flex: 0.3,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 60,
            flex: 0.5,
        },
        {
            field: "stock",
            headerName: "Stock",
            minWidth: 60,
            flex: 0.5,
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 60,
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
                            onClick={() => handleClickOpen(params.row)}
                            cursor="pointer"
                        />
                        <MdOutlineDelete onClick={() => onDelete(params.id)} color="red" cursor="pointer" />
                    </>
                );
            },
        },
    ];
    const rows = [];
    productsAdmin &&
        productsAdmin.forEach((item) => {
            rows.push({
                id: item?._id,
                name: item?.name,
                price: item?.price,
                rating: item?.rating,
                stock: item?.stock,
                category: item?.category,
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
                await dispatch(deleteProduct(id));
                dispatch(productActions.reset());
                dispatch(getAllProductsAdmin());
            }
        });
    };

    const onUpdate = async (data) => {
        await dispatch(updateProduct({ id: data?.id, data }));
        handleClose();
        dispatch(getAllProductsAdmin());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (error) {
            alert.error(error);
        } else if (success) {
            alert.success(success);
        }
        dispatch(productActions.reset());
    }, [error, dispatch, alert, success]);

    useEffect(() => {
        dispatch(getAllProductsAdmin());
    }, [dispatch]);

    return (
        <div className="container products">
            <h1 className="heading products__heading">Products</h1>

            <Dialog open={open} onClose={handleClose}>
                <Box padding={2}>
                    <DialogTitle>Update Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Only the below fields are editable once product is created. You can always delete the
                            product and create new one.
                        </DialogContentText>
                        <Box my={2}>
                            <TextField
                                type="text"
                                label="Name"
                                value={editItem?.name}
                                variant="standard"
                                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                fullWidth
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                type="number"
                                label="Price"
                                defaultValue={editItem?.price}
                                variant="standard"
                                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                                fullWidth
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                type="number"
                                label="Stock"
                                defaultValue={editItem?.stock}
                                variant="standard"
                                onChange={(e) => setEditItem({ ...editItem, stock: e.target.value })}
                                fullWidth
                            />
                        </Box>
                        <Select
                            value={editItem?.category}
                            onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                            label="Status"
                            fullWidth
                        >
                            <MenuItem value="Mobile">Mobile</MenuItem>
                            <MenuItem value="Laptop">Laptop</MenuItem>
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Accessories">Accessories</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={() => onUpdate(editItem)}>
                            Update
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                autoHeight
            />

            <Box my={5} display="flex" justifyContent="flex-end">
                <Button variant="outlined" color="secondary" onClick={() => setOpenModal(true)}>
                    + Add Product
                </Button>
            </Box>

            <AddProductModal open={openModal} handleClose={handleClose} />
        </div>
    );
};

export default Products;
