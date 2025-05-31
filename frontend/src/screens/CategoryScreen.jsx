import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import {  useParams } from 'react-router-dom';


import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CategoryScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { category } = useParams();
    console.log(category,"cdfs");
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products');
                console.log('Products Data:',Object.keys(data),data ); // تحقق من البيانات
                setProducts(data.products); // افترض أن `data` مصفوفة
            } catch (err) {
                setError(
                    err.response && err.response.data.message
                        ? err.response.data.message
                        : 'An error occurred'
                );
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    // تصنيف المنتجات حسب الأقسام
    const categories = {};
    if (Array.isArray(products)) {
        products.forEach((product) => {
            if (!categories[product.category]) {
                categories[product.category] = [];
            }
            categories[product.category].push(product);
        });
        // console.log(categories,"from if");
        
    }
    console.log(category===null,category==="");
    
    if(category===null||category===""||category===undefined){
        return ( 
            <div>
                <h1>Categories</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    Object.keys(categories).map((category) => {
                        // console.log(category);
                        
                        return <div key={category}>
                        <h2>{category}</h2>
                            <Row>
                            {categories[category].map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        </div>
                    }
                        
                    )
                )}
            </div>
            );
    }else{
      return  <div>
            <h1>{category}</h1>
            {categories[category]!==undefined?
                       <Row>
                       {categories[category].map((product) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                           <Product product={product} />
                           </Col>
                       ))}
                   </Row>
            :<h4>{loading?"تشرفونا في المحل":`لا يتوفر ${category} حاليا `}</h4>}
            

        </div>
    }


};

export default CategoryScreen;
