import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import Routes from "./Routes";
import UserOptions from "../Components/Navbar/UserOptions";
import MotoBackdrop from "../Components/Shared/MotoBackdrop";

const Layout = () => {
    const [loading, setLoading] = useState(false);

    const { isAuthenticated, user } = useSelector((state) => state.user);

    const { loading: loading1 } = useSelector((_) => _.cart);
    const { loading: loading2 } = useSelector((_) => _.user);
    const { loading: loading3 } = useSelector((_) => _.contact);
    const { loading: loading4 } = useSelector((_) => _.order);
    const { loading: loading5 } = useSelector((_) => _.product);

    useEffect(() => {
        setLoading(loading1 || loading2 || loading3 || loading4 || loading5);
    }, [loading1, loading2, loading3, loading4, loading5]);

    return (
        <>
            <MotoBackdrop loading={loading} />
            {isAuthenticated && <UserOptions user={user} />}
            <Navbar />
            <Routes />
            {user?.role === "user" && <Footer />}
        </>
    );
};

export default Layout;
