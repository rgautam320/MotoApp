import React, { useState } from "react";
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
    Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createProduct, productActions } from "../../Data/reducers/product.reducer";

const AddProductModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();

    const [data, setData] = useState({});

    const [images, setImages] = useState([]);
    const [countImages, setCountImages] = useState(0);

    const onImageSelect = (e) => {
        if (e.target.name === "images") {
            setCountImages(e.target.files?.length);
            let files = [];
            for (let i = 0; i < e.target.files?.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        files.push(reader.result);
                    }
                };
                reader.readAsDataURL(e.target.files[i]);
            }
            setImages(files);
        }
    };

    const onClose = () => {
        handleClose();
        setImages([]);
        setCountImages(0);
        setData({});
    };

    const onCreateProduct = async () => {
        const request = { ...data, images };
        await dispatch(createProduct(request));
        dispatch(productActions.reset());
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <Box padding={2}>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Only specific fields can be updated later. Make sure you fill in the correct details.
                        </DialogContentText>
                        <Box my={2}>
                            <TextField
                                type="text"
                                label="Name"
                                value={data?.name}
                                variant="standard"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                fullWidth
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                type="number"
                                label="Price"
                                defaultValue={data?.price}
                                variant="standard"
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                                fullWidth
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                type="number"
                                label="Stock"
                                defaultValue={data?.stock}
                                variant="standard"
                                onChange={(e) => setData({ ...data, stock: e.target.value })}
                                fullWidth
                            />
                        </Box>
                        <Box my={2}>
                            <Select
                                value={data?.category}
                                onChange={(e) => setData({ ...data, category: e.target.value })}
                                label="Status"
                                defaultValue="Mobile"
                                fullWidth
                            >
                                <MenuItem value="Mobile">Mobile</MenuItem>
                                <MenuItem value="Laptop">Laptop</MenuItem>
                                <MenuItem value="Electronics">Electronics</MenuItem>
                                <MenuItem value="Accessories">Accessories</MenuItem>
                            </Select>
                        </Box>
                        <Box my={2}>
                            <TextField
                                type="text"
                                label="Description"
                                defaultValue={data?.description}
                                variant="standard"
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                fullWidth
                                multiline
                            />
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">
                                {countImages !== 0 ? `${countImages} images selected` : ""}
                            </Typography>
                            <Button variant="contained" component="label" fullWidth>
                                Upload Images
                                <input
                                    type="file"
                                    multiple
                                    name="images"
                                    accept=".jpg, .png"
                                    onChange={onImageSelect}
                                    hidden
                                />
                            </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={onCreateProduct}>
                            Add Product
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default AddProductModal;
