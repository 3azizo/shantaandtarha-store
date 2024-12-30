import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetTopProductsQuery, useGetProductsQuery } from '../slices/productsApiSlice';

import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  // Call both hooks unconditionally
  const {
    data: topProducts,
    isLoading: isTopProductsLoading,
    error: topProductsError,
  } = useGetTopProductsQuery();

  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery({ keyword, pageNumber });

  // Decide which data to use
  const products = keyword ? productsData?.products || [] : topProducts || [];
  const isLoading = keyword ? isProductsLoading : isTopProductsLoading;
  const error = keyword ? productsError : topProductsError;

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          رجوع
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>أحدث المنتجات</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} xl={3} >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* Uncomment and adjust pagination logic if needed */}
          {/* <Paginate
            pages={productsData?.pages || 1}
            page={productsData?.page || 1}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;
