import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { login } from '../../actions/auth'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import PropTypes from 'prop-types'
const initialFormData = {
      
        email:'',
        password:'',
    
}

const Login = ({setAlert, login, isAuthenticated}) => {

        const [formData, setFormData] = useState(initialFormData)

        const {email, password} = formData


        
        const onChange = (e) => {

                setFormData({...formData, [e.target.name] : e.target.value})

        }

        
        const onSubmit = async (e) => {

                e.preventDefault();

                if(password.length > 0 && password.length < 6) {

                        setAlert('Password is too small!', 'danger')

                } else {

                        login(email, password)

                }

               
                
        }

        if(isAuthenticated) {

                return  <Redirect to={"/dashboard"}/>
  
        }

        return (

                <section className="container">
                       
                       
                
                        <h1 className="large text-primary">
                                Sign In
                        </h1>
                        <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
                        <form onSubmit={(e) => onSubmit(e)} className="form">
                                <div className="form-group">
                                        <input 
                                        type="email" 
                                        placeholder="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={(e) => onChange(e)} 
                                        />
                                </div>
                                <div className="form-group">
                                        <input 
                                        type="password" 
                                        placeholder="Password" 
                                        
                                        name="password"
                                        value={password}
                                        onChange={(e) => onChange(e)} 
                                        />
                                </div>
                                <input 
                                type="submit" 
                                value="Login" 
                                className="btn btn-primary" />
                        </form>
                        <p className="my-1">
                        Don't have an account? <Link to={"/register"}>Sign Up</Link>
                        </p>
              </section>
        )

}

Login.propTypes = {

        setAlert : PropTypes.func.isRequired,
        login : PropTypes.func.isRequired,
      
        
}

const mapStateToProps = state => ({

        alerts : state.alert,
        isAuthenticated : state.auth.isAuthenticated

})

export default connect(mapStateToProps, {setAlert, login})(Login)