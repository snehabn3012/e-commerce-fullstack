import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from './index';
const AdminRoute = () => {
    const authenticatedUser = isAuthenticated();
    return (
        authenticatedUser?.user?.role === 1
            ? <Outlet />
            : <Navigate to="/signin" />
    )
}

export default AdminRoute;