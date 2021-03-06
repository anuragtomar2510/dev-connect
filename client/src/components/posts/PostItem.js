import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {addLike, removeLike, deletePost} from '../../actions/post'

const PostItem = ({

        auth,
        post : {_id, text, name, avatar, user, likes, comments, date},
        addLike,
        removeLike, 
        deletePost,
        showActions

}) => {

        return (
                        <>
                                        <div className="post bg-white my-1 p-1">
                                        <div>
                                        <Link to={`/profile/${user}`}>
                                                <img
                                                class="round-img"
                                                src={avatar}
                                                alt=""
                                                />
                                                <h4>{name}</h4>
                                        </Link>
                                        </div>

                                        <div>
                                                <p className="my-1">
                                                      {text}
                                                </p>
                                                <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>

                                                {showActions && (<>  
                                                <button 
                                                        type="button"
                                                        className="btn"
                                                        onClick={() => addLike(_id)}>
                                                         <i className="fas fa-thumbs-up"></i> {likes.length > 0 && <span>{likes.length}</span>}
                                                </button>

                                                <button
            
                                                        type="button"
                                                        className="btn btn-light"
                                                        onClick={() => removeLike(_id)}
                                                        >
                                                        <i className="fas fa-thumbs-down" />
                                                </button>
                                              
                                                <Link to={`/post/${_id}`} className="btn btn-primary">
                                                         Discussion{' '}
                                                         {comments.length > 0 && (
                                                        <span className="comment-count">{comments.length}</span>
                                                         )}
                                                </Link>

                                                {!auth.loading && user === auth.user._id && (
                                                        <button
                                                        onClick={() => deletePost(_id)}
                                                        type="button"
                                                        className="btn btn-danger"
                                                        >
                                                        <i className="fas fa-times" />
                                                        </button>
                                                )}

                                                </>)}
                                        </div>
                                        </div>


                        </>
        )

}


PostItem.propTypes = {

        post : PropTypes.object.isRequired,
        auth : PropTypes.object.isRequired,
        addLike : PropTypes.func.isRequired,
        removeLike : PropTypes.func.isRequired,
        deletePost : PropTypes.func.isRequired



}



const mapStateToProps = (state) => ({

        auth: state.auth

});
      
export default connect(mapStateToProps, {addLike, removeLike, deletePost})( PostItem);
