import { ShieldCheck, Laptop, Tag, Headphones } from "lucide-react";

export default function WhyBookWithUs() {

 const features = [
    {
      icon: <ShieldCheck />,
      title: "Safe & Secure",
      desc: "Purchase with confidence. Your bookings are always safe & secure."
    },
    {
      icon: <Laptop />,
      title: "Easy Booking",
      desc: "Quick and convenient flight & hotel bookings with attractive offers."
    },
    {
      icon: <Tag />,
      title: "Lowest Price",
      desc: "We ensure the best deals on hotels, holiday packages, and flights."
    },
    {
      icon: <Headphones />,
      title: "24/7 Support",
      desc: "Round-the-clock assistance for all your travel-related queries."
    }
  ];


  return (
    <>

<div className="container mt-4">
<div  className="row">

{/* <div className="col-lg-3">
<h4> Why Book With Us?</h4>
</div> */}

    <div className="col-lg-12">
           <div className="row">
          {features.map((item, index) => (
           
     
           <div key={index} className="col-lg-3">

                 
              <div className="d-flex">

                <div className="me-2">{item.icon}</div> 
                <div> <h6> {item.title}</h6> <p>{item.desc}</p> </div>

            </div>
            
             </div>
           
       
          ))}
           </div>
       </div>
</div>
</div>
     <hr/>
    </>
  )
}
