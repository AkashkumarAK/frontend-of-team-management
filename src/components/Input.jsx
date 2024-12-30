
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Input() {
    const [orgData, setOrgData] = useState({ name: '', organizationId: '', location: '' });
    
    
  
    const handleOrgSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:4000/organizations', orgData);
        alert('Organization added: ' + response.data.name);
        setOrgData({ name: '', email: '', location: '' });
      } catch (error) {
        alert('Error adding organization');
      }
    };
  
   
  
   
  
  
    return (
    <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link to="/" class="navbar-brand" href="#">Organization</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/second" class="nav-link active" aria-current="page" href="#">Team</Link>
        </li>
        <li class="nav-item">
          <Link to="/third" class="nav-link active" aria-current="page" href="#">Individual</Link>
        </li>
        <li class="nav-item">
          <Link to="/output" class="nav-link active" href="#">Leadership</Link>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>
      <div>
      
  
      {/* <form onSubmit={handleOrgSubmit}>
        <h2>Add Organization</h2>
        <div class="mb-3">
  
        { <input
          type="text"
          placeholder="Name"
          value={orgData.name}
          onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="oid"
          value={orgData.organizationId}
          onChange={(e) => setOrgData({ ...orgData, organizationId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={orgData.location}
          onChange={(e) => setOrgData({ ...orgData, location: e.target.value })}
        />
        <button type="submit">Add Organization</button> }
      </form> */}
      <form onSubmit={handleOrgSubmit} className="container mt-4">
  <h2>Add Organization</h2>

  {/* Name Input */}
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input
      type="text"
      className="form-control"
      id="name"
      placeholder="Enter organization name"
      value={orgData.name}
      onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
    />
  </div>

  {/* Organization ID Input */}
  <div className="mb-3">
    <label htmlFor="organizationId" className="form-label">Organization ID</label>
    <input
      type="text"
      className="form-control"
      id="organizationId"
      placeholder="Enter organization ID"
      value={orgData.organizationId}
      onChange={(e) => setOrgData({ ...orgData, organizationId: e.target.value })}
    />
  </div>

  {/* Location Input */}
  <div className="mb-3">
    <label htmlFor="location" className="form-label">Location</label>
    <input
      type="text"
      className="form-control"
      id="location"
      placeholder="Enter location"
      value={orgData.location}
      onChange={(e) => setOrgData({ ...orgData, location: e.target.value })}
    />
  </div>

  {/* Submit Button */}
  <button type="submit" className="btn btn-primary">Add Organization</button>
</form>

  
     
  
     
    </div>
    </>
  )
}

export default Input