import "babel-polyfill"
import ReactDOM from "react-dom"
import React from "react"
import { AppContainer } from "react-hot-loader"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { createStore, applyMiddleware } from "redux"
import {} from "./actions"
import rootReducer from "./reducers"
import App from "./components/App.jsx"

// For hot module reloading
if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
        module.hot.accept("./components/App", () => {
            ReactDOM.render(
                <AppContainer>
                    <App />
                </AppContainer>,
                document.getElementById("root"))
        })
        module.hot.accept()
    }
    require("./index.html") // eslint-disable-line global-require
}

require("./styles.css")

// Middleware for redux
const loggerMiddleware = createLogger()
const store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware))

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById("root"))

unsubscribe()
