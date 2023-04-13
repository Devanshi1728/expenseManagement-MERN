import React from "react";
import "boxicons";
import apiSlice from "../store/apiSlice";
import Transaction from "./Transaction";
import { CircularProgress } from "@mui/material";

const List = () => {
  const { data, isError, isFetching, isSuccess } = apiSlice.useGetLabelsQuery();

  const [deleteTransaction] = apiSlice.useDeleteTransactionMutation();

  let transaction;

  const handleDelete = async (e) => {
    if (!e.target.dataset.id) return 0;
    await deleteTransaction(e.target.dataset.id);
  };
  if (isFetching) {
    transaction = <CircularProgress color="success" />;
  } else if (isSuccess) {
    transaction = data?.map((value, index) => (
      <Transaction category={value} key={index} handler={handleDelete} />
    ));
  } else if (isError) {
    transaction = <div> Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      {data?.length ? (
        <h1 className="py-4 font-bold text-xl">Recent Transactions</h1>
      ) : (
        <h1 className="text-gray-500">No trasactions found</h1>
      )}
      {transaction}
    </div>
  );
};

export default List;
