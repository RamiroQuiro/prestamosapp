import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function RangoFechaCuota() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const flatpickrRef = useRef(null);

  useEffect(() => {
    if (flatpickrRef.current) {
      flatpickr(flatpickrRef.current, {
        mode: "range",
        dateFormat: "Y-m-d",
        onChange: function (selectedDates) {
          setStartDate(selectedDates[0]);
          setEndDate(selectedDates[1]);
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 shadow-lg items-center justify-evenly h-full bg-white w-full rounded text-primary-texto p-4 rounded-b-3xl">
      <input ref={flatpickrRef} type="text" className="flatpickr-input" />
      <p>Fecha de inicio: {startDate && startDate.toLocaleDateString()}</p>
      <p>Fecha de fin: {endDate && endDate.toLocaleDateString()}</p>
    </div>
  );
}
