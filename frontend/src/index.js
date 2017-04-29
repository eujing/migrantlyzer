import "babel-polyfill"
import ReactDOM from "react-dom"
import React from "react"
import { AppContainer } from "react-hot-loader"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { fetchCountryPositions, fetchMigrationData,
    selectOrigin } from "./actions"
import rootReducer from "./reducers"
import App from "./components/App.jsx"

require("./styles.css")

// Middleware for redux
const loggerMiddleware = createLogger()
const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware))

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById("root"))
}

// For hot module reloading
if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
        module.hot.accept("./components/App", () => render(App))
        module.hot.accept()
    }
    require("./index.html") // eslint-disable-line global-require
}

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchCountryPositions()).then(() => {
    console.log("Country Positions fetched!")

    render(App)

    store.dispatch(fetchMigrationData("Singapore", 2015)).then(() => {
        console.log("SG Migration Data fetched!")
    }).then(() => store.dispatch(selectOrigin("Singapore", 2015)))
    store.dispatch(fetchMigrationData("Malaysia", 2015)).then(() => {
        console.log("MY Migration Data fetched!")
    })
})

unsubscribe()
