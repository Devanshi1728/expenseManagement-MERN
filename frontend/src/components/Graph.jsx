import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { chartData, getSum } from "../helper/helper";
import apiSlice from "../store/apiSlice";
import { CircularProgress } from "@mui/material";

Chart.register(ArcElement);
const Graph = () => {
  const { data, isError, isFetching, isSuccess } = apiSlice.useGetLabelsQuery();
  let graphData;

  if (isFetching) {
    graphData = <CircularProgress color="success" />;
  } else if (isSuccess) {
    graphData = <Doughnut {...chartData(data)} />;
  } else if (isError) {
    graphData = <div> Error</div>;
  }

  return (
    <div className="justify-content max-w-xs auto">
      <div className="item">
        <div className="chart relative">
          {graphData}
          {data?.length ? (
            <h3 className="mb-4 font-bold title">
              Total
              <span className="block text-3xl text-emerald-400">
                Rs.{getSum(data) ?? 0}
              </span>
            </h3>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex flex-col py-10 gap-4">
        <Labels />
      </div>
    </div>
  );
};

export default Graph;
