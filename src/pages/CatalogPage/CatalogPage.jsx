import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import CardItem from 'components/CardItem/CardItem';
import SelectForm from 'components/Select/Select';
import { operations } from '../../redux/operations';
import { Loader } from 'components/Loader/Loader';

import { Wrapper, WrapperSelect } from './CatalogPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrandCatalogBoolean,
  selectCatalog,
  selectIsErrorCatalog,
  selectIsFetchingCatalog,
  selectIsloadingCatalog,
  selectPriceCatalogBoolean,
} from 'redux/selectors';

function CatalogPage() {
  const [page, setPage] = useState(1);
  const [catalog, setCatalog] = useState([]);
  const dispatch = useDispatch();

  const data = useSelector(selectCatalog);

  const selectBrand = useSelector(selectBrandCatalogBoolean);
  const selectPrice = useSelector(selectPriceCatalogBoolean);

  // const dataSort = useSelector(selectSortOrFilter);
  // console.log('dataSort :>> ', dataSort);
  console.log('data :>> ', data);

  const error = useSelector(selectIsErrorCatalog);
  const isLoading = useSelector(selectIsloadingCatalog);
  const isFetching = useSelector(selectIsFetchingCatalog);

  const loadMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    dispatch(operations.getDataWithPagination({ page: `page=${page}` }));
  }, [dispatch, page]);

  useEffect(() => {
    if (selectBrand || selectPrice) {
      setCatalog(data);

      return;
    }
    setCatalog(prevState => {
      const dirtyArray = [...prevState, ...data];
      const uniqueObjArray = [...new Map(dirtyArray.map(item => [item['id'], item])).values()];
      return uniqueObjArray;
    });
  }, [data, selectBrand, selectPrice]);

  return (
    <>
      <WrapperSelect>
        <SelectForm />
      </WrapperSelect>
      <Wrapper>
        {error ? (
          <>Oops, there was an error...</>
        ) : isLoading ? (
          <Loader />
        ) : catalog.length > 0 ? (
          <>
            {catalog.map((car, index) => (
              <CardItem key={index} data={car} />
            ))}
          </>
        ) : null}
        {data && data.length >= 8 && (
          <Button variant="text" onClick={loadMore} disabled={isFetching}>
            Load more
          </Button>
        )}
      </Wrapper>
    </>
  );
}

export default CatalogPage;
