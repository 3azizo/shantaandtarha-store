import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [phoneNum, setPhoneNum] = useState(
    shippingAddress.phoneNum || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, phoneNum, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>الشحن</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>العنوان</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='city'>
          <Form.Label>المدينة</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='phoneNum'>
          <Form.Label>رقم تليفون</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter phone number'
            value={phoneNum}
            required
            onChange={(e) => setPhoneNum(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label>البلد</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          متابعة
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
