import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "components/collection/Breadcrumb";
const Collections = () => {
    return (
        <div className="py-5 w-full flex justify-center">
            <div className="w-full ">
                <Breadcrumb />
                <Outlet />
            </div>
        </div>
    );
};

export default Collections;
