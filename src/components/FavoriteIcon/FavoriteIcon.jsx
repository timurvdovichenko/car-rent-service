import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { addToFavorites, removeFromFavorites } from 'redux/catalogSlice';
import { useDispatch } from 'react-redux';
import { operations } from 'redux/operations';

export default function FavoriteIcon({ id }) {
  // console.log('id :>> ', id);
  // const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();

  const StylesFavorite = styled(Favorite)({
    fill: '#3470FF',
  });

  const StylesFavoriteBorder = styled(FavoriteBorder)({
    fill: '#FFFFFFCC',
  });

  dispatch(operations.getByID(id));

  const handleChange = e => {
    if (e.target.checked) {
      dispatch(addToFavorites(id));

      dispatch(operations.updateFavoriteStatus({ favoriteStatus: { favorite: true }, id }));
    } else {
      dispatch(removeFromFavorites(id));
      dispatch(operations.updateFavoriteStatus({ favoriteStatus: { favorite: false }, id }));
    }
  };

  return (
    <div style={{ position: 'absolute', top: '0', right: '0' }}>
      <Checkbox
        aria-label="favorite-checkbox"
        icon={<StylesFavoriteBorder />}
        checkedIcon={<StylesFavorite />}
        onChange={handleChange}
        checked={true}
      />
    </div>
  );
}
