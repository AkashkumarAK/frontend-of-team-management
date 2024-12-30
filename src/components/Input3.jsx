import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Input3() {
  const [memberData, setMemberData] = useState({
    name: '',
    uniqueId: '',
    teamId: '',
    image: null,
  });
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start Camera
  const startCamera = async () => {
    setCameraError('');
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraError('Unable to access camera. Please check permissions and try again.');
      setShowCamera(false);
    }
  };

  // Capture Image
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas image to Blob
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
        setMemberData((prevData) => ({ ...prevData, image: file }));
        stopCamera(); // Stop camera after capturing
      }
    }, 'image/jpeg');
  };

  // Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  // Handle File Input Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMemberData((prevData) => ({ ...prevData, image: file }));
    }
  };

  // Submit Member Data
  const handleMemberSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!memberData.name || !memberData.uniqueId || !memberData.teamId) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', memberData.name);
    formData.append('uniqueId', memberData.uniqueId);
    formData.append('teamId', memberData.teamId);
    if (memberData.image) {
      formData.append('image', memberData.image);
    }

    try {
      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Send POST request
      const response = await axios.post(
        `http://localhost:4000/teams/${memberData.teamId}/members`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Member added: ' + response.data.name);
      // Reset form
      setMemberData({ name: '', uniqueId: '', teamId: '', image: null });
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Error adding member. Please try again.');
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Organization
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/second" className="nav-link active" aria-current="page">
                  Team
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/third" className="nav-link active" aria-current="page">
                  Individual
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/output" className="nav-link active">
                 Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Member Form */}
      <form onSubmit={handleMemberSubmit} className="container mt-4">
        <h2>Add Member</h2>

        {/* Member Name Input */}
        <div className="mb-3">
          <label htmlFor="memberName" className="form-label">
            Member Name
          </label>
          <input
            type="text"
            className="form-control"
            id="memberName"
            placeholder="Enter member name"
            value={memberData.name}
            onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
            required
          />
        </div>

        {/* Unique ID Input */}
        <div className="mb-3">
          <label htmlFor="uniqueId" className="form-label">
            Unique ID
          </label>
          <input
            type="text"
            className="form-control"
            id="uniqueId"
            placeholder="Enter unique ID"
            value={memberData.uniqueId}
            onChange={(e) => setMemberData({ ...memberData, uniqueId: e.target.value })}
            required
          />
        </div>

        {/* Team ID Input */}
        <div className="mb-3">
          <label htmlFor="teamId" className="form-label">
            Team ID
          </label>
          <input
            type="text"
            className="form-control"
            id="teamId"
            placeholder="Enter team ID"
            value={memberData.teamId}
            onChange={(e) => setMemberData({ ...memberData, teamId: e.target.value })}
            required
          />
        </div>

        {/* Image Upload Options */}
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <div className="d-flex flex-column">
            {/* File Upload */}
            <input
              type="file"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* OR Separator */}
            <div className="text-center my-2">OR</div>

            {/* Camera Capture */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={startCamera}
              disabled={showCamera}
            >
              {showCamera ? 'Camera Active' : 'Use Camera'}
            </button>
          </div>

          {/* Camera Preview and Capture Controls */}
          {showCamera && (
            <div className="mt-3">
              <video
                ref={videoRef}
                style={{ width: '100%', maxWidth: '400px' }}
                autoPlay
              ></video>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              <div className="mt-2 d-flex justify-content-between">
                <button type="button" className="btn btn-primary" onClick={captureImage}>
                  Capture
                </button>
                <button type="button" className="btn btn-danger" onClick={stopCamera}>
                  Cancel
                </button>
              </div>
              {cameraError && (
                <div className="alert alert-danger mt-2" role="alert">
                  {cameraError}
                </div>
              )}
              {/* Preview Captured Image */}
              {memberData.image && (
                <div className="mt-3">
                  <h5>Captured Image:</h5>
                  <img
                    src={URL.createObjectURL(memberData.image)}
                    alt="Captured"
                    style={{ width: '100%', maxWidth: '400px' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Preview Uploaded Image */}
          {memberData.image && !showCamera && (
            <div className="mt-3">
              <h5>Uploaded Image:</h5>
              <img
                src={URL.createObjectURL(memberData.image)}
                alt="Uploaded"
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Member
        </button>
      </form>
    </>
  );
}

export default Input3;
