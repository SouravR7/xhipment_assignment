import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all user data
 */

const initialState = {
  posts: [],
};

export function postData(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_ALL_POSTS:
      return {
        ...newState,
        posts: action.payload,
      };

    case ACTIONS.CREATE_POST_RESPONSE:
      let array = [...newState.posts];
      array.unshift(action.payload);

      return {
        ...newState,
        posts: [...array],
      };

    case ACTIONS.UPDATE_POST_RESPONSE:
      let allPost = [...newState.posts];
      let postIndex = allPost.findIndex(
        (item) => item.id === parseInt(action.payload.id)
      );
      allPost[postIndex] = action.payload;

      return {
        ...newState,
        posts: [...allPost],
      };

    case ACTIONS.DELETE_POST_RESPONSE:
      let allPosts = [...newState.posts];
      let filteredPosts = allPosts.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...newState,
        posts: [...filteredPosts],
      };

    default:
      return state;
  }
}
