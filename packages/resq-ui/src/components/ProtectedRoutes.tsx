import React from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoutes({children}){
    const navigate = useNavigate();
    const admin = true;
return (
   
         admin ? children : navigate("/")

    
)
}