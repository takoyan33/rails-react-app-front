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

console.log(qlapiKey);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
