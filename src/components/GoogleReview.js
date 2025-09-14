import { useEffect } from "react";


export default function GoogleReviewsWidget() {
  useEffect(() => {
    // Check if the script is already added
    if (!document.querySelector('script[src="https://featurable.com/assets/v2/carousel_default.min.js"]')) {
      const script = document.createElement("script");
      script.src = "https://featurable.com/assets/v2/carousel_default.min.js";
      script.defer = true;
    //   script.charset = "UTF-8";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <> 
    <div className="custom_review_container"> 
    <div 
      id="featurable-be85ba43-54f0-4d26-afd0-b410acd7e170"
      data-featurable-async
    ></div>

{/* <div className="text-center"> <Link className="btn btn-primary" to="https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJOVbt00mwe0gRO5OnNScKe9U">
Write a Review</Link> </div> */}

</div>
</>
  );
}
