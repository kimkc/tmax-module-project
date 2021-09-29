import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-bootstrap/Modal';

export default function ShipmentForm({ orderInfo, setOrderInfo }) {
	
	const [show, setShow] = useState(false);
	const [addressMain, setAddressMain] = useState('');

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleComplete = (data) => {
		var fullAddress = data.address;
		var extraAddress = '';
		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
			}
			fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
		}
		setAddressMain(fullAddress);
		setOrderInfo({ ...orderInfo, addressMain: fullAddress });
		handleClose();
	}

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
							<label>받는 사람 이름</label>
							<input
								type="text"
								name="recipientName"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="col-lg-12 col-md-12">
						<div className="billing-info">
							<button className="btn btn-secondary my-1" variant="primary" onClick={handleShow}>
								주소 찾기
							</button>
							<Modal className="modal" show={show} onHide={handleClose}>
								<Modal.Header className="modal-header" closeButton>
									<Modal.Title>
										<h4 className="data-wrapper">주소 찾기</h4>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body className="modal-body">
									<DaumPostcode autoClose onComplete={handleComplete} />
								</Modal.Body>
							</Modal>
							<div className="billing-info">
								<label>주소</label>
								<input
									type="text"
									name="addressMain"
									value={addressMain}
									readOnly
								/>
							</div>
							<div className="billing-info">
								<label>상세 주소</label>
								<input
									type="text"
									name="addressDetail"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
					<div className="col-lg-12 col-md-12">
						<div className="billing-info">
							<label>휴대 전화 번호</label>
							<input
								type="tel"
								name="recipientPhone"
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}