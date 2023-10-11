export const selectCatalog = state => state.catalog.catalog;
export const selectIsloadingCatalog = state => state.catalog.isLoading;
export const selectIsFetchingCatalog = state => state.catalog.isFetching;
export const selectIsErrorCatalog = state => state.catalog.error;
export const selectBrandCatalogBoolean = state => state.catalog.selectBrand;
export const selectPriceCatalogBoolean = state => state.catalog.selectPrice;

// export const selectFavorites = state => state.catalog.favorites;

export const selectFavorites = state => state.favorites.favorites;
export const selectIsloadingFavorites = state => state.favorites.isLoading;
export const selectIsFetchingFavorites = state => state.favorites.isFetching;
export const selectIsErrorFavorites = state => state.favorites.error;

export const selectBrands = state => state.brands.brands;
export const selectIsloadingBrands = state => state.brands.isLoading;
export const selectIsFetchingBrands = state => state.brands.isFetching;
export const selectIsErrorBrands = state => state.brands.error;

export const selectSortOrFilter = state => state.sortOrFilter.sortOrFilter;
export const selectIsloadingSortOrFilter = state => state.sortOrFilter.isLoading;
export const selectIsFetchingSortOrFilter = state => state.sortOrFilter.isFetching;
export const selectIsErrorSortOrFilter = state => state.sortOrFilter.error;
