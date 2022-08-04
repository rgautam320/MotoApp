import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { activate } from "../../Data/reducers/user.reducer";

const ActivateAccount = ({ match }) => {
    const { user } = useSelector((state) => state.user);
    const { token } = match.params;

    const history = useHistory();
    const dispatch = useDispatch();

    const alert = useAlert();

    useEffect(() => {
        dispatch(activate(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (user?.active) {
            history.push("/auth");
            alert.success("Account activated successfully.");
        }
    }, [user, history, alert]);

    return (
        <>
            <div className="activateAccount__activateAccount" />
        </>
    );
};

export default ActivateAccount;
