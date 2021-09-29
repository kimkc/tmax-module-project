import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function ProductViews({sliceNumber, columnNumber, categoryName}) {

  const [ books, setbooks ] = useState([]);
  
  const categoryData = ['전체보기', '소설', '시/에세이', '경제/경영', '자기계발', '인문', '역사/문화', '종교', '정치/사회', '예술/대중문화', '과학', '기술/공학', '컴퓨터/IT']
  
  useEffect(() => {
    axios.get('/catalog-service/catalogs')
    .then(res => {
      if (categoryName != '전체보기') {
        let result = res.data.filter(book => 
          book.category == categoryData.indexOf(categoryName)
          ) 
          setbooks(result)
        }
      else {
        setbooks(res.data)
      }
    })
    .catch((err) =>
      console.log(err)
    )
  },[categoryName])

  const booklist = books.map((book) => {
    return (
      <div className={`col-xl-${columnNumber} col-md-6 col-lg-${columnNumber} col-sm-6`} >
        {/* <p>{books.category}</p> */}
        <div className="product-wrap mb-25">
          <div className="product-img">
            <Link 
              to={`/productdetail/${book.productId}`}
            >
              <img className="default-img" src="assets/img/product/fashion/8.jpg" alt="" />
              <img className="hover-img" src="/assets/img/product/fashion/6.jpg" alt="" />
            </Link>
          </div>
          <div className="product-content text-center">
            <Link to={`/productdetail/${book.productId}`}></Link>
            <p className="productTitle"><b>[{categoryData[book.category]}]</b>{book.productName}</p>
            <div className="product-price">
              <span>{book.unitPrice}원</span>
            </div>
          </div>
        </div>
      </div>
    )}
  ).slice(0, sliceNumber);

  return(
    <div>
      <div className="row mt-5">
        {booklist}
      </div>
    </div>
  );
}