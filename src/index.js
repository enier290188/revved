import {Amplify} from "aws-amplify"
import React from "react"
import ReactDOM from "react-dom/client"
import awsExports from "./aws-exports"
import {App} from "./private/app/App"

Amplify.configure(awsExports)

const app = ReactDOM.createRoot(document.getElementById("app"))
// app.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// )
app.render(<App/>)
