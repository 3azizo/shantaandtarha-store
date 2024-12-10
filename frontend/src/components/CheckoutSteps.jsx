import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to='/login'>
            تسجيل الدخول
          </Nav.Link>
        ) : (
          <Nav.Link disabled>تسجيل الدخول</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to='/shipping'>
            شحن
          </Nav.Link>
        ) : (
          <Nav.Link disabled>شحن</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to='/payment'>
            دفع
          </Nav.Link>
        ) : (
          <Nav.Link disabled>دفع</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} to='/placeorder'>
           وضع الطلب
          </Nav.Link>
        ) : (
          <Nav.Link disabled>وضع الطلب</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
