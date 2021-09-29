import React, { useState} from 'react';

export default function TabMenu({setCategoryName}) {

  // const [ categoryData, setCategoryData ] = useState([]);
  
  const categoryData = ['전체보기', '소설', '시/에세이', '경제/경영', '자기계발', '인문', '역사/문화', '종교', '정치/사회', '예술/대중문화', '과학', '기술/공학', '컴퓨터/IT']

  // useEffect(() => {
  //     axios.get(`/catalog-service/catalogs/`)
  //     .then(res => {
  //         // console.log(res.data)
  //     })
  //     .then(data => {
  //         setCategoryData(data);
  //     })
  //     //.catch(error => console.log(error))
  // },[]);
  // console.log("categoryData", categoryData)
  
  const [ select , setSelect ] = useState(true);
  const [ active , setActive ] = useState(false);

  const handleClick = (e) => {
    let { key } = e.target
    setCategoryName(e.target.value);
    active ? setSelect(true) : setSelect(false);
  }

  return(
    <div className="row mb-5">
      <div className="col-12 nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
        {
          categoryData.map(item => (
            <button className ={active ? "nav-link active" : "nav-link"} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" 
              aria-selected={select} key={item} value={item} onClick={handleClick}>{item}
            </button>
          ))
        }
      </div>
    </div>
  );
}