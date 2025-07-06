import React, { useEffect, useState } from 'react';
import { CanRefund, GetAppointmetnForStaff_Lab, GetAppointmetnForStaff_reception, GetYourAppointmentInProcess, ProcesstheAppointment, UpdateStatusAppointment } from '../../service/appointment';
import { AllowConfimAppointment, ConfirmSample, CreateSampleByAppointmentID, GetSampleByAppointmentId } from '../../service/sample';
import { GetcurentOrderProcess } from '../../service/processtesting';
import { CreateResult, UpdateResult } from '../../service/result';
import { ConfirmPaidByCash, PayAgaint, UpdatePaymentStatus } from '../../service/payment';
import '../css/YourAppointment.css'; // Ensure this points to the CSS file
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import TransactionModal from './TransactionModal.jsx';

export const YourAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sampleform, setSampleform] = useState();
  const [statusform, setStatusform] = useState();
  const [resultform, setResultform] = useState();
  const [nextStatus, setNextStatus] = useState('');
  const [errorSample, setErrorSample] = useState('');
  const [errorResult, setErrorResult] = useState('');
  const [cancelForm, setCancelForm] = useState('');
  const [cancelNote, setCancelNote] = useState('');
  const [typeService, setTypeService] = useState('');
  const [refunForm, setRefunForm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [totalPages, setTotalPages] = useState(0);
  const rolename = localStorage.getItem('rolename') ? localStorage.getItem('rolename') : null;
  const [keysearch, setkeysearch] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        let appointmentsData = [];

        // if (rolename != null && rolename === "STAFF_LAB") {
        //   const res = await GetAppointmetnForStaff_Lab();
        //   console.log("STAFF_LAB response:", res);
        //   appointmentsData = res?.data || [];
        // } else if (rolename != null && rolename === "STAFF_RECEPTION") {
        //   const res = await GetAppointmetnForStaff_reception();
        //   console.log("STAFF_RECEPTION response:", res.data);
        //   appointmentsData = res?.data || [];
        // } else {
        const res = await GetYourAppointmentInProcess(currentPage, pageSize, keysearch);

        setTotalPages(res.data.totalPages)
        console.log("Appointmnet Reponse:", res.data);
        appointmentsData = res?.data?.content || [];
        // }

        const fullAppointments = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const [processRes, confirmRes, orderProcess, canrefund] = await Promise.all([
              ProcesstheAppointment(appointment.appointmentId),
              AllowConfimAppointment({ appointmentId: appointment.appointmentId }),
              GetcurentOrderProcess(appointment.appointmentId),
              CanRefund(appointment.appointmentId),
            ]);

            return {
              ...appointment,
              statusNames: processRes.data.statusNames,
              Confimed: confirmRes.data,
              orderProcess: orderProcess.data,
              listStatusTime: appointment.listSample && appointment.listSample[0] && appointment.listSample[0].sampleTracking ? appointment.listSample[0].sampleTracking : null,
              canrefund: canrefund.data
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
  }, [currentPage, keysearch]);

  function handleConfirm(appointment) {
    setNextStatus(appointment.Confimed.nextStatus);
    if (appointment.Confimed.formfor && appointment.Confimed.formfor === "Sample") {
      setSampleform(appointment.listSample);
      setTypeService(appointment.typeService);
    } else if (appointment.Confimed.formfor && appointment.Confimed.formfor === "Result") {
      console.log("Creating result for appointment:", appointment.appointmentId);
      CreateResult({ appoinmentId: appointment.appointmentId })
        .then((response) => {
          console.log("Result created successfully:", response.data);
          setResultform(response.data);
        })
        .catch((error) => {
          console.error("Error confirming samples:", error);
        });
    } else {
      setStatusform(appointment.listSample);
    }
    console.log("Appointment data:", appointment);
  }

  function handlePayToCash(appointment) {
    const updateappointment = { appointmentId: Number(appointment.appointmentId), status: 'PAID_CASH' };
    const formdata = new FormData();
    formdata.append(
      "appointmentUpdate",
      new Blob([JSON.stringify(updateappointment)], { type: "application/json" })
    );
    formdata.append("file", null);
    UpdateStatusAppointment(formdata)
      .then((response) => {
        ConfirmPaidByCash(Number(appointment.appointmentId))
          .then((response) => {
            CreateSampleByAppointmentID({ appointmentId: updateappointment.appointmentId })
              .then((response) => {
                console.log(response.data);
                window.location.reload();
              })
              .catch((error) => {
                alert("Lỗi create sample");
              });
          })
          .catch((error) => {
            alert("Lỗi confirm payment");
          });
      })
      .catch((error) => {
        alert("Lỗi cập nhật status");
      });
  }
  function handleCashToView(booking) {
    const Updatepayment = {
      appointmentId: booking.appointmentId,
      paymentMehtod: "Cash"
    };
    UpdatePaymentStatus(Updatepayment).then((response) => {
      console.log("update", response.data);
      window.location.reload();
    }).catch((error) => {
      console.log(error.data);
    });
  }
  const renderPagination = (total, current, setPage) => (
    <div className="pagination-yourappointment">
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          className={`page-button ${i === current ? 'active' : ''}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );
  return (
    <>
      <Header />
      <div className="your-appointment">
        <div className="container">
          Header Section
          <header>
            <div className="header-content">
             
              <h1>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Appointment Management
              </h1>
              <p>Track and manage your appointments easily</p>
            </div>
          </header>
          <div className='search-bar-wrapper'>
            <form
              className="search-bar-form"
              onSubmit={e => {
                e.preventDefault();
                setCurrentPage(1);
              }}
            >
              <input
                type="text"
                placeholder="Search appointments..."
                value={keysearch}
                onChange={e => {
                  setkeysearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
              />
              <button type="submit" className="searchBtn">
                Search
              </button>
            </form>
          </div>

          {/* Main Content */}
          <main>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <h3>Loading data...</h3>
                <p>Please wait a moment</p>
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
                      <div className="progress-container">
                        <div className="progress-line"></div>
                        <div
                          className="progress-line-completed"
                          style={{ width: `${(appointment.orderProcess / (appointment.statusNames.length - 1)) * 95}%` }}
                        ></div>

                        {/* Row 1: Step circle + label */}
                        <div className="progress-steps progress-steps-row">
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

                        {/* Row 2: Step time under each column */}

                        {appointment.listStatusTime && (

                          <div className="progress-steps progress-time-row">
                            {appointment.statusNames.map((step, index) => {
                              const matched = appointment.listStatusTime.find(s => s.nameStatus === step);
                              const time = matched ? new Date(matched.sampleTrackingTime) : null;

                              return (
                                <div key={index} className="step-time-box">
                                  {time ? (
                                    <>
                                      <div className="time-icon">🕒</div>
                                      <div className="time-value">{time.toLocaleTimeString()}</div>
                                      <div className="date-icon">📅</div>
                                      <div className="date-value">{time.toLocaleDateString('en-GB')}</div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="time-icon">🕒</div>
                                      <div className="time-value">--:--:--</div>
                                      <div className="date-icon">📅</div>
                                      <div className="date-value">Not updated</div>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                        )}

                      </div>


                      {/* Info Grid */}
                      <div className="info-grid">
                        <div className="info-item">
                          <div className="info-label">Customer</div>
                          <div className="info-value">{appointment.customerName}</div>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Staff</div>
                          <div className="info-value">{appointment.staffName ? appointment.staffName : "is assigning"}</div>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Sample Collection Date</div>
                          <div className="info-value">{new Date(appointment.dateCollect).toLocaleString()}</div>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Location</div>
                          <div className="info-value">{appointment.location}</div>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Collection Type</div>
                          <div className="info-value">{appointment.typeCollect}</div>
                        </div>
                        <div className="info-item">
                          <div className="info-label">Payment</div>
                          <div className="info-value">
                            {appointment.paymentAmount.toLocaleString('en-US')} VND ({appointment.paymentMethod})
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
                        {((appointment.orderProcess === 0 && rolename === "CUSTOMER") || rolename === "STAFF_LAB" || rolename === "STAFF_TEST") && (
                          <button
                            className="btn cancel"
                            onClick={() => setCancelForm(appointment)}
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel appointment
                          </button>
                        )}

                        {appointment.Confimed.isallowCofirmation && appointment.staffName ? (
                          <button
                            className="btn confirm"
                            onClick={() => handleConfirm(appointment)}
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

                        {appointment.paymentMethod.includes("Cash") && rolename === "STAFF_RECEPTION" && appointment.curentStatusAppointment === "WAITING FOR PAYMENT" && (
                          <button
                            className="btn confirm"
                            onClick={() => handlePayToCash(appointment)}
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Confirm payment
                          </button>
                        )}

                        {rolename === "STAFF_RECEPTION" && appointment.curentStatusAppointment === "COMPLETE" ? (

                          <button
                            onClick={() => handleCashToView(appointment)}
                            className="btn confirm"
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Pay by cash to view result
                          </button>

                        ) : appointment.canrefund && (

                          <button
                            onClick={() => setRefunForm(true)}
                            className="btn confirm"
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Refund for CANCLE
                          </button>


                        )}

                        <TransactionModal
                          isOpen={refunForm}
                          onClose={() => setRefunForm(false)}
                          booking={appointment}
                        ></TransactionModal>

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
                <h3>No appointments found</h3>
                <p>You have not created any appointments yet.</p>
              </div>
            )}
          </main>
        </div >

        {/* Status Form Modal */}
        {
          statusform && (
            <div className="modal">
              <div className="modal-content-yourappoint">
                <div className="modal-header">
                  <h5>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Confirm status
                  </h5>
                  <button className="close-btn" onClick={() => setStatusform(null)}>
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
                        };
                        console.log("sss", sampleUpdate);
                        SampleArray.push(sampleUpdate);
                      });
                      formdata.append(
                        "sampleUpdate",
                        new Blob([JSON.stringify(SampleArray)], { type: "application/json" })
                      );

                      if (file) {
                        formdata.append("file", file);
                      }
                      console.log("sampleupdate", formdata);
                      ConfirmSample(formdata)
                        .then((response) => {
                          console.log(response.data);
                          window.location.reload();
                        })
                        .catch((error) => {
                          alert("Error while confirming");
                        });
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label">Proof file</label>
                      <input type="file" name="file" className="form-control" />
                    </div>
                    <button type="submit" className="form-submit confirm">
                      Confirm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }
        {/* Cancel Form Modal */}
        {
          cancelForm && (
            <div className="modal">
              <div className="modal-content-yourappoint">
                <div className="modal-header">
                  <h5>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Confirm cancellation
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
                      if (!cancelNote.trim()) return alert("Please enter a cancellation reason.");
                      const formdata = new FormData();
                      const file = e.target["file"].files[0];
                      console.log("aaaa", { appointmentId: cancelForm.appointmentId, note: cancelNote });
                      const appointmentUpdate = {
                        appointmentId: cancelForm.appointmentId,
                        note: cancelNote,
                        status: "CANCLE",
                      };
                      formdata.append(
                        "appointmentUpdate",
                        new Blob([JSON.stringify(appointmentUpdate)], { type: "application/json" })
                      );

                      if (file) {
                        formdata.append("file", file);
                      }

                      UpdateStatusAppointment(formdata)
                        .then((response) => {
                          console.log(response.data);
                          window.location.reload();
                        })
                        .catch((error) => {
                          alert("Error while cancelling");
                        });
                    }}
                  >
                    <div className="form-group">
                      <label className="form-label">Cancellation reason</label>
                      <textarea
                        className="form-control textarea"
                        value={cancelNote}
                        onChange={(e) => setCancelNote(e.target.value)}
                        required
                        rows="4"
                        placeholder="Please enter the reason for cancelling the appointment..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Proof file</label>
                      <input type="file" name="file" className="form-control" />
                    </div>
                    <button type="submit" className="form-submit cancel">
                      Confirm cancellation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }

        {/* Result Form Modal */}

        {
          resultform && (
            <div className="modal">
              <div className="modal-content-yourappoint">
                <div className="modal-header">
                 
                    <h5 className="modal-title">Confirm test result</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setResultform(null)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                            setErrorResult(""); 
                        const formData = new FormData();

                        const resultDataArray = [];
                        const fileArray = [];

                        resultform.forEach((result, index) => {

                          const resultId = result.resultId;
                          const conclusionResult = result.relationName ? e.target[`conclusionResult-${index}`].value.trim() : null;
                          const fileInput = e.target[`file-${index}`];
                          const file = fileInput.files[0];

                          if (!file || (result.relationName && !conclusionResult)) {
                            setErrorResult("Please enter all fields");
                            return;
                          }

                          resultDataArray.push({
                            resultId: resultId,
                            conclustionResult: conclusionResult,
                          });
                          fileArray.push(file);
                        });

                        // Append each file with the key "file"
                        fileArray.forEach((file) => {
                          formData.append("file", file);
                        });

                        // Append results (as a JSON array)
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
                            console.error("Error updating results:", error);

                          });
                      }}
                    >
                      {resultform.map((result, index) => (
                        <div key={result.resultId} className="mb-4 border-bottom pb-3">

                          {result.relationName && (
                            <p><strong>Relationship:</strong> {result.relationName}</p>

                          )}

                          <p><strong>Sample code:</strong> {result.samplecode}</p>
                          <div className="mb-2">
                            <label className="form-label">Upload result file</label>
                            <input
                              type="file"
                              name={`file-${index}`}
                              className="form-control"
                              required
                            />
                          </div>
                          {result.relationName && (
                            <div className="mb-2">
                              <label className="form-label">Conclusion</label>
                              <select
                                name={`conclusionResult-${index}`}
                                className="form-select"
                                required
                              >
                                <option value="">-- Select conclusion --</option>
                                <option value="Consanguineous">Consanguineous (Biological relationship)</option>
                                <option value="Not Consanguineous">Not Consanguineous (No biological relationship)</option>
                              </select>
                            </div>

                          )}

                        </div>
                      ))}
                      <p><strong>{errorResult && <div className='text-danger' > {errorResult}</div>}</strong></p>
                      <button type="submit" className="btn btn-primary">Confirm all</button>
                    </form>
                  </div>
                </div>
              </div>
           
          )
        }

        {/* Sample Form Modal */}
        {
          sampleform && (
            <div className="modal">
              <div className="modal-content-yourappoint large">
                <div className="modal-header">
                  <h5>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Confirm sample information
                  </h5>
                  <button className="close-btn" onClick={() => setSampleform(null)}>
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
                      const SampleArray = [];
                      const file = e.target["file"].files[0];

                      sampleform.forEach((sample, index) => {
                        const sampleUpdate = {
                          sampleId: sample.sampleid,
                          cccd: typeService === "legal" ? e.target[`cccd-${index}`].value.trim() : null,
                          name: e.target[`name-${index}`].value.trim(),

                          relationName: sampleform.length > 1 ? e.target[`relationName-${index}`].value.trim() : null,
                          sampleType: e.target[`sampleType-${index}`].value,
                          nextStatusName: nextStatus,
                        };

                        if (!sampleUpdate.name || (sampleform.length > 1 && !sampleUpdate.relationName) || !sampleUpdate.sampleType) {
                          setErrorSample("Please input all fields");
                          return;
                        }

                        SampleArray.push(sampleUpdate);
                      });

                      formData.append(
                        "sampleUpdate",
                        new Blob([JSON.stringify(SampleArray)], { type: "application/json" })
                      );

                      if (file) {
                        formData.append("file", file);
                      }

                      ConfirmSample(formData)
                        .then((response) => {
                          console.log("Samples confirmed successfully:", response.data);
                          setSampleform(null);
                          window.location.reload();
                        })
                        .catch((error) => {
                          if (error.response?.data?.CCCD) {
                            setErrorSample(error.response.data.CCCD);
                          }
                          console.log("Error:", error.response?.data);
                        });
                    }}
                  >
                    {errorSample && (
                      <div className="error-message">{errorSample}</div>
                    )}
                    {sampleform.map((sample, index) => (
                      <div key={sample.sampleid} className="result-item">
                        <p><strong>Sample code:</strong> {sample.samplecode}</p>
                        {typeService === "legal" && (
                          <div className="form-group">
                            <label className="form-label">Citizen ID</label>
                            <input
                              type="text"
                              name={`cccd-${index}`}
                              defaultValue={sample.cccd || ''}
                              className="form-control"
                              required
                            />
                          </div>
                        )}
                        <div className="form-group">
                          <label className="form-label">Sample taker name</label>
                          <input
                            type="text"
                            name={`name-${index}`}
                            defaultValue={sample.name || ''}
                            className="form-control"
                            required
                          />
                        </div>

                        {sampleform.length > 1 && (

                          <div className="form-group">
                            <label className="form-label">Relationship</label>
                            <input
                              type="text"
                              name={`relationName-${index}`}
                              defaultValue={sample.relationName || ''}
                              className="form-control"
                              required
                            />
                          </div>

                        )}

                        <div className="form-group">
                          <label className="form-label">Sample type</label>
                          <select
                            name={`sampleType-${index}`}
                            defaultValue={sample.sampleType || ''}
                            className="form-select"
                            required
                          >
                            <option value="">-- Select sample type --</option>
                            {["Blood", "Nail", "Hair", "Buccal swab", "Tooth"].map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                    <div className="form-group">
                      <label className="form-label">Proof file</label>
                      <input type="file" name="file" className="form-control" />
                    </div>
                    <button type="submit" className="form-submit confirm">
                      Submit confirmation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }

      </div >
      {renderPagination(totalPages, currentPage, setCurrentPage)}
      <Footer />
    </>
  );
};