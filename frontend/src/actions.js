import fetch from "isomorphic-fetch"

export const SELECT_ORIGIN = "SELECT_ORIGIN"
export function selectOrigin(country) {
    return {
        type: SELECT_ORIGIN,
        country,
    }
}

export const SELECT_DEST = "SELECT_DEST"
export function selectDest(country) {
    return {
        type: SELECT_DEST,
        country,
    }
}

export const SELECT_COUNTRY = "SELECT_COUNTRY"
export function selectCountry(country) {
    return { type: SELECT_COUNTRY, country }
}

export const SELECT_YEAR = "SELECT_YEAR"
function selectYear(year) {
    return { type: SELECT_YEAR, year }
}

export const RECEIVE_COUNTRY_POSITIONS = "RECEIVE_COUNTRY_POSITIONS"
function receiveCountryPositions(countries) {
    return { type: RECEIVE_COUNTRY_POSITIONS, countries }
}

export function fetchCountryPositions() {
    return dispatch => fetch(`http://${API_URL}/migrantlyzer/country`)
            .then(r => r.json())
            .then((jsonS) => {
                const json = JSON.parse(jsonS)
                dispatch(receiveCountryPositions(json.map(row => row.fields)))
            })
}

export const RECEIVE_MIGRATION_DATA = "RECEIVE_MIGRATION_DATA"
function receiveMigrationData(migrationDataPoints) {
    return { type: RECEIVE_MIGRATION_DATA, migrationDataPoints }
}

export function fetchMigrationData(country, year) {
    return (dispatch, getState) => {
        const queryYear = year || getState().selectedOptions.year
        return fetch(`http://${API_URL}/migrantlyzer/migration?country=${country}&year=${queryYear}`)
            .then(r => r.json())
            .then((jsonS) => {
                const json = JSON.parse(jsonS)
                dispatch(receiveMigrationData(json.map(row => row.fields)))
            })
    }
}

export const RECEIVE_CATEGORY_DATA = "RECEIVE_CATEGORY_DATA"
function receiveCategoryData(categoryData) {
    return { type: RECEIVE_CATEGORY_DATA, categoryData }
}

export function fetchCategoryData() {
    return dispatch => fetch(`http://${API_URL}/migrantlyzer/category`)
        .then(r => r.json())
        .then((jsonS) => {
            const json = JSON.parse(jsonS)
            dispatch(receiveCategoryData(json.map(row => row.fields)))
        })
}

export const RECEIVE_INDEX_DATA = "RECEIVE_INDEX_DATA"
function receiveIndexData(indexDataPoints) {
    return { type: RECEIVE_INDEX_DATA, indexDataPoints }
}

export function fetchIndexData(country, year) {
    return (dispatch, getState) => {
        const queryYear = year || getState().selectedOptions.year
        return fetch(`http://${API_URL}/migrantlyzer/index?country=${country}&year=${queryYear}`)
            .then(r => r.json())
            .then((jsonS) => {
                const json = JSON.parse(jsonS)
                dispatch(receiveIndexData(json.map(row => row.fields)))
            })
    }
}

export function changeYear(year) {
    return (dispatch, getState) => {
        const state = getState()
        const origin = state.selectedOptions.origin
        const destination = state.selectedOptions.destination
        const promises = []

        if (origin) {
            promises.push(dispatch(fetchMigrationData(origin, year)))
            promises.push(dispatch(fetchIndexData(origin, year)))
        }
        if (destination) {
            promises.push(dispatch(fetchMigrationData(destination, year)))
            promises.push(dispatch(fetchIndexData(destination, year)))
        }

        Promise.all(promises).then(() => dispatch(selectYear(year)))
    }
}
