import React from "react";
import "boxicons";
import apiSlice from "../store/apiSlice";
import Transaction from "./Transaction";

const List = () => {
  const obj = [
    {
      name: "Savings",
      color: "#f9c74f",
    },
    {
      name: "Investment",
      color: "#f9c74f",
    },
    {
      name: "Expense",
      color: "#9d4edd",
    },
  ];

  const { data, isError, isFetching, isLoading, isSuccess } =
    apiSlice.useGetLabelsQuery();

  const [deleteTransaction] = apiSlice.useDeleteTransactionMutation();

  let transaction;

  const handleDelete = async (e) => {
    if (!e.target.dataset.id) return 0;
    await deleteTransaction(e.target.dataset.id);
  };
  if (isFetching) {
    transaction = <div> Fetching</div>;
  } else if (isSuccess) {
    transaction = data?.map((value, index) => (
      <Transaction category={value} key={index} handler={handleDelete} />
    ));
  } else if (isError) {
    transaction = <div> Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">Recent Transaction</h1>
      {transaction}
    </div>
  );
};

export default List;
