import React, { useState } from "react";
import apiSlice from "../store/apiSlice";
import { getLabels } from "../helper/helper";
import Transaction from "./Transaction";

const Labels = () => {
  const { data, isError, isFetching, isSuccess } = apiSlice.useGetLabelsQuery();
  let transaction;
  // let innerTransaction;

  console.log("data---", data);

  if (isFetching) {
    transaction = <div> Fetching</div>;
  } else if (isSuccess) {
    const innerData = data?.map((item) => item);
    transaction = getLabels(data, "type")?.map((value, index) => (
      <LabelComponent key={index} data={value} item={innerData} />
    ));
    // innerTransaction = data?.map((value, index) => (
    //   <LabelComponent key={index} category={value} />
    // ));
  } else if (isError) {
    transaction = <div>Error</div>;
  }
  return (
    <>
      {transaction}
      {/* {innerTransaction} */}
    </>
  );
};

const LabelComponent = ({ data, item }) => {
  console.log("data here---", item);
  const { type, color, percent } = data;
  const [open, setOpen] = useState(false);
  const [filterData, setFilterData] = useState();

  const handleClick = () => {
    setOpen(!open);
    const newFiltered = item?.filter((value) => value?.type === data?.type);
    setFilterData(newFiltered);
    console.log("new FilterData--", newFiltered);
  };

  if (!data) return <></>;

  return (
    <>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex gap-2">
          <div
            className={`rounded pl-3 py-2`}
            style={{ borderLeft: `8px solid ${color}` }}
          >
            <h3 className="text-md">{type ?? ""}</h3>
          </div>
        </div>
        <h3 className="font-bold">{Math.round(percent) ?? "0"}%</h3>
      </div>
      {open &&
        filterData?.map((data) => {
          return (
            <div
              className="item flex bg-gray-50 py-3 ml-8"
              style={{ borderRight: `8px solid ${data?.color}` }}
            >
              <span className="block w-full">{data?.name}</span>
            </div>
          );
        })}
    </>
  );
};

export default Labels;
