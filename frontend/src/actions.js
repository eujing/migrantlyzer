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

export const SELECT_COUNTRY = "SELECT_COUNTRY"
export function selectCountry(country) {
    return { type: SELECT_COUNTRY, country }
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
    return dispatch => fetch("http://localhost:8000/migrantlyzer/country")
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
    return dispatch => fetch(`http://localhost:8000/migrantlyzer/migration?country=${country}&year=${year}`)
            .then(r => r.json())
            .then((jsonS) => {
                const json = JSON.parse(jsonS)
                dispatch(receiveMigrationData(json.map(row => row.fields)))
            })
}

export const RECEIVE_CATEGORY_DATA = "RECEIVE_CATEGORY_DATA"
function receiveCategoryData(categoryData) {
    return { type: RECEIVE_CATEGORY_DATA, categoryData }
}

export function fetchCategoryData() {
    return dispatch => fetch("http://localhost:8000/migrantlyzer/category")
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
    return dispatch => fetch(`http://localhost:8000/migrantlyzer/index?country=${country}&year=${year}`)
        .then(r => r.json())
        .then((jsonS) => {
            const json = JSON.parse(jsonS)
            dispatch(receiveIndexData(json.map(row => row.fields)))
        })
}
