import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({auth, logout}) => {

        const {isAuthenticated, loading} = auth;

        const authLinks = (

                <ul>
                        <li>
                                <Link to="/profiles">Developers</Link>
                        </li>

                        <li>
                                <Link to="/posts">Posts</Link>
                        </li>

                        <li>
                                <a onClick={logout} href="">
                                <i className="fas fa-sign-out-alt" />{' '}
                                <span className="hide-sm">Logout</span></a>
                        </li>
              </ul>
        )


        const guestLinks = (
                <ul>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              );

        return (
                  <nav className="navbar bg-dark">
                        {
                                isAuthenticated ? (

                                        <h1> 
                                                 <Link to={"/dashboard"}><i className="fas fa-code" ></i>Dev-Connect</Link>
                                        </h1>
                                )   : (

                                        <h1> 
                                                <Link to={"/"}><i className="fas fa-code" ></i>Dev-Connect</Link>
                                        </h1>
                                        
                                )
                        }

                        <Fragment>
                                {isAuthenticated ? authLinks : guestLinks}
                        </Fragment>
                 </nav>
        )

}

Navbar.propTypes = {

        logout: PropTypes.func.isRequired,
        auth :PropTypes.object.isRequired

}
const mapStateToProps = state => ({

        auth : state.auth

})

export default connect(mapStateToProps, {logout})(Navbar)