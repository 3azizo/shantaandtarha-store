import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [sizes, setSizes] = useState([]); // المقاسات المختارة
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  // color
  const [colors, setColors] = useState([]); // تخزين الألوان المحددة



  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        sizes,
        colors,
      }).unwrap();
      toast.success('تم تحديث المنتج بنجاح');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setSizes(product.sizes || []);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // المقاسات المتاحة للاختيار
  const availableSizes =category=="ملابس" ?['S', 'M', 'L', 'XL', 'XXL',"XXXL"]:['26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54','S', 'M', 'L', 'XL', 'XXL',"XXXL"];

  // اختيار أو إلغاء تحديد المقاس
  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size)); // إزالة المقاس إذا كان محددًا مسبقًا
    } else {
      setSizes([...sizes, size]); // إضافة المقاس
    }
  };
  // تغير لون
  const toggleColor = (color) => {
    if (colors.includes(color)) {
      setColors(colors.filter((c) => c !== color)); // إزالة اللون إذا كان موجودًا
    } else {
      setColors([...colors, color]); // إضافة اللون إذا لم يكن موجودًا
    }
  };
  

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        رجوع
      </Link>
      <FormContainer>
        <h1>تعديل المنتج</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>الاسم</Form.Label>
              <Form.Control
                type='text'
                placeholder='أدخل اسم المنتج'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>السعر</Form.Label>
              <Form.Control
                type='number'
                placeholder='أدخل السعر'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>الصورة</Form.Label>
              <Form.Control
                type='text'
                placeholder='أدخل رابط الصورة'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              />
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>الماركة</Form.Label>
              <Form.Control
                type='text'
                placeholder='أدخل الماركة'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>المخزون</Form.Label>
              <Form.Control
                type='number'
                placeholder='أدخل الكمية'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>الفئة</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="شنط">شنط</option>
                <option value="طرح">طرح</option>
                <option value="ملابس">ملابس</option>
                <option value="شال">شال</option>
                <option value="بناطيل">بناطيل</option>
                <option value="ترنجات">ترنجات</option>
                <option value="مستحضرات تجميل">مستحضرات تجميل</option>
                <option value="أكسسوارات">أكسسوارات</option>
                <option value="شرابات">شرابات</option>
              </Form.Select>
            </Form.Group>

            {/* اختيار المقاسات */}
            {(category==="ملابس"||category==="بناطيل"||category==='ترنجات') &&  <Form.Group controlId="sizes">
              <Form.Label>المقاسات</Form.Label>
              <div>
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    variant={sizes.includes(size) ? 'primary' : 'outline-secondary'}
                    className="m-1"
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <div className="mt-2">
                <strong>المقاسات المختارة:</strong>
                {sizes.length > 0 ? (
                  sizes.map((size) => (
                    <Button key={size} variant="danger" className="m-1" onClick={() => toggleSize(size)}>
                      {size} ×
                    </Button>
                  ))
                ) : (
                  <p>لم يتم تحديد أي مقاس</p>
                )}
              </div>
            </Form.Group>}
            {/* عرض الألوان فقط إذا كانت الفئة "طرح" */}
            {(category === 'طرح'||category==="بناطيل"||category==="ترنجات") && (
              <Form.Group controlId="colors">
                <Form.Label>الألوان</Form.Label>
                <div>

                  
                  {[
                    " نفس لون الصورة",
    // Red shades
    "أحمر فاتح", "أحمر غامق", "أحمر ناري", "أحمر كرزي", "أحمر برغندي", "أحمر وردي", "أحمر عنابي", "أحمر دموي", "أحمر نبيذي",
    
    // Orange shades
    "برتقالي فاتح", "برتقالي غامق", "برتقالي محروق", "برتقالي مشمشي", "برتقالي نحاسي", "برتقالي زهري", "برتقالي مرجاني",
    
    // Yellow shades
    "أصفر فاتح", "أصفر داكن", "أصفر ذهبي", "أصفر ليموني", "أصفر خردلي", "أصفر كهرماني", "أصفر كريمي", "أصفر كهربائي",
    
    // Green shades
    "أخضر فاتح", "أخضر غامق", "أخضر زمردي", "أخضر نعناعي", "أخضر فسفوري", "أخضر زيتوني", "أخضر كحلي", "أخضر ملكي", "أخضر مائي",
    
    // Blue shades
    "أزرق فاتح", "أزرق غامق", "أزرق سماوي", "أزرق نيلي", "أزرق تركوازي", "أزرق كهربائي", "أزرق ملكي", "أزرق ثلجي", "أزرق بترولي",
    
    // Purple shades
    "بنفسجي فاتح", "بنفسجي غامق", "بنفسجي أرجواني", "بنفسجي كحلي", "بنفسجي عنابي", "بنفسجي خوخي", "بنفسجي زهري", "بنفسجي ضبابي",
    
    // Pink shades
    "وردي فاتح", "وردي غامق", "وردي خوخي", "وردي زهري", "وردي بنفسجي", "وردي ثلجي", "وردي مشمشي", "وردي فوشيا", "وردي مغبر",
    
    // Brown shades
    "بني فاتح", "بني غامق", "بني شوكولاتي", "بني خشبي", "بني ترابي", "بني كستنائي", "بني برونزي", "بني داكن", "بني نحاسي",
    
    // Gray shades
    "رمادي فاتح", "رمادي غامق", "رمادي معدني", "رمادي ثلجي", "رمادي فحمي", "رمادي دخاني", "رمادي فضي", "رمادي مائل للأزرق",
    
    // Black shades
    "أسود قاتم", "أسود فحمي", "أسود ليلي", "أسود دخاني", "أسود ملكي", "أسود بترولي", "أسود معدني", "أسود رصاصي", "أسود كربوني",
    
    // White shades
    "أبيض نقي", "أبيض كريمي", "أبيض ثلجي", "أبيض لؤلؤي", "أبيض عاجي", "أبيض فضي", "أبيض شفاف", "أبيض مائل للوردي",
    
    // Gold shades
    "ذهبي فاتح", "ذهبي غامق", "ذهبي ملكي", "ذهبي معدني", "ذهبي برونزي", "ذهبي نحاسي", "ذهبي متوهج", "ذهبي داكن",
    
    // Silver shades
    "فضي فاتح", "فضي غامق", "فضي معدني", "فضي لامع", "فضي نيلي", "فضي زمردي", "فضي رخامي", "فضي براق",
    // زيتي 
    "زيتي فاتح","زيتي غامق"
]
.map((color) => (
                    <Button
                      key={color}
                      variant={colors.includes(color) ? 'primary' : 'outline-secondary'}
                      className="m-1"
                      onClick={() => toggleColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
                <div className="mt-2">
                  <strong>الألوان المختارة:</strong>
                  {colors.length > 0 ? (
                    colors.map((color) => (
                      <Button key={color} variant="danger" className="m-1" onClick={() => toggleColor(color)}>
                        {color} ×
                      </Button>
                    ))
                  ) : (
                    <p>لم يتم تحديد أي لون</p>
                  )}
                </div>
              </Form.Group>
            )}


            <Form.Group controlId='description'>
              <Form.Label>الوصف</Form.Label>
              <Form.Control
                type='text'
                placeholder='أدخل الوصف'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-3">
              تحديث المنتج
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
