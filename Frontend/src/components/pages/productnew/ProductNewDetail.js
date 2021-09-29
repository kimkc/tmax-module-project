import axios from "axios";
import React, { useState } from "react";

export default function ProductNewDetail() {

  const [ values, setValues ] = useState({
    productName : '',
    category : '',
    writer : '',
    translator : '',
    publishingCompany : '',
    publishDate : '',
    content : '',
    unitPrice : '',
    deliveryFee : '',
    stock : '',
    pages : '',
    weight : '',
    size : '',
    isbn10 : '',
    isbn13 : ''
  })
  
  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  
  // const [ imgBase64, setImgBase64 ] = useState([])
  // const [ imgFile, setImgFile ] = useState(null)

  // const handleChangeFile = (event) => {
  //   console.log(event.target.files)
  //   setImgFile(event.target.files);
  //   // fd.append("file", event.target.files)
  //   setImgBase64([]);
  //   for(var i=0;i<event.target.files.length;i++){
  //     if (event.target.files[i]) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //       // 파일 상태 업데이트
  //       reader.onloadend = () => {
  //         // 2. 읽기가 완료되면 아래코드가 실행됩니다.
  //         const base64 = reader.result;
  //         console.log(base64)
  //         if (base64) {
  //         //  images.push(base64.toString())
  //         var base64Sub = base64.toString()
            
  //         setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
  //         //  setImgBase64(newObj);
  //           // 파일 base64 상태 업데이트
  //         //  console.log(images)
  //         }
  //       }
  //     }
  //   }
  // }
  
  const productcreate = (e) => {
    e.preventDefault();
    let url = '/catalog-service/catalogs'
    let Product = {
      'productName' : values.productName,
      // 'files' : imgBase64[0],
      'category' : values.category,
      'writer' : values.writer,
      'translator' : values.translator,
      'publishingCompany' : values.publishingCompany,
      'publishDate' : values.publishDate,
      'content' : values.content,
      'unitPrice' : values.unitPrice,
      'deliveryFee' : values.deliveryFee,
      'stock' : values.stock,
      'pages' : values.pages,
      'weight' : values.weight,
      'size' : values.size,
      'isbn10' : values.isbn10,
      'isbn13' : values.isbn13
    }
    var config={
      headers:{
        // 'Content-Type' : 'multipart/form-data',
        'Content-Type' : 'application/json',
        'Authorization': sessionStorage.token
      }
    };
    axios.post(url, Product, config)
    .then((res)=>{
      alert("상품등록완료")
      console.log(res);
    }).catch(err => {
      alert("상품등록실패")
      console.log(err);
    })
  }

  return (
    <div className="shop-area pt-100 pb-100">
      <div className="container">
        <form onSubmit={productcreate}>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <label>책 제목</label>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="책 제목을 입력하세요" name="productName" value={values.productName} onChange={handleChangeForm}/>
                  </div>
                </div>
              </div>
              {/* <div className="product-large-image-wrapper">
                <div className="swiper-container swiper-container-fade swiper-container-initialized swiper-container-horizontal">
                  <div className="swiper-wrapper">
                    <div classN ame="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="1" style={{width: "0px", opacity: "1"}}>
                      <div className="single-image">
                        <img src="/assets/img/product/fashion/7.jpg" className="img-fluid" alt=""/>
                      </div>
                    </div>
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div> */}
                {/* <div>
                  <label className="file-upload" id="file-drag">
                    이미지 등록
                  </label>
                  <input type="file" onChange={handleChangeFile} />
                </div> */}
              {/* </div> */}
              <div>
                <label>책 카테고리</label>
                <select className="form-select" aria-label="Default select example" name="category" value={values.category} onChange={handleChangeForm}>
                  <option selected>선택</option>
                  <option value="0">전체보기</option>
                  <option value="1">소설</option>
                  <option value="2">시/에세이</option>
                  <option value="3">경제/경영</option>
                  <option value="4">자기계발</option>
                  <option value="5">인문</option>
                  <option value="6">역사/문화</option>
                  <option value="7">종교</option>
                  <option value="8">정치/사회</option>
                  <option value="9">예술/대중문화</option>
                  <option value="10">과학</option>
                  <option value="11">기술/공학</option>
                  <option value="12">컴퓨터/IT</option>
                </select>
              </div>

              {/* ProNewDetForm에 map 돌려서 수정할 것 */}
              <div>
                <label>글쓴이</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="writer" value={values.writer} onChange={handleChangeForm}/>
                </div>
              </div>  
              <div>
                <label>옮긴이</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="translator" value={values.translator} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>출판사</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="publishingCompany" value={values.publishingCompany} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>출간일</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="연-월-일로 입력해주세요." name="publishDate" value={values.publishDate} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>책 내용</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="content" value={values.content} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>가격</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="unitPrice" value={values.unitPrice} onChange={handleChangeForm}/>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div>
                <label>배송비</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="deliveryFee" value={values.deliveryFee} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>재고</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="stock" value={values.stock} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>쪽수</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="pages" value={values.pages} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>무게</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="weight" value={values.weight} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>크기</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="size" value={values.size} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>ISBN10</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="isbn10" value={values.isbn10} onChange={handleChangeForm}/>
                </div>
              </div>
              <div>
                <label>ISBN13</label>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="입력해주세요." name="isbn13" value={values.isbn13} onChange={handleChangeForm}/>
                </div>
              </div>

              <button type="submit">저장</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}