import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { qlapiKey } from "./components/env";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const link = createHttpLink({
  uri: qlapiKey,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
