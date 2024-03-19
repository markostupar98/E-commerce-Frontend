import React, { useEffect, useState } from "react";
import { ProductsList } from "../components/ProductsList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useFetchHook } from "../../shared/components/hooks/fetchHook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserProducts = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useFetchHook();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/user/${userId}`
        );
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest, userId]);

  const productDelete = (deletedProductId) => {
    setLoadedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && (
        <ProductsList items={loadedProducts} onDeleteProduct={productDelete} />
      )}
    </React.Fragment>
  );
};
export default UserProducts;
