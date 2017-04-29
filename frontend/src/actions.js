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

export const SELECT_YEAR = "SELECT_YEAR"
export function selectYear(year) {
    return { type: SELECT_YEAR, year }
}

export const RECEIVE_COUNTRY_POSITIONS = "RECEIVE_COUNTRY_POSITIONS"
function receiveCountryPositions(countries) {
    return { type: RECEIVE_COUNTRY_POSITIONS, countries }
}

export function fetchCountryPositions() {
    return (dispatch) => {
        // dispatch(requestPosts(subreddit))

        return fetch("http://localhost:8000/migrantlyzer/country")
            .then(r => r.json())
            .then((jsonS) => {
                const json = JSON.parse(jsonS)
                dispatch(receiveCountryPositions(json.map(row => row.fields)))
            })
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
