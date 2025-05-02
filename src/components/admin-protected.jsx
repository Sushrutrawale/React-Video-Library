import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export function AdminProtectedRoute(){
    const [cookies,setcookie,removeCookie] = useCookies(['admin']);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!cookies.admin){
            navigate("/admin-login");
        }
    },[cookies.admin,navigate]);

    return cookies.admin ? <Outlet /> : null;
}