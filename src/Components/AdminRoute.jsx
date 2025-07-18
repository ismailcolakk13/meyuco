import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../data/Context";

const AdminRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default AdminRoute;
