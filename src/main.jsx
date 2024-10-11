// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import "./styles/globals.css";
import "./styles/animate.css";
import "./styles/slick.css";
import "./styles/swiper-bundle.css";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
