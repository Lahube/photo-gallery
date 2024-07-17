import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="gallery">
      {data.slice(0, 10).map(photo => (
        <div key={photo.id} className="photo-card">
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <div className="photo-info">
            <h3>{photo.title}</h3>
            <p>ID: {photo.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
