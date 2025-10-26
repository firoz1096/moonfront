import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { PiFileDuotone } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import VisaApplyForm from "../components/VisaApplyForm";
import CallRequestForm from "../components/CallRequestForm";


const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

const VisaCountryDetails = () => {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

    const [isOpen, setIsOpen] = useState(false);


  // Convert slug to proper country name
  const deslugify = (slugText) =>
    slugText
      .replace(/-visa$/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const countryName = deslugify(slug);

  useEffect(() => {
    axios
      .get(`${API_BASE}/visa-info-country/`)
      .then((res) => {
        const countries = res.data.data || [];
        const selected = countries.find(
          (item) =>
            item.country.toLowerCase().replace(/\s+/g, " ") ===
            countryName.toLowerCase()
        );
        setCountryData(selected || null);
      })
      .catch((err) => console.error("Country details fetch error:", err))
      .finally(() => setLoading(false));
  }, [countryName]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!countryData)
    return <div className="text-center py-5">Country not found.</div>;

  const { country, visaInfo, visaTypes = [] } = countryData;

  // ✅ Calculate least price and processing time
  const minFee =
    visaTypes.length > 0 ? Math.min(...visaTypes.map((v) => v.fees || 0)) : 0;

  const minProcessing =
    visaTypes.length > 0
      ? Math.min(...visaTypes.map((v) => v.processingTime || 0))
      : 0;

  return (
    <MainLayout>
      {/* --- Banner Section --- */}
      <div
        className="inner_half_banner"
        style={{
          backgroundImage: `url("${IMAGE_BASE}${visaInfo.thumbnail}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="wrapper py-4">
          <div className="container text-white">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="fw-bold">{country} Visa</h1>
                {minProcessing > 0 && (
                  <p>
                    Processing Time: {minProcessing} Working Days
                  </p>
                )}
              </div>

              <div className="col-md-6 text-end">

                <div>Starting from</div>
                  <h4>£{minFee} /-</h4>
            
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Visa Info Section --- */}
      <div className="container mb-3">


                <div className="row">

              <div className="col-lg-8 mt-4">
          <div className="row">

                <div className="col-12 mb-4">
            
                <div>
                <h4 className="fw-bold mb-3">Type of {country} Visa</h4>

                {visaTypes.length > 0 ? (
                <div className="row g-3">
                {visaTypes.map((visa) => (
                <div key={visa._id} className="col-md-6">
                <div className="shadow"> 
                <table className="table">

                <thead>
                <tr>
                <th className="bg-warning" colSpan={2}>
                {visa.title}
                </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td>Processing Time: </td>
                <td className="text-end">{visa.processingTime} days </td>
                </tr>
                <tr>
                <td>Stay Period: </td>
                <td className="text-end">{visa.stayPeriod} days </td>
                </tr>

                <tr>
                <td>Entry Type: </td>
                <td className="text-end">{visa.entryType} </td>
                </tr>


                <tr>
                <td>Fees: </td>
                <td className="text-end text-primary"><strong>£{visa.fees}</strong> </td>
                </tr>

                </tbody>                      

                </table>
                </div>
                </div>
                ))}
                </div>
                ) : (
                <p className="text-muted">
                No visa types available for this country.
                </p>
                )}
                </div>
                </div>

                <div className="col-12 mb-3">
                <h4>Documents required for {country} Visa</h4>

                {/* ✅ Accordion for Documents Required */}
                <Accordion defaultActiveKey="0" className="custom-accordion mb3">
                <Accordion.Item eventKey="0">
                <Accordion.Header>Documents Required</Accordion.Header>
                <Accordion.Body>
                {visaInfo?.documentsRequired ? (
                <div
                dangerouslySetInnerHTML={{
                __html: visaInfo.documentsRequired,
                }}
                />
                ) : (
                <p className="text-muted mb-0">No documents listed.</p>
                )}
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>


                <div className="col-12 mt-3">

                <h4>{country} Visa FAQs</h4>

                {/* ✅ Accordion for FAQs */}
                {visaInfo?.faqs?.length > 0 && (
                <Accordion defaultActiveKey="0" className="custom-accordion mb-4">
                {visaInfo.faqs.map((faq, index) => (
                <Accordion.Item key={index} eventKey={index.toString()} className="mb-3">
                <Accordion.Header>
                {faq.question}
                </Accordion.Header>
                <Accordion.Body dangerouslySetInnerHTML={{
                __html: faq.answer,
                }}>
               
                </Accordion.Body>
                </Accordion.Item>
                ))}
                </Accordion>
                )}

                </div>

                <div className="col-12 mt-2 mb-5">

                <div onClick={() => setIsOpen(true)} className="view_visa_sample_copy cursor-pointer">
                  <div className="d-flex align-items-center justify-content-between bg-warning p-3 rounded">
                    <div><PiFileDuotone className="fs-4" /> <b>View Visa Sample Copy</b></div>
                    
                     <div><FaArrowRight /></div>
                  </div>
                </div>


{isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
                 <img
                src={
                visaInfo?.visaSampleCopy
                ? `${IMAGE_BASE}${visaInfo.visaSampleCopy}`
                : "https://via.placeholder.com/800x400"
                }
                alt={country}
                 
                style={{ height: "550px", objectFit: "cover" }}
                />

            <button className="close-btn bg-warning" onClick={() => setIsOpen(false)}>
              <IoCloseSharp />

            </button>
          </div>
        </div>
      )}


         



                </div>



              </div>
              </div>

              <div className="col-lg-4 mt-4">

                 <div>
                  <VisaApplyForm visaTypes={visaTypes} country={country} />
                  
                  </div>


                 <div className="py-4">
                   <CallRequestForm callFor={country + " Visa"} product="Visa" />
                 </div>

                </div>


           

          </div>
       
    
   
      </div>
    </MainLayout>
  );
};

export default VisaCountryDetails;
