export const selectCatalog = state => state.catalog.catalog;
export const selectIsloadingCatalog = state => state.catalog.isLoading;
export const selectIsFetchingCatalog = state => state.catalog.isFetching;
export const selectIsErrorCatalog = state => state.catalog.error;

// export const selectFavorites = state => state.catalog.favorites;

export const selectFavorites = state => state.favorites.favorites;
export const selectIsloadingFavorites = state => state.favorites.isLoading;
export const selectIsFetchingFavorites = state => state.favorites.isFetching;
export const selectIsErrorFavorites = state => state.favorites.error;
