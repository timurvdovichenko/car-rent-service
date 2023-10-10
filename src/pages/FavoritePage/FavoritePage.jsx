import SelectForm from 'components/Select/Select';

import { WrapperSelect, Wrapper } from './FavoritePage.styled';
import { operations, useGetCarsByPageQuery } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';
import CardItem from 'components/CardItem/CardItem';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function FavoritePage() {
  const [catalog, setCatalog] = useState([]); // Стейт для хранения всех карточек
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const loadMore = () => {
    setPage(page + 1);
  };
  const { data, error, isLoading, isFetching } = useGetCarsByPageQuery(page);
  useEffect(() => {
    if (data) {
      setCatalog(prevCatalog => [...prevCatalog, ...data]);
    }
  }, [data]);

  useEffect(() => {
    dispatch(operations.getFavorites(true));
  }, [dispatch]);

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

export default FavoritePage;
