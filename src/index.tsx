import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.variable.min.css"
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query"

export const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)