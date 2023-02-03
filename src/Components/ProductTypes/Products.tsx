// import React, { useContext } from "react";

// import Endpoint from "../Endpoint";
import Transactions from "../Transactions";
// import Context from "../../Context";
import ProductTypesContainer from "./ProductTypesContainer";
import {
  transactionsCategories,
  transformTransactionsData,
} from "../../dataUtilities";

const Products = () => {
  // const { products } = useContext(Context);
  return (
    <ProductTypesContainer productType="Transactions">
      <Transactions
        endpoint="transactions"
        name="Transactions"
        categories={transactionsCategories}
        schema="/transactions/get/"
        description="Retrieve transactions for credit and depository accounts."
        transformData={transformTransactionsData}
      />
    </ProductTypesContainer>
  );
};

Products.displayName = "Products";

export default Products;
