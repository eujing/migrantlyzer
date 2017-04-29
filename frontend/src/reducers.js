import { combineReducers } from "redux"
import {
    SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
    REQUEST_POSTS, RECEIVE_POSTS,
    SELECT_ORIGIN, SELECT_DEST, SELECT_YEAR,
    RECEIVE_COUNTRY_POSITIONS
} from "./actions"

function selectedOptions(state = {
    origin: null,
    destination: null,
    year: 2015
}, action) {
    switch (action.type) {
    case SELECT_ORIGIN:
        return Object.assign({}, state, {
            origin: action.country,
            year: action.year
        })
    case SELECT_DEST:
        return Object.assign({}, state, {
            destination: action.country,
            year: action.year
        })
    case SELECT_YEAR:
        return Object.assign({}, state, {
            year: action.year
        })
    default:
        return state
    }
}

function countryPositions(state = {}, action) {
    switch (action.type) {
    case RECEIVE_COUNTRY_POSITIONS:
        return Object.assign({}, state,
            action.countries.reduce((obj, country) => {
                return { ...obj, [country.name]: [country.longitude, country.latitude] }
            }, {}))

    default:
        return state
    }
}

// Example reducers for reddit stuff
function selectedSubredit(state = "reactjs", action) {
    switch (action.type) {
    case SELECT_SUBREDDIT:
        return action.subreddit
    default:
        return state
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
    case INVALIDATE_SUBREDDIT:
        return Object.assign({}, state, {
            didInvalidate: true
        })

    case REQUEST_POSTS:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
        })

    case RECEIVE_POSTS:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: action.posts,
            lastUpdated: action.receivedAt
        })

    default:
        return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
        return Object.assign({}, state, {
            [action.subreddit]: posts(state[action.subreddit], action)
        })
    default:
        return state
    }
}

const rootReducer = combineReducers({
    selectedOptions,
    countryPositions
})

export default rootReducer
