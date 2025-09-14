import React from 'react'
import FooterMain from './FooterMain';


export default function Layout({children}) {
  return (
    <div className="App">
    {children}
    <FooterMain />
    </div>
  )
}


