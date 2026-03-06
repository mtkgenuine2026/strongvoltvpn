import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export function Products({ id, image, name, description, appLink, rating }) {
  const [downloads, setDownloads] = useState(0);

  // Load downloads from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(`downloads_${id}`);
    if (saved) setDownloads(Number(saved));
  }, [id]);

  // Save downloads to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(`downloads_${id}`, downloads);
  }, [id, downloads]);

  const handleDownload = () => {
    setDownloads(prev => prev + 1);
    window.open(appLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="productList">
      <div className="productCard">
        <img src={image} alt={`${name} app`} className="productImage" />

        <div className="productCard__content">
          <h3 className="productName">{name}</h3>

          <div className="displayStack__1">
            <select className="productPrice">
              {description.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="productRating">
              {[...Array(rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
          </div>

          <div className="displayStack__2">
            <button className="productTime" onClick={handleDownload}>
              DOWNLOAD
            </button>

            <p className="download-text">Client Downloads: {downloads}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
