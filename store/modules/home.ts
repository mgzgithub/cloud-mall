import { ISearchSuggest, getSearchSuggest } from "@/service/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IHomeState {
  navbarSuggest: ISearchSuggest;
}

const homeSlice = createSlice({
  name: "home",
  initialState: {
    navbarSuggest: {},
  } as IHomeState,
  reducers: {
    setNavbarSuggest(state, { payload }) {
      state.navbarSuggest = payload;
    },
  },
  extraReducers: buildr => {
    buildr.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.home,
      };
    });
  },
});

export const { setNavbarSuggest } = homeSlice.actions;

export const fatchNavbarSuggestData = createAsyncThunk(
  "fatchNavbarSuggestData",
  async (_, { dispatch }) => {
    const res = await getSearchSuggest();
    dispatch(setNavbarSuggest(res.data));
  }
);

export default homeSlice.reducer;
