import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({profile : {

        user : { _id, name, avatar},
        status,
        company,
        location,
        skills

}}) => {

        const developerSkills = skills.map((skill, index) => (

                <li key={index} class="text-primary"><i class="fas fa-check"></i>{skill}</li>
        ))
        return (
                <div className="profile bg-light">
                        <img
                        className="round-img"
                        src={avatar}
                        alt=""
                        />
      
                <div>
                  <h2>{name}</h2>
                  <p>{status && <span>{status}</span>} {status && company && <span>at {company}</span>}</p>
                  <p>{location && <span>{location}</span>}</p>
                  <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                  </Link>
                </div>
      
                <ul>
                 
                  {developerSkills}
                   
                </ul>
              </div>
        )
}

ProfileItem.propTypes = {

        profile : PropTypes.object.isRequired
        
}

export default ProfileItem
