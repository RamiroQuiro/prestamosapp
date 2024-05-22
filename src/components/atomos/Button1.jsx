import React from 'react'

export default function Button1({ children, handleClick }) {

  
    return (
        <button
            onClick={handleClick}
            className="px-3 py-2 rounded-lg font-semibold capitalize border-primary-100 duration-300 text-xs border-dashed border bg-primary-200/20 hover:bg-primary-200 hover:text-white hover:border-primary-resaltado">
                {children}
        </button>
    )
}
