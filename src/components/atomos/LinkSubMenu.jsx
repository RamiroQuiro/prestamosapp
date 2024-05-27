import React from 'react'

export default function LinkSubMenu({href,children}) {

    const isActive=href.includes(children)
  return (
    <a href={href} className={`$ text-xs font-bold capitalize rounded-full px-2 py-1 border border-primary-200/50 hover:border-primary-100 duration-200 hover:bg-primary-200/10`}>{children}</a>
  )
}
