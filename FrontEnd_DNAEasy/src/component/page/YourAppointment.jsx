import React, { useEffect, useState } from 'react';
import { GetAppointmetnForStaff_Lab, GetYourAppointmentInProcess, ProcesstheAppointment, UpdateStatusAppointment } from '../../service/appointment';
import { AllowConfimAppointment, ConfirmSample, GetSampleByAppointmentId } from '../../service/sample';
import { GetcurentOrderProcess } from '../../service/processtesting';
import { CreateResult, UpdateResult } from '../../service/result';

export const YourAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sampleform, setSampleform] = useState();
  const [Resultform, setResultform] = useState();
  const [nextStatus, setNextStatus] = useState('');
  const [errorSample, setErrorSample] = useState('');
  const [errorResult, setErrorResult] = useState('');
  const [cancelForm, setCancelForm] = useState('');
  const [cancelNote,setCancelNote] = useState('');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let appointmentsData = [];

        if (user != null && user.rolename === "STAFF_LAB") {
          const res = await GetAppointmetnForStaff_Lab();
          console.log("STAFF_LAB response:", res); // 👈 kiểm tra format
          appointmentsData = res?.data || [];
        } else {
          const res = await GetYourAppointmentInProcess();
          console.log("Customer response:", res); // 👈 kiểm tra format
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
    }
    else if (appointment.Confimed.formfor && appointment.Confimed.formfor === "Result") {
      console.log("Creating result for appointment:", appointment.appointmentId);
      CreateResult({ appoinmentId: appointment.appointmentId })
        .then((response) => {
          console.log("Result created successfully:", response.data);
          setResultform(response.data);
        }).catch((error) => {
          console.error("Error confirming samples:", error);

        });
      // setResultform(appointment.listSample);


    }
    else {
      // goi thang api confimstatusappointment luon
      console.log("listSample:", appointment.listSample);
      const formData = appointment.listSample.map((sample) => ({
        sampleId: sample.sampleid,
        cccd: sample.cccd,
        name: sample.name,
        relationName: sample.relationName,
        sampleType: sample.sampleType,
        nextStatusName: appointment.Confimed.nextStatus,
      }));
      console.log("Submitting samples:", formData);
      ConfirmSample(formData)
        .then((response) => {
          console.log("Samples confirmed successfully:", response.data);

          window.location.reload(); // Reload the page to fetch updated data
        })
        .catch((error) => {
          console.error("Error confirming samples:", error);

        });
    }


    console.log("Appointment data:", appointment);


  }


  return (



    <div className="container mt-4">


      {cancelForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận hủy lịch hẹn</h5>
                <button type="button" className="btn-close" onClick={() => setCancelForm(null)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!cancelNote.trim()) return alert("Vui lòng nhập lý do hủy.");

                  console.log("aaaa",{appointmentId:cancelForm.appointmentId, note: cancelNote})
                  const appointmentUpdate ={
                    appointmentId:cancelForm.appointmentId,
                     note: cancelNote,
                    status:"CANCLE"}
             
                  UpdateStatusAppointment(appointmentUpdate).then((response)=>
                  {
                    console.log(response.data)
                    window.location.reload();
                  }).catch((error)=>
                  {
                    alert("loi khi huy ");
                  })
                
                }}>
                  <div className="mb-3">
                    <label className="form-label">Lý do hủy</label>
                    <textarea
                      className="form-control"
                      value={cancelNote}
                      onChange={(e) => setCancelNote(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-danger">Xác nhận hủy</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}




      {Resultform && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận kết quả xét nghiệm</h5>
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
                    const formData = new FormData();

                    const resultDataArray = [];
                    const fileArray = [];

                    Resultform.forEach((result, index) => {
                      const resultId = result.resultId;
                      const conclusionResult = e.target[`conclusionResult-${index}`].value.trim();
                      const fileInput = e.target[`file-${index}`];
                      const file = fileInput.files[0];

                      if (!file || !conclusionResult) {
                        setErrorResult("Please enter all field");
                        return;
                      }

                      resultDataArray.push({
                        resultId: resultId,
                        conclustionResult: conclusionResult,
                      });
                      fileArray.push(file);
                    });

                    // Append mỗi file với cùng key "file"
                    fileArray.forEach((file) => {
                      formData.append("file", file);
                    });

                    // Append kết quả (1 mảng JSON)
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
                  {Resultform.map((result, index) => (
                    <div key={result.resultId} className="mb-4 border-bottom pb-3">
                      <p><strong>Quan hệ:</strong> {result.relationName}</p>
                      <p><strong>Mã mẫu:</strong> {result.samplecode}</p>
                      <div className="mb-2">
                        <label className="form-label">Tải file PDF kết quả</label>
                        <input
                          type="file"
                          name={`file-${index}`}
                          accept="application/pdf"
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Kết luận</label>
                        <select
                          name={`conclusionResult-${index}`}
                          className="form-select"
                          required
                        >
                          <option value="">-- Chọn kết luận --</option>
                          <option value="Consanguineous">Consanguineous (Cùng huyết thống)</option>
                          <option value="Not Consanguineous">Not Consanguineous (Không cùng huyết thống)</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <p><strong>{errorResult && <div className='text-danger' > {errorResult}</div>}</strong></p>
                  <button type="submit" className="btn btn-primary">Xác nhận tất cả</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {sampleform && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận thông tin mẫu</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSampleform(null)}
                ></button>
              </div>

              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    const formData = sampleform.map((sample, index) => ({
                      sampleId: sample.sampleid,

                      cccd: e.target[`cccd-${index}`].value.trim(),
                      name: e.target[`name-${index}`].value.trim(),
                      relationName: e.target[`relationName-${index}`].value.trim(),
                      sampleType: e.target[`sampleType-${index}`].value,
                      nextStatusName: nextStatus,
                    }));

                    const isValid = formData.every((s) =>
                      s.cccd && s.name && s.relationName && s.sampleType
                    );

                    if (!isValid) {
                      setErrorSample(" All field Not empty")
                      return;
                    }

                    console.log("Submitting samples:", formData);
                    ConfirmSample(formData)
                      .then((response) => {

                        console.log("Samples confirmed successfully:", response.data);

                        setSampleform(null);
                        window.location.reload(); // Reload the page to fetch updated data
                      }).catch((error) => {
                        if (error.response.data != null) {
                          setErrorSample(error.response.data.CCCD)
                        }
                        console.log("loi", error.response.data.CCCD)
                      })

                  }}
                >
                  {sampleform.map((sample, index) => (
                    <div key={sample.sampleid} className="mb-4 border-bottom pb-3">
                      <p><strong>Mã mẫu:</strong> {sample.samplecode}</p>

                      <div className="mb-2">
                        <label className="form-label">CCCD</label>
                        <input
                          type="text"
                          name={`cccd-${index}`}
                          defaultValue={sample.cccd || ''}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Tên người lấy mẫu</label>
                        <input
                          type="text"
                          name={`name-${index}`}
                          defaultValue={sample.name || ''}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Quan hệ</label>
                        <input
                          type="text"
                          name={`relationName-${index}`}
                          defaultValue={sample.relationName || ''}
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="mb-2">
                        <label className="form-label">Loại mẫu</label>
                        <select
                          name={`sampleType-${index}`}
                          defaultValue={sample.sampleType || ''}
                          className="form-select"
                          required
                        >
                          <option value="">-- Chọn loại mẫu --</option>
                          {[
                            "Máu",
                            "Móng tay",
                            "Tóc",
                            "Niêm mạc miệng",
                            "Răng",

                          ].map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  <p><strong>{errorSample && <div className='text-danger' > {errorSample}</div>}</strong></p>
                  <button type="submit" className="btn btn-primary">
                    Gửi xác nhận
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="mb-4">Your Appointments</h1>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length > 0 ? (




        <div className="row">
          {appointments.map((appointment) => (
            <div className="col-md-6 mb-4" key={appointment.appointmentId}>
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Progress bar */}
                  {appointment.statusNames && appointment.statusNames.length > 0 && (
                    <div className="mb-3">
                      <strong>Progress:</strong>
                      <div className="progress-container mt-2">
                        <div className="d-flex justify-content-between position-relative">
                          {/* Progress line */}
                          <div
                            className="progress-line"
                            style={{
                              position: 'absolute',
                              top: '14px',
                              left: '14px',
                              right: '14px',
                              height: '4px',
                              backgroundColor: '#e9ecef',
                              zIndex: 1
                            }}
                          ></div>

                          {/* Completed portion of the line */}
                          <div
                            className="progress-line-completed"
                            style={{
                              position: 'absolute',
                              top: '14px',
                              left: '14px',
                              width: `${(appointment.orderProcess / (appointment.statusNames.length - 1)) * 90
                                }%`,
                              height: '4px',
                              backgroundColor: '#28a745',
                              zIndex: 2
                            }}
                          ></div>

                          {appointment.statusNames.map((step, index) => {
                            const isCompleted = index < appointment.orderProcess;
                            const isCurrent = index === appointment.orderProcess;


                            return (
                              <div
                                key={index}
                                className="d-flex flex-column align-items-center"
                                style={{ zIndex: 3 }}
                              >
                                {/* Step circle */}
                                <div
                                  className={`rounded-circle ${isCompleted ? 'bg-success' : isCurrent ? 'bg-warning' : 'bg-secondary'}`}
                                  style={{
                                    width: '28px',
                                    height: '28px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    marginBottom: '4px'
                                  }}
                                >
                                  {isCompleted ? '✓' : index + 1}
                                </div>

                                {/* Step label */}
                                <small
                                  className="text-center"
                                  style={{
                                    fontSize: '10px',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '80px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  {step}
                                </small>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <h5 className="card-title">{appointment.serviceName}</h5>
                  <p className="card-text">
                    <strong>Customer:</strong> {appointment.customerName}<br />
                    <strong>Staff:</strong> {appointment.staffName}<br />
                    <strong>Collection Date:</strong> {new Date(appointment.dateCollect).toLocaleString()}<br />
                    <strong>Location:</strong> {appointment.location}<br />
                    <strong>Type:</strong> {appointment.typeCollect}<br />
                    <strong>Payment:</strong> {appointment.paymentAmount.toLocaleString('vi-VN')} VND ({appointment.paymentMethod})<br />
                    <strong>Status:</strong>{' '}
                    <span className="badge bg-warning text-dark">{appointment.curentStatusAppointment}</span>
                  </p>

                  {/* Confirm button */}
                  {(appointment.orderProcess === 0 ||
                    user.rolename === "STAFF_LAB" ||
                    user.rolename === "STAFF_TEST") && (
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => setCancelForm(appointment)}
                      >
                        Hủy lịch hẹn
                      </button>
                    )}

                  {appointment.Confimed.isallowCofirmation && (
                    <button className="btn btn-success" onClick={() => handelconfirm(appointment)}>
                      {appointment.Confimed.nextStatus}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};