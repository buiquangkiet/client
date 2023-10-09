import { apiGetAuctionProducts } from "apis/auctionProduct";
import { apiDeleteProduct, apiGetProducts } from "apis/product";
import { setLoading } from "app/appSlice";
import Pagination from "components/Pagination/Pagination";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounce } from "ultils/hook";
import { SearchIcon } from "ultils/icons";

const ManageAuctionProducts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const name = queryParams.get("name") || "";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState(name);
  const debounceSearch = useDebounce(searchInput.trim(), 500);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    setCurrentPage(1);
  }, [debounceSearch]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiGetAuctionProducts({
        page: currentPage,
        title: debounceSearch,
      });
      if (response.success) {
        setProducts(response.products);
        setTotal(response.total);
      }
    };
    queryParams.set("page", currentPage);
    queryParams.set("name", debounceSearch);
    navigate("?" + queryParams.toString());
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debounceSearch]);

  const handleDeleteProduct = async (_id) => {
    Swal.fire({
      title: "Do you want to delete this user",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        const response = await apiDeleteProduct(_id);
        dispatch(setLoading(false));

        if (response.success) {
          Swal.fire("Deleted!", response.message, "success").then(
            () => setProducts(products.filter((user) => user._id !== _id))
          );
        }
      }
    });
  };
  return (
    <div className="w-full mx-auto p-4  text-left ">
      <div className="font-semibold text-[20px] my-5 mb-8">
        Manage Products
      </div>
      <div className=" text-black flex items-center rounded-full bg-[rgba(255,255,255,0.2)] pr-5 gap-3 w-fit mb-5 border ">
        <input
          type="text"
          placeholder="Search Product by Title or Brand"
          className="outline-none border-none rounded-full bg-transparent h-[40px] px-5 w-[500px] text-[16px]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div>
          <SearchIcon size={20} className="cursor-pointer " />
        </div>
      </div>
      <div className="text-[13px] text-left text-gray-500 w-full  overflow-x-auto whitespace-nowrap">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr className="text-[16px]">
              <th className="font-semibold p-3">#</th>
              <th className="font-semibold p-3">Thumbnail</th>
              <th className="font-semibold p-3">Title</th>
              <th className="font-semibold p-3">Category</th>
              <th className="font-semibold p-3">Brand</th>
              <th className="font-semibold p-3">Reserved Price</th>
              <th className="font-semibold p-3 ">Step Price</th>
              <th className="font-semibold p-3">Expire</th>
              <th className="font-semibold p-3">Updated At</th>
              <th className="font-semibold p-3">Action</th>
            </tr>
          </thead>
          <tbody className=" ">
            {products &&
              products.map((product, index) => (
                <tr key={product._id}>
                  <td className="p-3">
                    {(page - 1) * 10 + index + 1}
                  </td>
                  <td className="p-3">
                    <img src={product.thumbnail.path ? product.thumbnail.path : product.thumbnail} className="w-[80px] h-[80px] object-cover border" alt="" />
                  </td>
                  <td className="p-3">{product?.title}</td>
                  <td className="p-3">{product?.category?.title}</td>
                  <td className="p-3">{product.brand}</td>
                  <td className="p-3">
                    <p title={`$${(product.reservePrice * 0.000043).toFixed(2)}USD`}>
                      {product.reservePrice.toLocaleString("vi-VN") + " VND"}
                    </p>
                  </td>
                  <td className="p-3">
                    <p title={`$${(product.stepPrice * 0.000043).toFixed(2)}USD`}>
                      {product.stepPrice.toLocaleString("vi-VN") + " VND"}
                    </p>
                  </td>
                  <td className="p-3">{new Date(product.expire).toLocaleDateString("vi-VN")}</td>
                  <td className="p-3">
                    {moment(product.updatedAt).format(
                      "DD/MM/YYYY"
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/edit-auction-product/${product._id}`}
                        className="underline cursor-pointer hover:text-main">
                        Edit
                      </Link>
                      <span
                        className="underline cursor-pointer hover:text-main"
                        onClick={() =>
                          handleDeleteProduct(product._id)
                        }
                      >Remove</span>
                    </div>
                  </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="float-right">
        <Pagination
          totalCount={total}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageAuctionProducts;
