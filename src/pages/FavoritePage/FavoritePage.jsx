import SelectForm from 'components/Select/Select';

import { WrapperSelect, Wrapper } from './FavoritePage.styled';
import { operations } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';
import CardItem from 'components/CardItem/CardItem';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  selectIsErrorFavorites,
  selectIsFetchingFavorites,
  selectIsloadingFavorites,
} from 'redux/selectors';

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const loadMore = () => {
    setPage(page + 1);
  };

  const data = useSelector(selectFavorites);

  const error = useSelector(selectIsErrorFavorites);
  const isLoading = useSelector(selectIsloadingFavorites);
  const isFetching = useSelector(selectIsFetchingFavorites);

  useEffect(() => {
    if (data) {
      setFavorites(prevState => {
        const dirtyArray = [...prevState, ...data];
        const uniqueObjArray = [...new Map(dirtyArray.map(item => [item['id'], item])).values()];
        return uniqueObjArray;
      });
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
        ) : favorites.length > 0 ? (
          <>
            {favorites.map((car, index) => (
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
