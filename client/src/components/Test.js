import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Testing = () => {
    const importAll = (r) => {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
        return images;
      };
    
      const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      let allFilesAreImages = true;

      Array.from(selectedFiles).forEach(file => {
        if (!file.type.startsWith('image/')) {
          allFilesAreImages = false;
        } else {
          formData.append('images', file);
        }
      });

      if (!allFilesAreImages) {
        console.error('One or more files are not images.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Upload successful:', data);
          fetchUploadedImages(); // Refresh the uploaded images
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No files selected');
    }
  };

  const fetchUploadedImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/images');
      if (response.ok) {
        const data = await response.json();
        setUploadedImages(data);
      } else {
        console.error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (imageName) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${imageName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Image deleted successfully');
        fetchUploadedImages(); // Refresh the uploaded images
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Upload Images</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Upload Multiple Images
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>

      <h3 className="mt-4">Uploaded Images</h3>
      <Link to="/editnews">
                                <button className="fa custom-button">&#xf044;</button>
                            </Link>
      <ul className="list-group mt-3">
        {Object.keys(images).map((key) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={key}>
            <div className="d-flex align-items-center">
              <img src={images[key]} alt={key} style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
              <span>{key}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="edit-button-container">
            <Link to="/imageupload"><button className="fa custom-button" >
            &#xf044;
            </button></Link>
          </div>
    </div>
  );
};

export default Testing;
