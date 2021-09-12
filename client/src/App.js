import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import NotFound from './components/layout/NotFound'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import ProfileForm from './components/profile-forms/ProfileForm'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import PrivateRoute from './components/routing/PrivateRoute'


// Redux
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'



const App = () => {
  
  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser())

}, [])

  return (
          <Provider store={store}>
            <Router>
              <>  
                <Navbar />
                <Route exact path="/" component={Landing} />
                <div className="container">
                  <Alert />
                  <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/create-profile" component={ProfileForm} />
                    <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                    <PrivateRoute exact path="/add-experience" component={AddExperience} />
                    <PrivateRoute exact path="/add-education" component={AddEducation} />
                    <PrivateRoute exact path="/profiles" component={Profiles} />
                    <PrivateRoute exact path="/profile/:_id" component={Profile} />
                    <PrivateRoute exact path="/posts" component={Posts} />
                    <PrivateRoute exact path="/post/:_id" component={Post} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
               </>
            </Router>
            </Provider>

  )

}

export default App;
