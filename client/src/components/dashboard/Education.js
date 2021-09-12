import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {deleteEducation} from '../../actions/profile'

const Education = ({education, deleteEducation}) => {

        const educations = education.map((edu) => (

                <tr key={edu._id}>
                        <td>{edu.school}</td>
                        <td class="hide-sm">{edu.degree}</td>
                        <td className="hide-sm">
                              {edu.from === null ? ('') : (<Moment format="YYYY/MM/DD">{edu.from}</Moment>)}
                               - 
                               {edu.to === null ? ('Current') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                        </td>

                        <td>
                                <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>
                                        Delete
                                </button>
                        </td>
                </tr>
        ))

        return (

                <>
                        <h2 className="my-2">
                                Education Credentials
                        </h2>

                        <table className="table">

                                <thead>
                                        <tr>
                                                <th>School</th>
                                                <th className="hide-sm">Degree</th>
                                                <th className="hide-sm">Years</th>
                                                <th></th>
                                        </tr>
                                </thead>


                                <tbody>
                                        {educations}
                                </tbody>

                        </table>
                </>
        )


}


Education.propTypes = {

        education: PropTypes.array.isRequired,
        deleteEducation : PropTypes.func.isRequired

}

export default connect(null, {deleteEducation})(Education)