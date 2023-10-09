import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { offModel } from "../../app/ProductModel";

const Model = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <div
                className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.3)] z-40"
                onClick={() => dispatch(offModel())}
            ></div>

            {children}
        </div>
    );
};

export default Model;
