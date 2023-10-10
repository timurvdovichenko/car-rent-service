import Buttons from 'components/Buttons/Buttons';
import BasicModal from 'components/Modal/Modal';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import {
  Wrapper,
  WrapperImage,
  Image,
  WrapperTitle,
  Title,
  Price,
  Description,
} from './CardItem.styled';
import { useState } from 'react';

export default function CardItem({ data }) {
  // console.log('data :>> ', data);
  const {
    id,
    img,
    make,
    year,
    address,
    rentalCompany,
    type,
    model,
    mileage,
    accessories,
    rentalPrice,
    favorite,
  } = data;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log('favorite :>> ', favorite);
  return (
    <Wrapper>
      <WrapperImage>
        <FavoriteIcon id={id} favoriteStatus={favorite} />
        <Image src={img} alt="Car" />
      </WrapperImage>
      <WrapperTitle>
        <Title>
          {make} <span style={{ color: '#3470FF' }}>{model}</span>, {year}
        </Title>
        <Price>{rentalPrice}</Price>
      </WrapperTitle>
      <Description>
        <li>{address.split(',')[1]}</li>
        <li>{address.split(',')[2]}</li>
        <li>{rentalCompany}</li>
        <li>{type}</li>
        <li>{model}</li>
        <li>{mileage}</li>
        <li>{accessories[0]}</li>
      </Description>
      <Buttons text="Learn more" onClick={handleOpen} width="274px" />
      {open && <BasicModal open={open} onClose={handleClose} data={data} />}
    </Wrapper>
  );
}
