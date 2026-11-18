import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./RoomGallery.css";

function RoomGallery({ images = [], roomName = "Room" }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images.length) {
    return null;
  }

  const showPrevious = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="room-gallery">
      <div className="room-gallery-main">
        <img src={images[activeImage]} alt={`${roomName} view ${activeImage + 1}`} />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-arrow gallery-previous"
              onClick={showPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              className="gallery-arrow gallery-next"
              onClick={showNext}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="room-gallery-thumbnails">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              className={activeImage === index ? "active" : ""}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`${roomName} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomGallery;