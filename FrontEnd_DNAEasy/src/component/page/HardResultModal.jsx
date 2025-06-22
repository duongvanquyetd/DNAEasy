import React, { useState, useEffect } from 'react';
import { GetMyInfor } from '../../service/user';
import { CreateHardResult } from '../../service/hardresult';
import "../css/HardResultModal.css"

const HardResultModal = ({ isOpen, onClose, resultlist }) => {
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        typeReceive: '',
    });


    const [errors, setErrors] = useState({});

    useEffect(() => {
        // If hard result already exists, close the modal
        console.log("response", resultlist)
        GetMyInfor().then((response) => {
            setFormData({
                phone: response.data.phone,
                address: response.data.address,
                typeReceive: ''
            })
        }).catch((errors) => {

            console.log("eroor", errors)
        })
        // if (booking?.result?.hardResult !== null) {
        //   onClose();
        // }
    }, [resultlist, onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number.';
        if (!formData.typeReceive) newErrors.typeReceive = 'Please select a delivery method.';
        if (formData.typeReceive === 'AT_HOME' && !formData.address.trim()) {
            newErrors.address = 'Please enter your delivery address.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let resultidArray = [];

            resultlist.forEach((result) => {
                resultidArray.push(result.resultId)
            })

            const submit = {
                resultid: resultidArray,
                phone: formData.phone,
                address: formData.address,
                type: formData.typeReceive
            }
            console.log("submit ", submit)
            CreateHardResult(submit).then((response) => {
                console.log("Sucessfull to create hardresult", response.data)
                 window.location.reload();
                onClose();
            }).catch((errors) => {
                console.log("error", errors)
            })


        }
    };

    if (!isOpen) return null;

 // ...existing code...
return (
    <div className="hard-modal-overlay" onClick={onClose}>
        <div className="hard-modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{textAlign: "center", marginBottom: "1rem"}}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#2563eb" opacity="0.08"/>
                    <path d="M8 17h8M8 13h8m-8-4h8m-9 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{color:"#2563eb", fontWeight:600, fontSize:"1.1rem", marginTop:"0.5rem"}}>
                    Receive your official hardcopy result
                </div>
                <div style={{color:"#64748b", fontSize:"0.98rem", marginTop:"0.2rem"}}>
                    Please fill in the information below to request your hardcopy.
                </div>
            </div>
            <form onSubmit={handleSubmit} className="hard-modal-form">
                <div className="hard-form-group">
                    <label className="hard-label">Phone number:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="hard-input"
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="hard-error">{errors.phone}</span>}
                </div>

                <div className="hard-form-group">
                    <label className="hard-label">Delivery method:</label>
                    <select
                        name="typeReceive"
                        value={formData.typeReceive}
                        onChange={handleChange}
                        className="hard-input"
                    >
                        <option value="">-- Select --</option>
                        <option value="AT_HOME">Home delivery</option>
                        <option value="AT_HOSPITAL">Pick up at hospital</option>
                    </select>
                    {errors.typeReceive && <span className="hard-error">{errors.typeReceive}</span>}
                </div>

                {formData.typeReceive === 'AT_HOME' && (
                    <div className="hard-form-group">
                        <label className="hard-label">Delivery address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="hard-input"
                            placeholder="Enter your delivery address"
                        />
                        {errors.address && <span className="hard-error">{errors.address}</span>}
                    </div>
                )}

                {formData.typeReceive === 'AT_HOSPITAL' && (
                    <div className="hard-form-group">
                        <label className="hard-label">Pickup address:</label>
                        <div className="hard-fixed-address">111 Lê Văn Việt, Thu Duc City</div>
                    </div>
                )}

                <div className="hard-modal-buttons">
                    <button type="submit" className="hard-btn hard-btn-blue">Confirm</button>
                    <button type="button" className="hard-btn hard-btn-white" onClick={onClose}>Close</button>
                </div>
            </form>
        </div>
    </div>
);
// ...existing code...
};

export default HardResultModal;
