import MainLayout from '../components/MainLayout';
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <MainLayout> 
 <div className="d-flex align-items-center justify-content-center vh-100 bg-light animate__animated animate__fadeIn">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary bounce">404</h1>
        <p className="fs-3 text-dark fw-semibold">Page Not Found</p>
        <p className="text-muted mb-4">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="btn btn-primary btn-lg shadow-sm">
          <FaHome className="me-2" />
          Go Home
        </Link>
      </div>
    </div>
    </MainLayout>
  );
}
