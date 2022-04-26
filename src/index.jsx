import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function RootApp() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ClerkProvider
          frontendApi={process.env.REACT_APP_FRONTEND_CLERK_API_URL}
        >
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ClerkProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(<RootApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
