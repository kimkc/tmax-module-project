import axios from "axios";

export default function PaymentForm({ orderItems, orderInfo, setOrderInfo }) {

	const handleChange = (e) => {
		const { name, value } = e.target;
		setOrderInfo({ ...orderInfo, [name]: value });
	}

	// 실제 주문 데이터 생성 요청
	const handleConfirmOrder = () => {
		// TODO: 서버 요청 전에 필수항목 누락 확인 중
		if (orderItems.length > 0 ) {
			// orderItems: 주문할 항목 리스트
			// orderInfo:  주문, 배송, 결제 정보

			// 주소 합치기
			if (orderInfo.addressMain && orderInfo.addressDetail)
				var recipientAddress = orderInfo.addressMain + ' ' + orderInfo.addressDetail;
				setOrderInfo({ ...orderInfo, recipientAddress: recipientAddress });
			// delete orderInfo['addressMain'];
			// delete orderInfo['addressDetail'];


			// 선택한 상품 목록 추가
			setOrderInfo({ ...orderInfo, cartList: orderItems });
			let url = `/order-service/${sessionStorage.userId}/orders`
			let order = {
				"cartList": orderItems,
				"recipientName": orderInfo.recipientName,
				"recipientAddress": orderInfo.addressMain + orderInfo.addressDetail,
				"recipientPhone": orderInfo.recipientPhone,
				"senderName": orderInfo.senderName,
				"senderPhone": orderInfo.senderPhone,
				"senderPassword": orderInfo.senderPassword,
				"paymentPlan" : 'debit'
			}
			var config = {
				headers:{
					"Content-Type" : "application/json",
					'Authorization' : sessionStorage.token
				}
			}
			axios.post(url, order, config)
			.then((res) => {
				alert("결제완료")
				window.location.href = '/'
			}).catch((err) => {
				console.log(err)
			})
			// console.log("info",orderInfo);
		}
	}
	
	return (
		<div className="card-body">
			<div className="myaccount-info-wrapper">
				<div className="row">
					<div className="col-lg-12 col-md-12">
						<div className="billing-info">
							<label>결제 방법</label>
							<ul className="payment-option" onChange={handleChange}>
								<li>
									<input type="radio" value="debit" name="paymentPlan" defaultChecked />
									<label>신용카드</label>
								</li>
								<li>
									<input type="radio" value="partner" name="paymentPlan" />
									<label>제휴할인카드</label>
								</li>
								<li>
									<input type="radio" value="skPay" name="paymentPlan" />
									<label>SK PAY</label>
								</li>
								<li>
									<input type="radio" value="kPay" name="paymentPlan" />
									<label>K PAY</label>
								</li>
								<li>
									<input type="radio" value="smilePay" name="paymentPlan" />
									<label>SMILE PAY</label>
								</li>
								<li>
									<input type="radio" value="naverPay" name="paymentPlan" />
									<label>NAVER PAY</label>
								</li>
								<li>
									<input type="radio" value="kakaoPay" name="paymentPlan" />
									<label>KAKAO PAY</label>
								</li>
								<li>
									<input type="radio" value="payco" name="paymentPlan" />
									<label>PAYCO</label>
								</li>
							</ul>
						</div>
						<button className="btn btn-secondary my-1" variant="primary" onClick={handleConfirmOrder}>
							결제하기
						</button>
					</div>
				</div>
			</div>
		</div>
	)

}