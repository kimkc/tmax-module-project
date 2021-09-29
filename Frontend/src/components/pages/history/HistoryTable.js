import { useEffect, useState } from "react";
import HistoryListView from "./HistoryListView";
import axios from 'axios';

export default function HistoryTable() {
  const date = new Date().toISOString().split('T')[0];
  const [searchInfo, setSearchInfo] = useState({ 'searchType': 'keyword' })
  const [searchType, setSearchType] = useState('keyword');
  const [historyDatas, setHistoryDatas] = useState([]);

  // 검색 키워드 change state에 반영
  const handleChange = e => {
    var { name, value } = e.target;
    setSearchInfo({ ...searchInfo, [name]: value });
    setSearchType(searchInfo.searchType);
  }

  // 검색 실행
  const handleKeywordSearch = (e) => {
    let type = searchInfo.searchType;
    console.log(`type:  ${type}, keyword: ${searchInfo.keyword}`);

    // 
    if (searchInfo.keyword)
      axios.post(`order-service/orders/${type}`,
        { value: `${searchInfo.keyword}` },
        {
          headers: {
            Authorization: sessionStorage.token
          }
        })
        .then(res => {
          setHistoryDatas(res.data);
        })
        .catch()
  }

  const handleDateSearch = (e) => {
    console.log(`start:  + ${searchInfo.start}`);
    console.log(`end: ' + ${searchInfo.end}`);
    if (searchInfo.start !== undefined && searchInfo.end !== undefined)
      axios.post(`/order-service/orders/date`,
        {
          start: searchInfo.start,
          end: searchInfo.end,
        },
        {
          headers: {
            'Authorization': sessionStorage.token
          }
        })
        .then(res => {
          setHistoryDatas(res.data);
        })
        .catch()
  }

  useEffect(() => {
    // 세션 정보별 사용자/관리자 구분
    if (sessionStorage.userId !== undefined && sessionStorage.email.includes("admin")) {
      axios.get(`/order-service/orders`,
        {
          headers: {
            Authorization: sessionStorage.token
          }
        })
        .then(res => {
          console.log(res.data);
          setHistoryDatas(res.data);
        })
        .catch()
    }
    else {
      axios.get(`/order-service/${sessionStorage.userId}/orders`,
        {
          headers: {
            Authorization: sessionStorage.token
          }
        })
        .then(res => {
          console.log(res.data);
          setHistoryDatas(res.data);
        })
        .catch()
    }
  }, []);

  return (
    // 세션 정보 확인하여 선택적 렌더링 
    <div className="cart-main-area pt-90 pb-100">
      <div className="container">
        <h3 className="cart-page-title">Order History</h3>
        <div className="order-search-box mb-1 row col-12">
          <select className="col-2 align-middle" name="searchType" value={searchType} onChange={handleChange}>
            <option value="id">주문UUID</option>
            <option value="keyword">상품이름</option>
          </select>
          <input className="col-2" type="text" name="keyword" onChange={handleChange} />
          <button className="col-1" type="button" onClick={handleKeywordSearch}>검색</button>
          <label className="col-1 col-offset-1">날짜</label>
          <input className="col-2" type="date" name="start" min="2018-01-01" max={date} onChange={handleChange} />
          ~
          <input className="col-2" type="date" name="end" min="2018-01-01" max={date} onChange={handleChange} />
          <button className="col-1" type="button" onClick={handleDateSearch}>검색</button>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="table-content table-responsive cart-table-content">
              <table>
                <thead>
                  <tr>
                    <th>주문 번호</th>
                    <th>주문인 ID</th>
                    <th>주문 UUID</th>
                    <th>주문 상품</th>
                    <th>주문 수량</th>
                    <th>주문 일자</th>
                    <th>결제 수단</th>
                    <th>주문 상태</th>
                    {
                      sessionStorage.userId !== undefined && sessionStorage.email.includes('admin') ?
                        <th>주문 상태 변경</th> :
                        null
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    historyDatas.map(item => (
                      <HistoryListView
                        data={item}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
