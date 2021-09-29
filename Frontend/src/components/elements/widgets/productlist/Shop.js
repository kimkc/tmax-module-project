import { Fragment, useState } from "react";
import ProductViews from "../product/ProductViews";

export default function Shop({categoryName}) {

  const [ sliceNumber, setSliceNumber ] = useState(15);
  const [ columnNumber, setColumnNumber ] = useState(4);
  const [ onActive, setOnActive ] = useState(false);
  
  const handleLayout = (sln, coln) => {
    setSliceNumber(sln)
    setColumnNumber(coln)
    setOnActive(!onActive)
  }

  return(
    <Fragment>
      <div className="col-lg-9 order-1 order-lg-2">
        <div className="shop-top-bar mb-35">
          <div className="select-shoing-wrap">
            <div className="shop-select">
              <select>
                <option value="default">Default</option>
                <option value="priceHighToLow">Price - High to Low</option>
                <option value="priceLowToHigh">Price - Low to High</option>
              </select>
            </div>
          </div>

          <div className="shop-tab">
            <button className={ onActive ? "active" : ""} onClick={()=> onActive ? "" : handleLayout(10,6)}><i className="fa fa-th-large"></i></button>
            <button className={ onActive ? "" : "active"} onClick={()=> onActive ? handleLayout(15,4) : ""}><i className="fa fa-th"></i></button>
          </div>
        </div>

        <div className="shop-bottom-area mt-35">
          <div className="row grid three-column">
            <ProductViews />
            <s 
              sliceNumber = {sliceNumber}
              columnNumber = {columnNumber}
              categoryName = {categoryName}
            />
          </div>
        </div>

        <div className="pro-pagination-style text-center mt-30">
          <ul className="mb-0 mt-0">
            <li className="page-item active"><button className="page-link">1</button></li>
          </ul>
          <p>Showing 15 of 144 result</p>
        </div>
      </div>
    </Fragment>                       
  );
}