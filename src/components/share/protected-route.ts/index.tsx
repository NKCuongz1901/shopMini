import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "@/services/api"; // Import API getMe

import NotPermitted from "./not-permitted";
import Loading from "../loading";
import { IUser } from "@/types/global";

const RoleBaseRoute = (props: any) => {
    const { userRole } = props;

    if (userRole !== "USER") {
        return <>{props.children}</>;
    } else {
        return <NotPermitted />;
    }
};

const ProtectedRoute = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe(); // Gọi API getMe
                console.log("Response from getMe:", response);
                setIsAuthenticated(true);
                setUserRole(response.data?.user.role); // Lấy role từ API
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <RoleBaseRoute userRole={userRole}>
            {props.children}
        </RoleBaseRoute>
    );
};

export default ProtectedRoute;