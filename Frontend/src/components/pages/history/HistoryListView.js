import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HistoryListView({ data }) {
    const [newState, setNewState] = useState(data.orderState);

    const handleChange = e => {
        console.log(e.target.value);
        setNewState(e.target.value);
    }

    const state = ["결제 완료", "배송중", "배송 완료"]

    const handleSubmit = e => {
        e.preventDefault();
        // 선택된 status 백엔드에 반영 요청
        axios.put(`/order-service/orders/${data.orderId}/state/${newState}`,
            {},
            {
                headers: {
                    'Authorization': sessionStorage.token
                }
            })
            .then(res => {
                // console.log(res.data);
                setNewState(res.data.orderState);
                alert("변경")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <tr key={data.order_id}>
            <td className="order-id" aria-readonly>
                {data.orderId}
            </td>
            <td className="order-user-id">
                {data.userId}
            </td>
            <td className="order-UUID">
                {data.orderUuid}
            </td>
            <td className="order-product-name">
                <Link to={`/productdetail/${data.productId}`}>{data.productName}</Link>
            </td>
            <td className="order-product-qty">
                {data.qty}
            </td>
            <td className="order-date">
                {data.createdAt}
            </td>
            <td className="order-payment-plan">
                {data.paymentPlan}
            </td>
            <td className="order-status-select">
                {
                    sessionStorage.userId !== undefined && sessionStorage.email.includes('admin') ?
                        <select value={newState} onChange={handleChange}>
                            <option value="1">결제 완료</option>
                            <option value="2">배송 중</option>
                            <option value="3">배송 완료</option>
                        </select> :
                        <p>{state[newState-1]}</p>
                }
            </td>
            {
                sessionStorage.userId !== undefined && sessionStorage.email.includes('admin') ?
                    <td className="order-status-confirm">
                        <button type="submit" onClick={handleSubmit}>변경</button>
                    </td> :
                    null
            }

        </tr>
    );
}