import React from 'react';
import MainHeader from './MainHeader';
import Layout from './Layout';



export default function MainLayout({ children }) {
  return (
   
    <React.Fragment>
    <Layout>

      <MainHeader />
      {children}
    </Layout>
  </React.Fragment>


  )
}
