import React from 'react'

export default function InputsDatos({label,type,valueInput,name,id}) {
    return (
        <div className='flex w-[45%] my-1 flex-grow  items-start justify-start px-2'>
            <label htmlFor={name} className='mr-3   text-primary-100  font-thin'>
               {label}
            </label>
            <input name={name} type={type} value={valueInput} className='border-b font border-primary-100/20 active:ring-0  selection:border-transparent  rounded flex-grow selection:ring-0 px-2 valid:ring-0 ' />
        </div>
    )
}
