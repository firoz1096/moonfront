import React from 'react'
import { useRef, useEffect } from 'react';


export default function InputField({ id, value, onChange}) {

  const myRef = useRef(null);

  useEffect(() => {
   myRef.current.focus()
  }, [])
  


    
  return (
    <input 
        className='input_search_field'
        autoComplete='off' 
        ref={myRef} 
         id={id}
         value={value}
        type="text" 
        onChange={onChange}
      />


  )
}
