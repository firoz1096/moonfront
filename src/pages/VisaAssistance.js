import MainLayout from '../components/MainLayout';
import VisaCards from '../components/VisaCards'
import visabg from '../assets/images/visa-bg.jpg';


export default function VisaAssistance() {
  return (
   <>
   <MainLayout> 

    
    <div className='inner_half_banner' 
                style={{
               backgroundImage: `url("${visabg}")`,
                            
            }} >

            <div className='wrapper py-4'> 

              <div className="container align-items-center text-white">
                <div className="row align-items-center">
                  <div className="col-12 text-center">
                       <h2 className='text-white'>Get Your Visa on Time</h2>
                      <p className='text-white'>We make visas easy for you!</p>

                  </div>
                </div>
              </div>

         </div>

    </div>



   <VisaCards />
   </MainLayout>
   </>
  )
}
