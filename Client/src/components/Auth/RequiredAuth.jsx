import { useRecoilValue } from 'recoil'
import { isLoggedInAtom, rolesAtom } from '../../recoil/atoms'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const RequiredAuth = ({ allowedRoles }) => {
    const isLoggedIn = useRecoilValue(isLoggedInAtom)
    const role = useRecoilValue(rolesAtom)
    const location = useLocation()

    // return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    return isLoggedIn && allowedRoles.includes(role) ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate to={"/denied"} state={{ from: location }} replace />
    ) : (
        <Navigate to={"/signin"} state={{ from: location }} replace />
    )
}