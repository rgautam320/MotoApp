import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDetails } from "../../Data/reducers/user.reducer";

ChartJS.register(CategoryScale, LinearScale, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { dashboard } = useSelector((_) => _.user);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, dashboard?.totalEarned],
            },
        ],
    };
    const productState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [dashboard?.product?.outOfStock, dashboard?.product?.total - dashboard?.product?.outOfStock],
            },
        ],
    };
    const orderState = {
        labels: ["Delivered", "Not Delivered"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [dashboard?.order?.delivered, dashboard?.order?.total - dashboard?.order?.delivered],
            },
        ],
    };
    const userState = {
        labels: ["Active", "Not Active"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [dashboard?.user?.active, dashboard?.user?.total - dashboard?.user?.active],
            },
        ],
    };

    useEffect(() => {
        dispatch(getDashboardDetails());
    }, [dispatch]);

    return (
        <>
            <div className="container adminDashboard__dashboard">
                <h1 className="heading adminDashboard__heading">Admin Dashboard</h1>

                <div className="adminDashboard__circles">
                    <NavLink
                        exact
                        to="/admin/dashboard/products"
                        className="adminDashboard__circles__links adminDashboard__circles__link1"
                    >
                        <div className="adminDashboard__circles__links__details">
                            <span>Products</span>
                            <span>{dashboard?.product?.total}</span>
                        </div>
                    </NavLink>
                    <NavLink
                        exact
                        to="/admin/dashboard/orders"
                        className="adminDashboard__circles__links adminDashboard__circles__link2"
                    >
                        <div className="adminDashboard__circles__links__details">
                            <span>Orders</span>
                            <span>{dashboard?.order?.total}</span>
                        </div>
                    </NavLink>
                    <NavLink
                        exact
                        to="/admin/dashboard/users"
                        className="adminDashboard__circles__links adminDashboard__circles__link3"
                    >
                        <div className="adminDashboard__circles__links__details">
                            <span>Users</span>
                            <span>{dashboard?.user?.total}</span>
                        </div>
                    </NavLink>
                </div>
                <hr />
                <div className="adminDashboard__lineChart">
                    <Line options={options} data={lineState} />
                </div>
                <hr />
                <div className="row my-5">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="adminDashboard__doughnutChart">
                            <h5 className="sub-heading">Products</h5>
                            <Doughnut options={options} data={productState} />
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="adminDashboard__doughnutChart">
                            <h5 className="sub-heading">Orders</h5>
                            <Doughnut options={options} data={orderState} />
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="adminDashboard__doughnutChart">
                            <h5 className="sub-heading">Users</h5>
                            <Doughnut options={options} data={userState} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
