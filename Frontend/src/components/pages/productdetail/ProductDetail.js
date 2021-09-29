import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';

import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from './Bread';
import DetailInformation from './DetailInformation';
import AddBuyAndCart from '../../elements/widgets/product/productTop/AddBuyAndCart';

export default function ProductDetail() {

  const newUrl = window.location.pathname.split('/')[2];
  
  const [ books, setbooks ] = useState([]);
  const categoryData = ['전체보기', '소설', '시/에세이', '경제/경영', '자기계발', '인문', '역사/문화', '종교', '정치/사회', '예술/대중문화', '과학', '기술/공학', '컴퓨터/IT']

  useEffect(() => {
    axios.get(`/catalog-service/catalogs/client/${newUrl}`)
    .then(res => {
      setbooks(res.data);
    })
    .catch()
  })

  return(
    <Fragment>
      <Header />
      <Bread
        productName = {books.productName}
        productUrl = {`/productdetail/${books.productId}`} 
      />
      <div className="shop-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product-large-image-wrapper">
                <div className="swiper-container swiper-container-fade swiper-container-initialized swiper-container-horizontal">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="1" style={{width: "570px", opacity: "1"}}>
                      <div className="single-image">
                        <img src="/assets/img/product/fashion/7.jpg" className="img-fluid" alt=""/>
                      </div>
                    </div>
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="product-details-content ml-70">
                {
                  sessionStorage.userId !== undefined && sessionStorage.email.includes('admin') ?
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <button><a href="/">주문내역</a></button>
                        <button><a href="/productnew">수정</a></button>
                        <button>삭제</button>
                      </div>
                    </div> : null 
                }
                {/* pro-det-rgt-top */}
                <h2>{books.productName}</h2>
                <div className="product-details-price">
                  <span>{books.unitPrice}원</span>
                </div>
                <div className="pro-details-list">
                  <p>{books.content}</p>
                </div>

                {/* <ProDetRgtMiddle /> */}
                <AddBuyAndCart 
                  stock = {books.stock}
                  productId = {books.productId}
                  unitPrice = {books.unitPrice}
                />
                {/* <ProDetRgtBottom /> */}
                <div className="pro-details-meta">
                  <span>카테고리 : {categoryData[books.category]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailInformation content = {books.content}/>
      <Footer />
    </Fragment>
  );
}