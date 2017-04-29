import fetch from "isomorphic-fetch"

export const SELECT_ORIGIN = "SELECT_ORIGIN"
export function selectOrigin(country, year) {
    return {
        type: SELECT_ORIGIN,
        country,
        year
    }
}

export const SELECT_DEST = "SELECT_DEST"
export function selectDest(country, year) {
    return {
        type: SELECT_DEST,
        country,
        year
    }
}

export const REQUEST_ORIGIN_EMMIGRATION = "REQUEST_ORIGIN_EMMIGRATION"
export function requestOriginEmmigration(country, year) {
    return {
        type: REQUEST_ORIGIN_EMMIGRATION,
        country,
        year
    }
}

export const RECEIVE_ORIGIN_EMMIGRATION = "RECEIVE_ORIGIN_EMMIGRATION"
export function receiveOriginEmmigration(country, year, json) {
    return {
        type: RECEIVE_ORIGIN_EMMIGRATION,
        country,
        year,
        data: json
    }
}

export const REQUEST_COMPARISON = "REQUEST_COMPARISON"
export function requestComparison(origin, destination, year) {
    return {
        type: REQUEST_COMPARISON,
        origin,
        destination,
        year
    }
}

export const RECEIVE_COMPARISON = "RECEIVE_COMPARISON"
export function receiveComparison(origin, destination, year, json) {
    return {
        type: RECEIVE_COMPARISON,
        origin,
        destination,
        year,
        data: json
    }
}

// Example actions for reddit stuff
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT"

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT"

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

export const REQUEST_POSTS = "REQUEST_POSTS"

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export const RECEIVE_POSTS = "RECEIVE_POSTS"

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPosts(subreddit) {
    return (dispatch) => {
        dispatch(requestPosts(subreddit))

        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then((json) => {
                dispatch(receivePosts(subreddit, json))
            })
    }
}
