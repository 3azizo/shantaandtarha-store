import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';

const BottomBar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bottom-bar d-lg-none">
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Nav className="w-100 justify-content-around">
          {/* رابط البحث */}
          <SearchBox />

          {/* رابط المشتريات */}
          <Nav.Link as={Link} to="/cart">
            <FaShoppingCart /> المشتريات
            {cartItems.length > 0 && (
              <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </Badge>
            )}
          </Nav.Link>

          {/* روابط المستخدم */}
          {userInfo ? (
            <NavDropdown title={<FaUser />} id="username">
              <NavDropdown.Item as={Link} to="/profile">الملف الشخصى</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>تسجيل الخروج</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/login">
              <FaUser /> تسجيل الدخول
            </Nav.Link>
          )}

          {/* روابط المسؤول (Admin) */}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="adminmenu">
              <NavDropdown.Item as={Link} to="/admin/productlist">منتجات</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orderlist">طلبات</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/userlist">المستخدمين</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default BottomBar;
