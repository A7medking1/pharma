import React, { useEffect, useState, useCallback } from "react";
import Search from "../../Components/Search/Search";
import { Fragment } from "react";
import { Row } from "react-bootstrap";
import "../../css/Cares.css";

const CategoryView = ({ categoryId, categoryName, ViewComponent }) => {
  const [products, setProducts] = useState([]);

  // useCallback to memoize fetchDataHandler to prevent unnecessary re-creation
  const fetchDataHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/product?CategoryId=${categoryId}`,
      
      );

      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const product = await response.json();
      console.log('Fetched JSON:', product); 
      const productData = product.data.map(item => ({
        idProduct: item.id,
        nameProduct: item.name,
        imgProduct: item.pictureUrl,
        pharmaciesType: item.pharmacies,
        priceProduct: item.price,
        quantityProduct: item.quantity,
      }));
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors here, for example, setting an error state
    }
  }, [categoryId]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <Fragment>
      <Search id="custom-search" />
      <div className="container">
        <Row id="Cares">
          <h2>{categoryName}</h2>
        </Row>
      </div>
      <ViewComponent myProduct={products} />
    </Fragment>
  );
};

export default CategoryView;
