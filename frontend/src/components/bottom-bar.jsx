// import React, { useState } from 'react';

// const BottomBar = () => {
//   const [cartCount, setCartCount] = useState(0); 

//   const handleSearchClick = () => {
//     // Handle search logic here 
//   };

//   const handleAuthClick = () => {
//     // Handle authentication logic here 
//   };

//   const handleCartClick = () => {
//     // Handle cart logic here 
//   };

//   return (
//     <div className="bottom-bar">
//       <ul className="bottom-bar--list">
//         <li className="list-item"> 
//             Home
//           {/* ... (Home link) */}
//         </li>
//         <li className="list-item">
//           <a role="link" aria-disabled="true" onClick={handleSearchClick}>
//             بحث
//             {/* ... (Search icon and text) */}
//           </a>
//         </li>
//         <li className="list-item"> 
//             تصنيفات
//           {/* ... (Collections link) */}
//         </li>
//         <li className="list-item">
//           <a role="link" aria-disabled="true" onClick={handleAuthClick}>
//             الحساب
//             {/* ... (Account icon and text) */}
//           </a>
//         </li>
//         <li className="list-item">
//           <a role="link" aria-disabled="true" onClick={handleCartClick}>
//             مشترياتي
//             {/* ... (Cart icon and text) */}
//             <div className="cart-count-bubble">
//               <span className="text" aria-hidden="true">
//                 {cartCount}
//               </span>
//               <span className="visually-hidden">0 صنف</span>
//             </div>
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default BottomBar;

