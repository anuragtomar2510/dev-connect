import {

        GET_POSTS,
        GET_POST,
        ADD_POST,
        UPDATE_LIKES,
        DELETE_POST,
        ADD_COMMENT,
        REMOVE_COMMENT,
        POST_ERROR

} from '../actions/types'


const initialState = {

        post : null,
        posts : [],
        loading : true,
        error : {}

}


const postReducer = (state = initialState, action) => {

        const {type, payload} = action

        switch(type) {

                case GET_POSTS : 
                        return {
                                ...state,
                                posts : payload,
                                loading : false

                        }

                case GET_POST : 
                        return {
                                ...state,
                                post : payload,
                                loading : false
                        }

                case ADD_POST :
                        return {
                                ...state,
                                posts : [...state.posts, payload],
                                loading : false
                        }

                case UPDATE_LIKES :
                        return {

                                ...state,
                                posts : state.posts.map(post =>
                                        post._id === payload.postId ? {...post, likes : payload.likes}
                                        : post),
                                loading : false
                        }

                case ADD_COMMENT :
                        return {
                                ...state,
                                post : {...state.post, comments : payload},
                                loading : false
                        }

                case REMOVE_COMMENT :
                        return {
                                
                                ...state,
                                post: {
                                        ...state.post,
                                        comments: state.post.comments.filter(
                                                                 (comment) => comment._id !== payload )
                                      },
                                loading: false

                        }

                case DELETE_POST :
                        return {

                                ...state,
                                posts : state.posts.filter(post => 
                                        post._id !== payload.postId),
                                loading : false
                        }

                case POST_ERROR : 
                        return {
                                ...state,
                                loading : false,
                                error : payload
                        }

                default :
                        return state

        }
}

export default postReducer