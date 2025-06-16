import React, { useEffect, useState } from 'react';
import { GetAppointmetnForStaff_Lab, GetAppointmetnForStaff_reception, GetYourAppointmentInProcess, ProcesstheAppointment, UpdateStatusAppointment } from '../../service/appointment';
import { AllowConfimAppointment, ConfirmSample, CreateSampleByAppointmentID, GetSampleByAppointmentId } from '../../service/sample';
import { GetcurentOrderProcess } from '../../service/processtesting';
import { CreateResult, UpdateResult } from '../../service/result';
import { ConfirmPaidByCash, PayAgaint, UpdatePaymentStatus } from '../../service/payment';

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
          console.log("STAFF_LAB response:", res); // 👈 kiểm tra format
          appointmentsData = res?.data || [];
        } else if (rolename != null && rolename === "STAFF_RECEPTION") {
          const res = await GetAppointmetnForStaff_reception();
          console.log("STAFF_LAB response:", res); // 👈 kiểm tra format
          appointmentsData = res?.data || [];


        }


        else {
          const res = await GetYourAppointmentInProcess();
          console.log("Customer+StaffLab response:", res); // 👈 kiểm tra format
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



    <div className="container mt-4">
      {statusform && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Status</h5>
                <button type="button" className="btn-close" onClick={() => setStatusfrom(null)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => {
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

                }}>
                  <div className="mb-2">
                    <label className="form-label">File evidence </label>
                    <input
                      type="file"
                      name="file"
                      className="form-control"

                    />
                  </div>
                  <button type="submit" className="btn btn-danger">Confirm</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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

                }}>
                  <div className="mb-3">
                    <label className="form-label">Lý do hủy</label>
                    <textarea
                      className="form-control"
                      value={cancelNote}
                      onChange={(e) => setCancelNote(e.target.value)} np
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">File evidence </label>
                    <input
                      type="file"
                      name="file"
                      className="form-control"

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
                        <label className="form-label">Tải file kết quả</label>
                        <input
                          type="file"
                          name={`file-${index}`}
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

                    const formData = new FormData();
                    const SampleArray = [];
                    const file = e.target["file"].files[0];

                    sampleform.forEach((sample, index) => {
                      const sampleUpdate = {
                        sampleId: sample.sampleid,
                        cccd: appointments.typeService === "legal"
                          ? e.target[`cccd-${index}`].value.trim()
                          : null,
                        name: e.target[`name-${index}`].value.trim(),
                        relationName: e.target[`relationName-${index}`].value.trim(),
                        sampleType: e.target[`sampleType-${index}`].value,
                        nextStatusName: nextStatus,
                      };

                      if (!sampleUpdate.name || !sampleUpdate.relationName || !sampleUpdate.sampleType) {
                        setErrorSample("Không được để trống các trường bắt buộc.");
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
                        console.log("Lỗi:", error.response?.data);
                      });

                  }}
                >
                  {sampleform.map((sample, index) => (
                    <div key={sample.sampleid} className="mb-4 border-bottom pb-3">
                      <p><strong>Mã mẫu:</strong> {sample.samplecode}</p>


                      {typeService === "legal" && (
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
                      )}


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

                  <div className="mb-2">
                    <label className="form-label">File evidence </label>
                    <input
                      type="file"
                      name="file"
                      className="form-control"

                    />
                  </div>
                  <p><strong>{errorSample && <div className='text-danger' > {errorSample}</div>}</strong></p>
                  <button type="submit" className="btn btn-primary">
                    Gửi xác nhận
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
      }
      <h1 className="mb-4">Your Appointments</h1>

      {
        loading ? (
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
                                width: `${(appointment.orderProcess / (appointment.statusNames.length - 1)) * 95
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

                    <h5 className="card-title">{appointment.serviceName}({appointment.typeService})</h5>
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
                      rolename === "STAFF_LAB" ||
                      rolename === "STAFF_TEST") && (
                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => setCancelForm(appointment)}
                        >
                          Cancle
                        </button>
                      )}

                    {appointment.Confimed.isallowCofirmation ? (
                      <button className="btn btn-success" onClick={() => handelconfirm(appointment)}>
                        {appointment.Confimed.nextStatus}
                      </button>
                    ) : (
                      (appointment.curentStatusAppointment.includes('WAITING FOR PAYMENT') && appointment.paymentMethod.includes("VNPay")) && (
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            PayAgaint(appointment.appointmentId).then((response) => {
                              window.location.href = response.data;
                            });
                          }}
                        >
                          {appointment.Confimed.nextStatus}
                        </button>
                      )
                    )}

                    {
                      (appointment.paymentMethod.includes("Cash") && rolename === "STAFF_RECEPTION") && (
                        <button className="btn btn-success" onClick={() => handelpaytocash(appointment)}>
                          Confirm  paid
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments found.</p>
        )
      }
    </div >
  );
};