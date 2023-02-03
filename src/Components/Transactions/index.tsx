import React, { useState, useEffect } from "react";
import Button from "plaid-threads/Button";
import Note from "plaid-threads/Note";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "../Table";
import Error from "../Error";
import { DataItem, Categories, ErrorDataItem, Data } from "../../dataUtilities";

import styles from "./index.module.scss";
import internal from "stream";

interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}

const Transactions = (props: Props) => {
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/${props.endpoint}`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      setError(data.error);
      setIsLoading(false);
      return;
    }

    // return console.log("checking data...",data);

    let result = props.transformData(data);
    result.map((item: any, index: any) => {
      let balance: any;

      balance =
        "+ " +
        (
          Math.ceil(item.amount.split(" ")[1].replace(",", "")) -
          item.amount.split(" ")[1].replace(",", "")
        ).toFixed(2);

      result[index] = { ...result[index], sats: balance };
    });
    setTransformedData(result); // transform data into proper format for each individual product
    if (data.pdf != null) {
      setPdf(data.pdf);
    }
    setShowTable(true);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [props]);

  return (
    <>
      {showTable ? (
        <Table
          categories={props.categories}
          data={transformedData}
          isIdentity={props.endpoint === "identity"}
        />
      ) : (
        <CircularProgress disableShrink />
      )}
      {/* {error != null && <Error error={error} />} */}
    </>
  );
};

Transactions.displayName = "Transactions";

export default Transactions;
