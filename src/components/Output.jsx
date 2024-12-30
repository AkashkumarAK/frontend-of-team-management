import React, { useState,useEffect   } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Output() {

    const [hierarchy, setHierarchy] = useState([]);

  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        const response = await axios.get('http://localhost:4000/hierarchy');
        setHierarchy(response.data);
      } catch (error) {
        console.error('Error fetching hierarchy:', error);
      }
    };

    fetchHierarchy();
  }, []);


  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link to="/"  class="navbar-brand" href="#">Organisation</Link>
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
          <a class="nav-link" href="#">Leaderboard</a>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>



  

  
    <div className="container mt-4">
      <h2>Organization Hierarchy:</h2>
      <p>List of organisation ,team and team members with their id.</p>
      <div className="accordion" id="organizationAccordion">
        {hierarchy.map((org, orgIndex) => (
          <div className="accordion-item" key={org.organizationId}>
            <h2 className="accordion-header" id={`headingOrg${orgIndex}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseOrg${orgIndex}`}
                aria-expanded="true"
                aria-controls={`collapseOrg${orgIndex}`}
              >
                {org.name} - {org.organizationId}
              </button>
            </h2>
            <div
              id={`collapseOrg${orgIndex}`}
              className="accordion-collapse collapse"
              aria-labelledby={`headingOrg${orgIndex}`}
              data-bs-parent="#organizationAccordion"
            >
              <div className="accordion-body">
                <h5>Teams</h5>
                {org.teams.map((team, teamIndex) => (
                  <div className="accordion" id={`teamAccordion${orgIndex}`}>
                    <div className="accordion-item" key={team.teamId}>
                      <h2 className="accordion-header" id={`headingTeam${teamIndex}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseTeam${teamIndex}`}
                          aria-expanded="false"
                          aria-controls={`collapseTeam${teamIndex}`}
                        >
                          {team.name} -{team.teamId}
                        </button>
                      </h2>
                      <div
                        id={`collapseTeam${teamIndex}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`headingTeam${teamIndex}`}
                        data-bs-parent={`#teamAccordion${orgIndex}`}
                      >
                        <div className="accordion-body">
                          <h6>Members</h6>
                          <ul className="list-group">
                          <div className="accordion-body">
  <h6>Members</h6>
  <ul className="list-group">
    {team.members.map((member) => (
      <li key={member.uniqueId} className="list-group-item d-flex align-items-center">
        <span
          className="me-2"
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: member.image ? 'green' : 'red',
          }}
        ></span>
        {member.name} ({member.uniqueId})
      </li>
    ))}
  </ul>
</div>

                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  

</>
  )
}

export default Output;