import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
// import storage from "redux-persist/lib/storage";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   // whitelist: ["currentUser", "hasCompany", "companyId"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// const store = configureStore({
//   reducer: persistedReducer,
// });

const store = configureStore({
  reducer: rootReducer,
});
// export const persistor = persistStore(store);

export default store;
