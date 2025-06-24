import React, { useState, useEffect } from 'react';
import '../css/Transaction.css'; // CSS file for modal overlay
import { CreateRefund } from '../../service/payment';

const TransactionModal = ({ isOpen, onClose, booking }) => {
  const [formData, setFormData] = useState({
    contentPayment: '',
    paymentAmount: '',
    paymentMethod: '',
    transferImage: null,
    payCode: '',
  });
  const [er,setEr] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (booking) {
      setFormData({
        paymentAmount: booking.paymentAmount,
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'transferImage') {
      setFormData({ ...formData, transferImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.contentPayment.trim()) newErrors.contentPayment = 'Please enter the payment description.';
    if (!formData.paymentAmount) newErrors.paymentAmount = 'Please enter the amount.';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method.';
    if (!formData.transferImage) newErrors.transferImage = 'Please upload a transfer image.';
    if (!formData.payCode) newErrors.payCode = 'Please enter a transaction code.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {

      const transaction = new FormData();

      const payment = {
        appointmentId: booking.appointmentId,
        paymentMethod: formData.paymentMethod,
        contenPayment: formData.contentPayment,
        paymentAmount: formData.paymentAmount,
        paycode: formData.payCode
      }

      transaction.append("payment", new Blob([JSON.stringify(payment)], { type: "application/json" }))
      transaction.append("file", formData.transferImage)
      console.log('Submitted data:', formData, transaction, booking);
      CreateRefund(transaction).then((response) => {
        console.log("Create Refund Transaction sucessfully", response.data);
        onClose();
        window.location.reload();

      }).catch((errors) => {

        if(errors.response.data)
        {
          setEr(errors.response.data.error)
          
        }
        console.log(errors.response.data)
        
      })



    }
  };

  // ...existing code...
  if (!isOpen) return null;

  return (
    <div className="modal-overlay transaction-modal-overlay">
      <div className="modal-content transaction-modal-content">
        <div className="transaction-modal-header">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#2563eb" opacity="0.08" />
            <path d="M8 17h8M8 13h8m-8-4h8m-9 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2>Refund Transaction</h2>
          <div className="transaction-modal-subtitle">
            Please fill in the information below to process your refund.
          </div>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="transaction-modal-form">
          <div className="transaction-form-group">
            <label>Transaction Code:</label>
            <input
              type="text"
              name="payCode"
              value={formData.payCode}
              onChange={handleChange}
              className="transaction-input"
              placeholder="Enter pay code"
            />
            {errors.payCode && <span className="transaction-error">{errors.payCode}</span>}
          </div>
          <div className="transaction-form-group">
            <label>Transaction Description:</label>
            <input
              type="text"
              name="contentPayment"
              value={formData.contentPayment}
              onChange={handleChange}
              className="transaction-input"
              placeholder="Enter payment description"
            />
            {errors.contentPayment && <span className="transaction-error">{errors.contentPayment}</span>}
          </div>

          <div className="transaction-form-group">
            <label>Transaction Amount:</label>
            <input
              type="number"
              name="paymentAmount"
              value={formData.paymentAmount}
              onChange={handleChange}
              className="transaction-input"
              placeholder="Enter amount"
            />
            {errors.paymentAmount && <span className="transaction-error">{errors.paymentAmount}</span>}
          </div>

          <div className="transaction-form-group">
            <label>Transaction Method:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="transaction-input"
            >
              <option value="">-- Select --</option>
              <option value="Bank">Bank</option>
              <option value="VNPay">VNPay</option>
              <option value="Cash">Cash</option>
            </select>
            {errors.paymentMethod && <span className="transaction-error">{errors.paymentMethod}</span>}
          </div>

          <div className="transaction-form-group">
            <label>Transfer Image:</label>
            <input
              type="file"
              name="transferImage"
              accept="image/*"
              onChange={handleChange}
              className="transaction-input"
            />
            {errors.transferImage && <span className="transaction-error">{errors.transferImage}</span>}
          </div>

          <div className="modal-buttons transaction-modal-buttons">
            <button type="submit" className="transaction-btn transaction-btn-blue">Submit</button>
            <button type="button" className="transaction-btn transaction-btn-white" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
  // ...existing code...
};

export default TransactionModal;
