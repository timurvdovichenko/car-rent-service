import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { operations } from './operations';

const initialState = {
  catalog: [],
  isLoading: false,
  isFetching: false,
  error: false,
};
const initialStateFavorites = {
  favorites: [],
  isLoading: false,
  isFetching: false,
  error: false,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalog: (state, action) => {
      state.catalog = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: {
    [operations.getAllWithPagination.pending](state) {
      state.isLoading = true;
      state.isFetching = true;
    },
    [operations.getAllWithPagination.rejected](state) {
      state.isLoading = false;
      state.isFetching = false;
      state.error = true;
    },
    [operations.getAllWithPagination.fulfilled](state, action) {
      state.isLoading = false;
      state.isFetching = false;

      const dirtyArray = [...state.catalog, ...action.payload];
      const uniqueObjArray = [...new Map(dirtyArray.map(item => [item['id'], item])).values()];
      state.catalog = uniqueObjArray;
      state.error = false;
    },
  },
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialStateFavorites,
  // reducers: {
  //   setFavorites: (state, action) => {
  //     state.catalog = action.payload;
  //   },
  //   addToFavorites: (state, action) => {
  //     state.favorites.push(action.payload);
  //   },
  //   removeFromFavorites: (state, action) => {
  //     state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
  //   },
  // },
  extraReducers: {
    [operations.getFavorites.pending](state) {
      state.isLoading = true;
      state.isFetching = true;
    },
    [operations.getFavorites.rejected](state) {
      state.isLoading = false;
      state.isFetching = false;
      state.error = true;
    },
    [operations.getFavorites.fulfilled](state, action) {
      state.isLoading = false;
      state.isFetching = false;
      state.favorites = action.payload;
      state.error = false;
    },
  },
});

const catalogReducer = catalogSlice.reducer;

const favoritesReducer = favoriteSlice.reducer;

export const { setCatalog, addToFavorites, removeFromFavorites } = catalogSlice.actions;

// export default catalogReducer;

const reducers = combineReducers({
  catalog: catalogReducer,
  favorites: favoritesReducer,
});

export default reducers;
