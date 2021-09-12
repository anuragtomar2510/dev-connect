import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import ProfileItem from './ProfileItem'
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux'
import {getProfiles, getProfileById} from '../../actions/profile'

const Profiles = ({getProfiles, getProfileById, profile : {profiles, loading}}) => {

        useEffect(() => {

                getProfiles()

        }, [getProfiles])

        return (
                <>
                        {loading ? (<Spinner />) : 
                        
                                (<> 
                                         <h1 className='large text-primary'>Developers</h1>
                                         <p className='lead'>
                                                <i className='fab fa-connectdevelop' /> Browse and connect with
                                                        developers
                                         </p>

                                         <div className='profiles'>
                                               

                                                   {     profiles.map(profile => (

                                                                <ProfileItem key={profile._id} profile={profile} />

                                                        ))

                                                   }
                                                
                                        </div>
                                
                                
                                </>)}




                </>
        )
}


Profiles.propTypes = {

        getProfiles: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired

};
      
const mapStateToProps = state => ({

        profile: state.profile

});
      
export default connect(
        mapStateToProps,
        { getProfiles }
      )(Profiles);
