import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { GrClose } from 'react-icons/gr';

import Button from 'components/Buttons/Buttons';
import {
  Wrapper,
  CloseButton,
  Wrap,
  Image,
  TextWrap,
  Title,
  Span,
  List,
  Item,
  Description,
  Info,
  ConditionItem,
  ConditionList,
  ConditionSpan,
} from './Modal.styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: 24,
  width: '541px',
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function BasicModal({ open, onClose, data }) {
  const {
    img,
    make,
    year,
    address,
    type,
    model,
    mileage,
    accessories,
    rentalPrice,
    rentalConditions,
    fuelConsumption,
    engineSize,
    description,
    functionalities,
  } = data;
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#12141720',
              borderRadius: '5px',
            },
          }}
        >
          <Wrapper>
            <CloseButton onClick={onClose}>
              <GrClose style={{ width: '18px', height: '18px' }} />
            </CloseButton>
            <Image src={img} alt={make} width="461" height="248" />
            <Wrap>
              <TextWrap>
                <Title>
                  {make} <Span>{model}, </Span>
                  {year}
                </Title>
              </TextWrap>
              <List>
                <Item>{address.split(',')[1]}</Item>
                <Item>{address.split(',')[2]}</Item>
                <Item>Id: </Item>
                <Item>Year: {year}</Item>
                <Item>Type: {type}</Item>
              </List>
              <List>
                <Item>Fuel Consumption: {fuelConsumption}</Item>
                <Item>Engine Size: {engineSize}</Item>
              </List>
              <Description>{description}</Description>
              <Info>Accessories and functionalities:</Info>
              <List>
                {accessories.map(item => (
                  <Item key={item}>{item}</Item>
                ))}
              </List>
              <List>
                {functionalities.map(item => (
                  <Item key={item}>{item}</Item>
                ))}
              </List>
              <Info>Rental Conditions:</Info>
              <ConditionList>
                <ConditionItem>
                  Minimum age: <ConditionSpan>{new Date().getFullYear() - year}</ConditionSpan>
                </ConditionItem>
                <ConditionItem>{rentalConditions.split('\n')[1]}</ConditionItem>
                <ConditionItem>{rentalConditions.split('\n')[2]}</ConditionItem>
                <ConditionItem>
                  Mileage: <ConditionSpan>{mileage.toLocaleString('en-US')}</ConditionSpan>
                </ConditionItem>
                <ConditionItem>
                  Price: <ConditionSpan>{rentalPrice}</ConditionSpan>
                </ConditionItem>
              </ConditionList>
            </Wrap>
            <Button
              text="Rental car"
              width="168px"
              onClick={() => {
                window.location.href = 'tel:+380730000000';
              }}
            />
          </Wrapper>
        </Box>
      </Modal>
    </div>
  );
}
