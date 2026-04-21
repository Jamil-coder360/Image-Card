import React from 'react'

const Button = ({ Tagname="button",children,  className="" , ...props }) => {
  return (
   <Tagname {...props} className={`bg-blue-500 text-center text-white px-4 py-2 rounded ${className}  `}>
    {children}
   </Tagname>
  )
}

export default Button