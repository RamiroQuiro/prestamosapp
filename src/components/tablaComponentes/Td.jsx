import React from 'react'

export default function Td({children,estado}) {
  return (
    <td className={`border-t-0 px-2 align-middle text-center  py-3 border-l-0 border-r-0 text-xs whitespace-nowrap  `}>
   {typeof children === 'boolean' ?
      <span className={`${estado?' bg-green-600':' bg-red-400'}  text-[10px] font-thin text-white px-2 p-1 rounded-full`}> {estado?'✓':'✕'}</span>
      :
      children instanceof Date ?
      <> {children.toLocaleDateString()}</>:
     <> {children}</>
      }
      </td>
  )
}
