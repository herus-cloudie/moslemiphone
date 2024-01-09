'use strict'
import { Provider } from "react-redux"
import store from "./store"

export default function Providers({child}){
    return(
        <Provider store={store}>{child}</Provider>
    )
}