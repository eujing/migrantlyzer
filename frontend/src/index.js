import "babel-polyfill"
import ReactDOM from "react-dom"
import React from "react"
import { AppContainer } from "react-hot-loader"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { fetchCountryPositions, fetchCategoryData, selectCountry, fetchMigrationData, fetchIndexData } from "./actions"
import rootReducer from "./reducers"
import App from "./components/App.jsx"

require("./styles.css")
require("./css/bootstrap.min.css")

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

Promise.all([
    store.dispatch(fetchCountryPositions()),
    store.dispatch(fetchCategoryData())]).then(() => {
        render(App)
        /* Promise.all([
            store.dispatch(fetchMigrationData("Singapore")),
            store.dispatch(fetchIndexData("Singapore"))]).then(() => store.dispatch(selectCountry("Singapore")))
        */
    })

unsubscribe()
