import { combineReducers } from "redux"
import {
    SELECT_COUNTRY, SELECT_ORIGIN, SELECT_DEST, SELECT_YEAR,
    RECEIVE_COUNTRY_POSITIONS, RECEIVE_MIGRATION_DATA, RECEIVE_CATEGORY_DATA,
    RECEIVE_INDEX_DATA
} from "./actions"

function selectedOptions(state = {
    origin: null,
    destination: null,
    year: 2015
}, action) {
    switch (action.type) {
    case SELECT_COUNTRY:
        if (!state.origin) {
            return Object.assign({}, state, {
                origin: action.country
            })
        } else if (!state.destination) {
            return Object.assign({}, state, {
                destination: action.country
            })
        }

        return Object.assign({}, state, {
            origin: action.country,
            destination: null
        })

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
            action.countries.reduce((obj, country) =>
                ({ ...obj, [country.name]: [country.longitude, country.latitude] }), {}))

    default:
        return state
    }
}

function migrationData(state = {}, action) {
    switch (action.type) {
    case RECEIVE_MIGRATION_DATA:
        // Might be mutating state...
        return Object.assign({}, state,
            action.migrationDataPoints.reduce((obj, dp) => {
                if (!obj[dp.year]) {
                    obj[dp.year] = {}
                }
                if (!obj[dp.year][dp.origin]) {
                    obj[dp.year][dp.origin] = {}
                }
                obj[dp.year][dp.origin][dp.destination] = dp.count
                return obj
            }, { ...state }))
    default:
        return state
    }
}

function categories(state = {}, action) {
    switch (action.type) {
    case RECEIVE_CATEGORY_DATA:
        return action.categoryData.reduce((obj, index) => {
            return { ...obj,
                [index.category]: [
                    ...(obj[index.category] ? obj[index.category] : []),
                    {
                        name: index.name,
                        max_value: index.max_value,
                        source: index.source
                    }] }
        }, {})
    default:
        return state
    }
}

function indexData(state = {}, action) {
    switch (action.type) {
    case RECEIVE_INDEX_DATA:
        return action.indexDataPoints.reduce((obj, dp) => {
            if (!obj[dp.country]) {
                obj[dp.country] = {}
            }
            if (!obj[dp.country][dp.index]) {
                obj[dp.country][dp.index] = {}
            }
            obj[dp.country][dp.index][dp.year] = {
                value: dp.value,
                rank: dp.rank
            }

            return obj
        }, { ...state })

    default:
        return state
    }
}

const rootReducer = combineReducers({
    selectedOptions,
    countryPositions,
    migrationData,
    categories,
    indexData
})

export default rootReducer
