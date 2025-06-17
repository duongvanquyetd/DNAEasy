import React, { useEffect, useState } from 'react';
import { GetAppointmetnForStaff_Lab, GetAppointmetnForStaff_reception, GetYourAppointmentInProcess, ProcesstheAppointment, UpdateStatusAppointment } from '../../service/appointment';
import { AllowConfimAppointment, ConfirmSample, CreateSampleByAppointmentID, GetSampleByAppointmentId } from '../../service/sample';
import { GetcurentOrderProcess } from '../../service/processtesting';
import { CreateResult, UpdateResult } from '../../service/result';
import { ConfirmPaidByCash, PayAgaint, UpdatePaymentStatus } from '../../service/payment';
import '../css/YourAppointment.css'; // Ensure this points to the CSS file with the new class names
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

export const YourAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sampleform, setSampleform] = useState();
  const [statusform, setStatusfrom] = useState();
  const [Resultform, setResultform] = useState();
  const [nextStatus, setNextStatus] = useState('');
  const [errorSample, setErrorSample] = useState('');
  const [errorResult, setErrorResult] = useState('');
  const [cancelForm, setCancelForm] = useState('');
  const [cancelNote, setCancelNote] = useState('');
  const [typeService, setTypeService] = useState('');
  const rolename = localStorage.getItem('rolename') ? localStorage.getItem('rolename') : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let appointmentsData = [];

        if (rolename != null && rolename === "STAFF_LAB") {
          const res = await GetAppointmetnForStaff_Lab();
          console.log("STAFF_LAB response:", res);
          appointmentsData = res?.data || [];
        } else if (rolename != null && rolename === "STAFF_RECEPTION") {
          const res = await GetAppointmetnForStaff_reception();
          console.log("STAFF_LAB response:", res);
          appointmentsData = res?.data || [];
        } else {
          const res = await GetYourAppointmentInProcess();
          console.log("Customer+StaffLab response:", res);
          appointmentsData = res?.data || [];
        }

        const fullAppointments = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const [processRes, confirmRes, orderProcess] = await Promise.all([
              ProcesstheAppointment(appointment.appointmentId),
              AllowConfimAppointment({ appointmentId: appointment.appointmentId }),
              GetcurentOrderProcess(appointment.appointmentId),
            ]);

            return {
              ...appointment,
              statusNames: processRes.data.statusNames,
              Confimed: confirmRes.data,
              orderProcess: orderProcess.data,
            };
          })
        );

        setAppointments(fullAppointments);
        console.log("Appointments with details:", fullAppointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handelconfirm(appointment) {
    setNextStatus(appointment.Confimed.nextStatus);
    if (appointment.Confimed.formfor && appointment.Confimed.formfor === "Sample") {
      setSampleform(appointment.listSample);
      setTypeService(appointment.typeService)
    } else if (appointment.Confimed.formfor && appointment.Confimed.formfor === "Result") {
      console.log("Creating result for appointment:", appointment.appointmentId);
      CreateResult({ appoinmentId: appointment.appointmentId })
        .then((response) => {
          console.log("Result created successfully:", response.data);
          setResultform(response.data);
        }).catch((error) => {
          console.error("Error confirming samples:", error);
        });
    } else {
      setStatusfrom(appointment.listSample)
    }

    console.log("Appointment data:", appointment);
  }

  function handelpaytocash(appointment) {
    const updateappointment = { appointmentId: Number(appointment.appointmentId), status: 'PAID_CASH' };
    const formdata = new FormData();
    formdata.append(
      "appointmentUpdate",
      new Blob([JSON.stringify(updateappointment)], { type: "application/json" })
    );
    formdata.append("file", null)
    UpdateStatusAppointment(formdata).then((response) => {
      ConfirmPaidByCash(Number(appointment.appointmentId)).then((response) => {
        CreateSampleByAppointmentID({ appointmentId: updateappointment.appointmentId }).then((response) => {
          console.log(response.data)
          window.location.reload();
        }).catch((error) => {
          alert("loi create sample")
        })
      }).catch((error) => {
        alert("loi confirm payment")
      })
    }).catch((error) => {
      alert("loi cap nhap status")
    })
  }

  return (
    <>
      <Header />
      <div className="your-appointment">
        <div className="container">
          {/* Header Section */}
          <header>
            <div className="header-content">
            <h1>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Quản lý lịch hẹn
            </h1>
            <p>Theo dõi và quản lý các cuộc hẹn của bạn một cách dễ dàng</p>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h3>Đang tải dữ liệu...</h3>
              <p>Vui lòng chờ trong giây lát</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="appointment-grid">
              {appointments.map((appointment) => (
                <div key={appointment.appointmentId} className="appointment-card">
                  {/* Card Header */}
                  <div className="card-header">
                    <h5>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      {appointment.serviceName}
                      <span className="service-badge">{appointment.typeService}</span>
                    </h5>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    {/* Progress Section */}
                    {appointment.statusNames && appointment.statusNames.length > 0 && (
                      <div className="progress-section">
                        <div className="progress-title">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Tiến độ xử lý
                        </div>
                        <div className="progress-container">
                          <div className="progress-line"></div>
                          <div
                            className="progress-line-completed"
                            style={{ width: `${(appointment.orderProcess / (appointment.statusNames.length - 1)) * 95}%` }}
                          ></div>
                          <div className="progress-steps">
                            {appointment.statusNames.map((step, index) => {
                              const isCompleted = index < appointment.orderProcess;
                              const isCurrent = index === appointment.orderProcess;
                              return (
                                <div key={index} className="progress-step">
                                  <div className={`step-circle ${isCompleted ? 'completed' : isCurrent ? 'current' : 'pending'}`}>
                                    {isCompleted ? '✓' : index + 1}
                                  </div>
                                  <div className="step-label">{step}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Info Grid */}
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-label">Khách hàng</div>
                        <div className="info-value">{appointment.customerName}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Nhân viên</div>
                        <div className="info-value">{appointment.staffName}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Ngày lấy mẫu</div>
                        <div className="info-value">{new Date(appointment.dateCollect).toLocaleString()}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Địa điểm</div>
                        <div className="info-value">{appointment.location}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Loại thu thập</div>
                        <div className="info-value">{appointment.typeCollect}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Thanh toán</div>
                        <div className="info-value">
                          {appointment.paymentAmount.toLocaleString('vi-VN')} VND ({appointment.paymentMethod})
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="status-badge">
                      <span className={`status-badge ${appointment.curentStatusAppointment.includes('WAITING') ? 'waiting' : appointment.curentStatusAppointment.includes('PROCESSING') ? 'processing' : 'completed'}`}>
                        {appointment.curentStatusAppointment}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                      {(appointment.orderProcess === 0 || rolename === "STAFF_LAB" || rolename === "STAFF_TEST") && (
                        <button
                          className="btn cancel"
                          onClick={() => setCancelForm(appointment)}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Hủy lịch hẹn
                        </button>
                      )}

                      {appointment.Confimed.isallowCofirmation ? (
                        <button
                          className="btn confirm"
                          onClick={() => handelconfirm(appointment)}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {appointment.Confimed.nextStatus}
                        </button>
                      ) : (
                        appointment.curentStatusAppointment.includes('WAITING FOR PAYMENT') &&
                        appointment.paymentMethod.includes("VNPay") && (
                          <button
                            className="btn payment"
                            onClick={() => {
                              PayAgaint(appointment.appointmentId).then((response) => {
                                window.location.href = response.data;
                              });
                            }}
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            {appointment.Confimed.nextStatus}
                          </button>
                        )
                      )}

                      {appointment.paymentMethod.includes("Cash") && rolename === "STAFF_RECEPTION" && (
                        <button
                          className="btn confirm"
                          onClick={() => handelpaytocash(appointment)}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Xác nhận thanh toán
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon-container">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>Không có lịch hẹn nào</h3>
              <p>Hiện tại bạn chưa có lịch hẹn nào được tạo.</p>
            </div>
          )}
        </main>
      </div>

      {/* Status Form Modal */}
      {statusform && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Xác nhận trạng thái
              </h5>
              <button className="close-btn" onClick={() => setStatusfrom(null)}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formdata = new FormData();
                  const SampleArray = [];
                  const file = e.target["file"].files[0];

                  statusform.map((sample) => {
                    const sampleUpdate = {
                      sampleId: sample.sampleid,
                      cccd: sample.cccd,
                      name: sample.name,
                      relationName: sample.relationName,
                      sampleType: sample.sampleType,
                      nextStatusName: nextStatus,
                    }
                    console.log("sss", sampleUpdate)
                    SampleArray.push(sampleUpdate)
                  });
                  formdata.append(
                    "sampleUpdate",
                    new Blob([JSON.stringify(SampleArray)], { type: "application/json" })
                  );

                  if (file) {
                    formdata.append("file", file);
                  }
                  console.log("sampleupdate", formdata)
                  ConfirmSample(formdata).then((response) => {
                    console.log(response.data)
                    window.location.reload();
                  }).catch((error) => {
                    alert("loi khi huy ");
                  })
                }}
              >
                <div className="form-group">
                  <label className="form-label">File bằng chứng</label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="form-submit confirm"
                >
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Form Modal */}
      {cancelForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Xác nhận hủy lịch hẹn
              </h5>
              <button className="close-btn" onClick={() => setCancelForm(null)}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!cancelNote.trim()) return alert("Vui lòng nhập lý do hủy.");
                  const formdata = new FormData();
                  const file = e.target["file"].files[0];
                  console.log("aaaa", { appointmentId: cancelForm.appointmentId, note: cancelNote })
                  const appointmentUpdate = {
                    appointmentId: cancelForm.appointmentId,
                    note: cancelNote,
                    status: "CANCLE"
                  }
                  formdata.append(
                    "appointmentUpdate",
                    new Blob([JSON.stringify(appointmentUpdate)], { type: "application/json" })
                  );

                  if (file) {
                    formdata.append("file", file);
                  }

                  UpdateStatusAppointment(formdata).then((response) => {
                    console.log(response.data)
                    window.location.reload();
                  }).catch((error) => {
                    alert("loi khi huy ");
                  })
                }}
              >
                <div className="form-group">
                  <label className="form-label">Lý do hủy</label>
                  <textarea
                    className="form-control textarea"
                    value={cancelNote}
                    onChange={(e) => setCancelNote(e.target.value)}
                    required
                    rows="4"
                    placeholder="Vui lòng nhập lý do hủy lịch hẹn..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">File bằng chứng</label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="form-submit cancel"
                >
                  Xác nhận hủy
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Result Form Modal */}
      {Resultform && (
        <div className="modal">
          <div className="modal-content large">
            <div className="modal-header">
              <h5>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Xác nhận kết quả xét nghiệm
              </h5>
              <button className="close-btn" onClick={() => setResultform(null)}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData();

                  const resultDataArray = [];
                  const fileArray = [];

                  Resultform.forEach((result, index) => {
                    const resultId = result.resultId;
                    const conclusionResult = e.target[`conclusionResult-${index}`].value.trim();
                    const fileInput = e.target[`file-${index}`];
                    const file = fileInput.files[0];

                    if (!file || !conclusionResult) {
                      setErrorResult("Vui lòng điền đầy đủ thông tin");
                      return;
                    }

                    resultDataArray.push({
                      resultId: resultId,
                      conclustionResult: conclusionResult,
                    });
                    fileArray.push(file);
                  });

                  fileArray.forEach((file) => {
                    formData.append("file", file);
                  });

                  formData.append(
                    "result",
                    new Blob([JSON.stringify(resultDataArray)], { type: "application/json" })
                  );

                  UpdateResult(formData)
                    .then(() => {
                      setResultform(null);
                      window.location.reload();
                    })
                    .catch((error) => {
                      setErrorResult("Có lỗi xảy ra khi cập nhật kết quả");
                    });
                }}
              >
                {errorResult && (
                  <div className="error-message">
                    {errorResult}
                  </div>
                )}
                {Resultform.map((result, index) => (
                  <div key={index} className="result-item">
                    <div className="form-group">
                      <label className="form-label">
                        Kết luận xét nghiệm {index + 1}
                      </label>
                      <textarea
                        name={`conclusionResult-${index}`}
                        className="form-control textarea"
                        rows="4"
                        placeholder="Nhập kết luận xét nghiệm..."
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        File kết quả {index + 1}
                      </label>
                      <input
                        type="file"
                        name={`file-${index}`}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="form-submit confirm"
                >
                  Xác nhận
                </button>
              </form>
            </div>
          </div>
        </div>

      )}
    </div>
    <Footer />
    </>
  );
};