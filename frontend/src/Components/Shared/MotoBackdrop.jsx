import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function MotoBackdrop({ loading }) {
    return (
        <Backdrop style={{ zIndex: "1000" }} sx={{ color: "#fff" }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
