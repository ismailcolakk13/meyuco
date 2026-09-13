import React from "react";

const Spinner = ({ message = "Yükleniyor..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4" role="status" />
    <div className="text-sm font-medium text-slate-600 animate-pulse">{message}</div>
  </div>
);

export default Spinner;

