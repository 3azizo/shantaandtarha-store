import React from 'react';
import shoppingBag from "../assets/categoriesIcon/shopping-bag.png";
import cloths from "../assets/categoriesIcon/dress.png";
import scarf from "../assets/categoriesIcon/scarf.png";
import trousers from "../assets/categoriesIcon/trousers.png";
import makrup from "../assets/categoriesIcon/makeup.png";
import diamond from "../assets/categoriesIcon/diamond.png";
import hijab from "../assets/categoriesIcon/hijab.png";
import socks from "../assets/categoriesIcon/socks.png";

import { Link } from 'react-router-dom';

const AllCategories = () => {
  const categories = [
    { name: 'شنط', icon: shoppingBag, path: '/categories/شنط' },
    { name: 'طرح', icon: hijab, path: '/categories/طرح' },
    { name: 'مكملات حجاب', icon: hijab, path: '/categories/مكملات حجاب' },
    { name: 'ملابس', icon: cloths, path: '/categories/ملابس' },
    { name: 'شال', icon: scarf, path: '/categories/شال' },
    { name: 'بناطيل', icon: trousers, path: '/categories/بناطيل' },
    { name: 'مستحضرات تجميل', icon: makrup, path: '/categories/مستحضرات تجميل' },
    { name: 'اكسسوارات', icon: diamond, path: '/categories/اكسسوارات' },
    { name: 'شرابات', icon: socks, path: '/categories/شرابات' },
  ];

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">الفئات</h1>
      <div className="row">
        {categories.map((category) => (
          <div className="col-6 col-md-3 mb-4" key={category.path}>
            <Link to={category.path} className="card category-card text-decoration-none shadow-sm">
              <div className="card-body">
                <div className="icon-container mb-2">
                  <img src={category.icon} alt={`أيقونة لفئة ${category.name}`} />
                </div>
                <h5 className="card-title">{category.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
