
import { Link } from "react-router-dom";
import { Hotel, ArrowLeft } from "lucide-react";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <Hotel size={42} />
        </div>

        <p className="not-found-label">HILTON HOTEL</p>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p className="not-found-message">
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <Link to="/" className="not-found-home-button">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
