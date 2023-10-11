import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { operations } from 'redux/operations';
import { useState } from 'react';

export default function FavoriteIcon({ id, favoriteStatus }) {
  const [favorite, setFavorite] = useState(favoriteStatus);

  const dispatch = useDispatch();

  const StylesFavorite = styled(Favorite)({
    fill: '#3470FF',
  });

  const StylesFavoriteBorder = styled(FavoriteBorder)({
    fill: '#FFFFFFCC',
  });

  const handleChange = e => {
    if (e.target.checked) {
      setFavorite(true);
      dispatch(operations.updateFavoriteStatus({ favoriteStatus: { favorite: true }, id }));
    } else {
      setFavorite(false);
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
        checked={favorite}
      />
    </div>
  );
}
