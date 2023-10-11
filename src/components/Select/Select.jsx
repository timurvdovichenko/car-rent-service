import Select from 'react-select';

import {
  Container,
  Form,
  InputContainer,
  InputLeft,
  InputRight,
  Label,
  SelectContainer,
  UnitLeft,
  UnitRight,
} from './Select.styled';

import Buttons from 'components/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrands } from 'redux/selectors';
import { useEffect, useState } from 'react';
import { operations } from 'redux/operations';
import { setSelectBrand, setSelectPrice } from 'redux/slice';

export default function SelectForm() {
  const brands = useSelector(selectBrands);
  const [brand, setBrand] = useState(null);
  const [price, setPrice] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(operations.getSortCarByBrands());
  }, [dispatch]);

  useEffect(() => {
    if (brand && !price) {
      dispatch(operations.getDataWithPagination({ action: `&make=${brand}` }));
      dispatch(setSelectBrand(true));
      return;
    }

    if (price && !brand) {
      dispatch(operations.getDataWithPagination({ action: `&rentalPrice=${price}` }));
      dispatch(setSelectPrice(true));
    }
    // if (price && brand) {
    //   dispatch(
    //     operations.getDataWithPagination({
    //       action: `make=${brand}`,
    //       priceFilter: `${price}`,
    //     }),
    //   );
    //   dispatch(setSelectBrand(true));
    //   dispatch(setSelectPrice(true));
    // }
  }, [brand, dispatch, price]);

  const makeOptions = brands.map(car => ({ value: car, label: car }));

  const prices = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];

  return (
    <Container>
      <SelectContainer>
        <Label htmlFor="nameSelect">Car brand</Label>
        <Select
          id="nameSelect"
          placeholder="Enter the text"
          options={makeOptions}
          styles={{
            control: styles => ({
              ...styles,
              width: '224px',
              height: '48px',
              borderColor: 'rgba(18, 20, 23, 0.2)',
              border: 'none',
              borderRadius: '14px',
              padding: '8px',
              fontSize: '16px',
              fontFamily: 'Manrope',
              backgroundColor: 'rgba(247, 247, 251, 1)',
              appearance: 'none',
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                color: isFocused ? 'black' : 'rgba(18, 20, 23, 0.2)',
                fontFamily: 'Manrope',
              };
            },
            menuList: base => ({
              ...base,
              '::-webkit-scrollbar': {
                width: '9px',
              },
              '::-webkit-scrollbar-track': {
                background: 'rgba(18, 20, 23, 0.05)',
              },
              '::-webkit-scrollbar-thumb': {
                background: 'rgba(18, 20, 23, 0.05)',
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(18, 20, 23, 0.05)',
              },
            }),
            placeholder: styles => ({
              ...styles,
              color: 'rgba(18, 20, 23, 1)',
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
          onChange={choice => setBrand(choice.value)}
        />
      </SelectContainer>

      <SelectContainer>
        <Label htmlFor="priceSelect">Price/ 1 hour</Label>
        <Select
          id="priceSelect"
          placeholder="To $"
          options={prices.map(price => ({ value: price, label: price }))}
          styles={{
            control: styles => ({
              ...styles,
              width: '125',
              height: '48px',
              borderColor: 'rgba(18, 20, 23, 0.2)',
              border: 'none',
              borderRadius: '14px',
              padding: '8px',
              fontSize: '16px',
              fontFamily: 'Manrope',
              backgroundColor: 'rgba(247, 247, 251, 1)',
              appearance: 'none',
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                color: isFocused ? 'black' : 'rgba(18, 20, 23, 0.2)',
                fontFamily: 'Manrope',
              };
            },
            menuList: base => ({
              ...base,
              '::-webkit-scrollbar': {
                width: '9px',
              },
              '::-webkit-scrollbar-track': {
                background: 'rgba(18, 20, 23, 0.05)',
              },
              '::-webkit-scrollbar-thumb': {
                background: 'rgba(18, 20, 23, 0.05)',
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(18, 20, 23, 0.05)',
              },
            }),
            placeholder: styles => ({
              ...styles,
              color: 'rgba(18, 20, 23, 1)',
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
          onChange={choice => setPrice(choice.value)}
        />
      </SelectContainer>

      <Form>
        <Label>Car mileage / km</Label>
        <InputContainer>
          <InputLeft type="text" />
          <UnitLeft>From</UnitLeft>
          <InputRight type="text" />
          <UnitRight>To</UnitRight>
        </InputContainer>
      </Form>
      <Buttons text="Search" onClick={() => console.log('click')} width="135px" />
    </Container>
  );
}
