import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { rangoCuotasSelect } from "../../../context/store";

export default function RangoFechaPagos({userId}) {
  let hoy = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(hoy);
  const [endDate, setEndDate] = useState(hoy);
  const [dataResult, setDataResult] = useState(null)
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
    const fetching=async ()=>{
      try {
        const res=await fetch(`/api/report/pagos/usuario/${userId}`,{
            method:'GET',
            headers: {
                'startDate':startDate,
                'endDate': endDate
              }
        })
        const data=await res.json()
        // console.log(data)
        setDataResult(data)
      
    } catch (error) {
        console.log(error)
    }
    }
    fetching()
  }, [endDate]);



  const redirectCuotas=()=>{
    document.location.href=`/dashboard/pagosSelect/${startDate.getTime()}-${endDate.getTime()}`
  }
  return (
    <div className="flex flex-col gap-3 shadow-lg items-center justify-evenly h-full bg-white w-full rounded text-primary-texto p-4 rounded-b-3xl">
     
     <h3 className="font-medium">Pagos</h3>
      <input ref={flatpickrRef} type="text" defaultValue={hoy} className="flatpickr-input px-3 py-1 rounded-lg font-semibold capitalize border-primary-100 duration-300 text-xs border-dashed border bg-transparent hover:bg-primary-100/80 hover:text-white cursor-pointer hover:border-primary-resaltado" />
      <div id="result">
        
       <span onClick={redirectCuotas} className="cursor-pointer font-black text-lg"> {
        dataResult&&
        
        dataResult?.data?.length
        }
        </span>
        </div> 
    </div>
  );
}
