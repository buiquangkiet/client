import React from "react";
import FilterCollection from "components/collection/FilterCollection";

const Products = () => {
    return (
        <div className="w-full">
            <FilterCollection fromProduct={true} />
        </div>
    );
};

export default Products;
