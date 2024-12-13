import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'شنطة وطرحة',
  description: 'محل شنطة وطرحة بيع منتجات ملابس بسعر مناسب جدا',
  keywords: 'ملابس نسائية , girls clothings, clothing',
};

export default Meta;
