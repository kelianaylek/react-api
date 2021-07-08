export const routes = {
    DASHBOARD: '/',

    LOGIN: '/login_check',

    GET_USERS: '/users',
    GET_USER: '/users/:userId',
    POST_USER: '/users',
    PUT_USER: '/users/:userId',
    DEL_USER: "/users/:userId",

    GET_POSTS: '/posts',
    GET_POST: '/posts/:postId',
    POST_POST: '/posts',
    PUT_POST: '/posts/:postId',
    DEL_POST: "/posts/:postId",
    //ADD_LIKE_POST: "/posts/:userId",
    // REMOVE_LIKE_POST: "/posts/:userId",
    //ADD_EVENT_POST: "/posts/:userId",
    //REMOVE_EVENT_POST: "/posts/:userId",

    GET_COMMENTS: '/comments',
    GET_COMMENT: '/comments/:commentId',
    POST_COMMENT: '/comments',
    PUT_COMMENT: '/comments/:commentId',
    DEL_COMMENT: "/comments/:commentId",



};
