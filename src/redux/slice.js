import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { operations } from './operations';

const initialState = {
  catalog: [],
  isLoading: false,
  isFetching: false,
  error: false,
  selectBrand: false,
  selectPrice: false,
};
const initialStateFavorites = {
  favorites: [],
  isLoading: false,
  isFetching: false,
  error: false,
};
const initialStateBrands = {
  brands: [],
  isLoading: false,
  isFetching: false,
  error: false,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSelectBrand: (state, action) => {
      state.selectBrand = action.payload;
    },
    setSelectPrice: (state, action) => {
      state.selectPrice = action.payload;
    },
  },

  extraReducers: {
    [operations.getDataWithPagination.pending](state) {
      state.isLoading = true;
      state.isFetching = true;
    },
    [operations.getDataWithPagination.rejected](state) {
      state.isLoading = false;
      state.isFetching = false;
      state.error = true;
    },
    [operations.getDataWithPagination.fulfilled](state, action) {
      state.isLoading = false;
      state.isFetching = false;

      // const dirtyArray = [...state.catalog, ...action.payload];
      // const uniqueObjArray = [...new Map(dirtyArray.map(item => [item['id'], item])).values()];
      // state.catalog = uniqueObjArray;
      state.catalog = action.payload;
      state.error = false;
    },
  },
});

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialStateFavorites,
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

const brandsSlice = createSlice({
  name: 'brands',
  initialState: initialStateBrands,
  extraReducers: {
    [operations.getSortCarByBrands.pending](state) {
      state.isLoading = true;
      state.isFetching = true;
    },
    [operations.getSortCarByBrands.rejected](state) {
      state.isLoading = false;
      state.isFetching = false;
      state.error = true;
    },
    [operations.getSortCarByBrands.fulfilled](state, action) {
      state.isLoading = false;
      state.isFetching = false;
      const dirtyArray = action.payload.map(item => item.make);
      const cleanArray = dirtyArray.filter((item, index, array) => array.indexOf(item) === index);
      state.brands = cleanArray;
      state.error = false;
    },
  },
});

const catalogReducer = catalogSlice.reducer;
const favoritesReducer = favoriteSlice.reducer;
const brandsReducer = brandsSlice.reducer;

export const { setSelectBrand, setSelectPrice } = catalogSlice.actions;

const reducers = combineReducers({
  catalog: catalogReducer,
  favorites: favoritesReducer,
  brands: brandsReducer,
});

export default reducers;
