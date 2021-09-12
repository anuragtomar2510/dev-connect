import axios from 'axios'
import {setAlert} from './alert'
import {

        GET_POSTS,
        GET_POST,
        ADD_POST,
        POST_ERROR,
        UPDATE_LIKES,
        ADD_COMMENT,
        REMOVE_COMMENT,
        DELETE_POST

} from './types'

// Get All Posts
export const getPosts = () => async dispatch => {

        try {

                const res = await axios.get(`http://localhost:5000/api/posts`)

                dispatch({

                        type : GET_POSTS,
                        payload : res.data

                })

        } catch(err) {

                dispatch({
                        
                        type : POST_ERROR,
                        payload : {msg : err.response.statusText, status : err.response.status}
                        
                })
        }
}


// Add like
export const addLike = (postId) => async dispatch => {

        try {

                const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`)

                dispatch({

                        type : UPDATE_LIKES,
                        payload : {postId, likes : res.data}
                })

        } catch(err) {

                dispatch({
                        
                        type : POST_ERROR,
                        payload : {msg : err.response.statusText, status : err.response.status}
                        
                })

        }
}



// Remove like
export const removeLike = (postId) => async dispatch => {

        try {

                const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postId}`)

                dispatch({

                        type : UPDATE_LIKES,
                        payload : {postId, likes : res.data}
                })

        } catch(err) {

                dispatch({
                        
                        type : POST_ERROR,
                        payload : {msg : err.response.statusText, status : err.response.status}
                        
                })

        }
}

// Add post

export const addPost = (formData) => async dispatch => {

        try {

                const res = await axios.post('http://localhost:5000/api/posts', formData)

               

                        dispatch({

                                type : ADD_POST,
                                payload : res.data

                        })

                        dispatch(setAlert('Post added', 'success'))
               

        } catch(err) {

                dispatch(setAlert('Post is not allowed to be empty', 'danger'))

                dispatch({
                        
                        type : POST_ERROR,
                        payload : {msg : err.response.statusText, status : err.response.status}
                        
                })

        }
}





// Delete post

export const deletePost = (postId) => async dispatch => {

        try {

                const res = axios.delete(`http://localhost:5000/api/posts/${postId}`)

                dispatch({

                        type : DELETE_POST,
                        payload : postId

                })

                dispatch(setAlert('Post Removed', 'success'))

        } catch(err) {

                dispatch({
                        
                        type : POST_ERROR,
                        payload : {msg : err.response.statusText, status : err.response.status}
                        
                })

        }
}



// Get post by postId
export const getPostById = (postId) => async dispatch => {

       
        
        try {

          const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
      
          dispatch({

            type: GET_POST,
            payload: res.data

          })

        } catch (err) {

          dispatch({

            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

          })

        }
        
}

// Add comment

export const addComment = (postId, formData) => async dispatch => {

        try {

                const res = await axios.put(`http://localhost:5000/api/posts/comment/${postId}`, formData)

                

                        dispatch({

                                type : ADD_COMMENT,
                                payload : res.data

                        })

                        dispatch(setAlert('Comment added', 'success'))
                

        } catch(err) {

                dispatch(setAlert('Comment is not allowed to be empty', 'danger'))

                dispatch({
                        
                        type : POST_ERROR,
                        payload : {msg : err.response.statusText, status : err.response.status}
                        
                })

        }
}





// Delete comment

export const deleteComment = (postId, commentId) => async dispatch => {

        try {

                const res = axios.delete(`http://localhost:5000/api/posts/${postId}/${commentId}`)

                dispatch({

                        type : REMOVE_COMMENT,
                        payload : commentId

                })

                dispatch(setAlert('Comment Removed', 'success'))

        } catch(err) {

                dispatch({
                        
                        type : POST_ERROR,
                        payload : {msg : err.response.statusText, status : err.response.status}
                        
                })

        }
}
