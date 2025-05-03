// import { StrictMode } from "react";
import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./styles/globals.css";
import "./styles/animate.css";
import "./styles/slick.css";
import "./styles/swiper-bundle.css";
import store, { persistor } from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import ScrollToTop from "./ScrollToTop.jsx";

// let persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
