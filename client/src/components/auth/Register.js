import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
import PropTypes from 'prop-types'


const initialFormData = {

        name:'',
        email:'',
        password:'',
        password2:''

}



const Register = ({setAlert, register, isAuthenticated}) => {

        const [formData, setFormData] = useState(initialFormData);

        const {name, email, password, password2} = formData;

        const onChange = (e) => {

                setFormData({...formData, [e.target.name] : e.target.value})

        }

        const onSubmit = async (e) => {

                e.preventDefault();

                if(password.length > 0 && password2 === ''){

                        setAlert('Confirm Password is not allowed to be empty!', 'danger')

                } else if(password !== password2) {

                        setAlert('Passwords do not match!', 'danger')

                } else if(password.length > 0 && password.length < 6) {

                        setAlert('Password is too small!', 'danger')

                } else {
                 
                        register({name, email, password})
                }
        }

        if(isAuthenticated) {

              return  <Redirect to={"/dashboard"}/>

        }
        return (

                <section className="container">
                        <h1 className="large text-primary">
                                 Sign Up
                        </h1>
                        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                        <form onSubmit={(e) => onSubmit(e)} className="form">
                                <div className="form-group">
                                        <input 
                                        type="text" 
                                        placeholder="Name" 
                                        name="name"
                                        value={name}
                                        onChange={(e) => onChange(e)}
                                        />
                                </div>
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
                                <div className="form-group">
                                         <input 
                                         type="password"
                                         placeholder="Confirm Password" 
                                    
                                         name="password2"
                                         value={password2}
                                         onChange={(e) => onChange(e)} 
                                        />
                                </div>
                                <input 
                                type="submit" 
                                value="Register" 
                                className="btn btn-primary" />
                        </form>
                        <p className="my-1">
                        Already have an account? <Link to={"/login"}>Sign In</Link>
                        </p>
              </section>
        )


}

Register.propTypes = {

        setAlert : PropTypes.func.isRequired,
        register : PropTypes.func.isRequired,
        isAuthenticated : PropTypes.bool.isRequired,
        
}

const mapStateToProps = state => ({

        alerts : state.alert,
        isAuthenticated : state.auth.isAuthenticated

})

export default connect(mapStateToProps, {setAlert, register})(Register)