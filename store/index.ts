import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./modules/home";
import { createWrapper } from "next-redux-wrapper";
const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

const makeStore = () => store;
const wrapperStore = createWrapper(makeStore);

export default wrapperStore;

export type IAppDispath = typeof store.dispatch;
export type IAppRootState = ReturnType<typeof store.getState>;
