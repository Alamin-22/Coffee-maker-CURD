import { Outlet } from "react-router-dom";
import Navbar from "../COmponents/Header/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;