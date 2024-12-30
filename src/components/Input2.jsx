import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom';

function Input2() {
    const [teamData, setTeamData] = useState({ name: '', organizationId: '', teamId: ''});
    const handleTeamSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(teamData);
          const response = await axios.post(`http://localhost:4000/organizations/${teamData.organizationId}/teams`, teamData);
          alert('Team added: ' + response.data.organizationId);
          setTeamData({ name: '', organizationId: '' ,teamId: ''});
        } catch (error) {
          alert('Error adding team');
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
          <Link to="/output" class="nav-link active" href="#">Leaderboard</Link>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>

    <form onSubmit={handleTeamSubmit} className="container mt-4">
  <h2>Add Team</h2>

  {/* Team Name Input */}
  <div className="mb-3">
    <label htmlFor="teamName" className="form-label">Team Name</label>
    <input
      type="text"
      className="form-control"
      id="teamName"
      placeholder="Enter team name"
      value={teamData.name}
      onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
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
      value={teamData.organizationId}
      onChange={(e) => {
        console.log("Organization ID changed:", e.target.value);
        setTeamData({ ...teamData, organizationId: e.target.value });
      }}
    />
  </div>

  {/* Team ID Input */}
  <div className="mb-3">
    <label htmlFor="teamId" className="form-label">Team ID</label>
    <input
      type="text"
      className="form-control"
      id="teamId"
      placeholder="Enter team ID"
      value={teamData.teamId}
      onChange={(e) => setTeamData({ ...teamData, teamId: e.target.value })}
    />
  </div>

  {/* Submit Button */}
  <button type="submit" className="btn btn-primary">Add Team</button>
</form>
</>
    
  )
}

export default Input2