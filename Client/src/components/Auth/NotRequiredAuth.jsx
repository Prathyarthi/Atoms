import React from "react";
import { useRecoilValue } from "recoil";

import { Navigate, Outlet } from "react-router-dom";
import { isLoggedInAtom } from "../../recoil/atoms";

const NotRequiredAuth = () => {
    const isLoggedIn = useRecoilValue(isLoggedInAtom);
    return isLoggedIn ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default NotRequiredAuth;
