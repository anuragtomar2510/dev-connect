import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addPost} from '../../actions/post'

const PostForm = ({addPost}) => {

        const [text, setText] = useState('')

        const onSubmit = (e) => {

                e.preventDefault()
                addPost({text})
                setText('')

        }
        return (

                <div className="post-form">
                        <div className="post-form-header bg-primary">
                                 <h3>Say Something...</h3>
                        </div>
                        <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                                <textarea 
                                cols="30" 
                                rows="5" 
                                value={text} 
                                placeholder="Create a post"
                                onChange={(e) => setText(e.target.value)}
                                ></textarea>
                                <input type="submit" value="Submit" class="btn btn-dark my-1" />
                        </form>
                </div>
        )



}

PostForm.propTypes = {

        addPost : PropTypes.func.isRequired

}

export default connect(null, {addPost})(PostForm)