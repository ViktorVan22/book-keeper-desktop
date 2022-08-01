import React from "react";
import MainLayout from "./components/mainLayout/MainLayout";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./components/provider/Provider";

function App() {
  return (
    // 这里，Context的Provider表明这是一个全局上下文
    <Provider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
