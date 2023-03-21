import { useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";

import { Doughnut } from "react-chartjs-2";
export default function CheckboxesResponse({ number, text, data }) {
  const response = {
    "STEM-related": 2,
    Music: 2,
    Art: 10,
    Gaming: 2,
  };

  const chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        hoverOffset: 4,
      },
    ],
  };

  for (const [key, value] of Object.entries(data)) {
    chartData.labels.push(key);
    chartData.datasets[0].data[chartData.labels.indexOf(key)] = value;
  }
  return (
    <>
      <div className="space-y-2">
        <TextareaAutosize
          type="text"
          className="text-2xl w-full bg-transparent border-b border-gray-300 py-2 outline-none resize-none"
          value={text}
          placeholder="Question"
          readOnly
        />
        <Pie data={chartData} />
      </div>
    </>
  );
}

const data = {
  labels: ["Red", "Green", "Blue"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: "bottom",
  },
};
const PieChart = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

<div className="w-full max-w-lg mx-auto">
  <Pie data={data} options={options} className="rounded-lg shadow-md" />
</div>;
