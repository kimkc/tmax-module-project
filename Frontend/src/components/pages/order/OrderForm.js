import React from 'react';

export default function OrderForm({ orderInfo, setOrderInfo }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderInfo({ ...orderInfo, [name]: value });
    }

    return (
        <div className="card-body">
            <div className="myaccount-info-wrapper">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>주문하는 사람 이름</label>
                            <input
                                type="text"
                                name="senderName"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>휴대 전화 번호</label>
                            <input
                                type="tel"
                                name="senderPhone"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>주문 비밀번호</label>
                            <input
                                type="password"
                                name="senderPassword"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}