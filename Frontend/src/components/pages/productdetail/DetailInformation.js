import React from 'react';

export default function DetailInformation({content}) {
  return(
    <div className="description-review-area pb-90">
      <div className="container">
        <div className="col-lg-12">
          <div className="review-wrapper">
            <div className="review-left">
              <div className="review-name">
                <h4>책 소개</h4>
              </div>
            </div>
            <div className="review-bottom">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}