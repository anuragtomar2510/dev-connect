import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile : {

        user : {name},
        bio,
        skills

}}) => {

        const skillSet = skills.map((skill, index) => (

                <div className="p-1" key={index}><i className="fas fa-check"></i> {skill}</div>
        ))

        return (

                <div className="profile-about bg-light p-2">
               {
                       bio && (<>
                                         <h2 className="text-primary">{name}'s bio</h2>
                                         <p> {bio}</p>
                                </>)
               }
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                        {skillSet}
                </div>
              </div>
        )
}






ProfileAbout.propTypes = {

        profile : PropTypes.object.isRequired

}

export default ProfileAbout