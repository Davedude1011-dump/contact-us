import { useState } from "react";
import { Toast } from "react-bootstrap";

function InputField({
  inputVariable,
  setInputVariable,
  inputTitle,
  inputType,
  submitAttempted,
}: {
  inputVariable: string;
  setInputVariable: (inputVariable: string) => void;
  inputTitle: string;
  inputType: string;
  submitAttempted: boolean;
}) {
  return (
    <>
      <label htmlFor="firstName">{inputTitle}</label>
      {inputType == "input" ? (
        <>
          <input
            type="text"
            className={`form-control ${
              inputVariable.length == 0 &&
              submitAttempted &&
              "border border-danger"
            }`}
            value={inputVariable}
            onChange={(e) => setInputVariable(e.target.value)}
            id={inputTitle.replace(" ", "")}
          />
          {inputVariable.length == 0 && submitAttempted && (
            <small className="form-text text-danger">
              {inputTitle == "Email Address"
                ? "Please enter a valid email address"
                : "This field is required"}
            </small>
          )}
        </>
      ) : (
        <>
          <textarea
            value={inputVariable}
            onChange={(e) => setInputVariable(e.target.value)}
            className={`form-control ${
              inputVariable.length == 0 &&
              submitAttempted &&
              "border border-danger"
            }`}
            id={inputTitle.replace(" ", "")}
          />
          {inputVariable.length == 0 && submitAttempted && (
            <small className="form-text text-danger">
              This field is required
            </small>
          )}
        </>
      )}
    </>
  );
}

function App() {
  const isMobile = window.matchMedia("(orientation: portrait)").matches;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkedQueryType, setCheckedQueryType] = useState("");
  const [email, setEmail] = useState("");
  const [checkedConsent, setCheckedConsent] = useState(false);
  const [message, setMessage] = useState("");

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Toast
        className="position-absolute top-0 start-50 translate-middle-x mt-2"
        show={showToast}
      >
        <Toast.Header
          closeButton={false}
          className="border-0 text-white rounded-top"
          style={{ backgroundColor: "#304444" }}
        >
          <i className="bi bi-check-circle me-1"></i>
          <strong className="me-auto ms-1">Message Sent!</strong>
        </Toast.Header>
        <Toast.Body
          className="text-white rounded-bottom"
          style={{ backgroundColor: "#304444" }}
        >
          Thanks for completing the form. We'll be in touch soon!
        </Toast.Body>
      </Toast>
      <div className="container d-flex flex-column align-items-center justify-content-center w-100 h-100">
        <div
          className={`container ${
            isMobile ? "w-100" : "w-75"
          } bg-white p-5 rounded`}
        >
          <div>
            <h2 className="text-muted">Contact Us</h2>
            <form
              className={`d-flex ${isMobile ? "flex-column" : "flex-row"} mt-3`}
            >
              <div
                className={`form-group ${
                  isMobile ? "mb-1 w-100" : "me-1 w-50"
                }`}
              >
                <InputField
                  inputVariable={firstName}
                  setInputVariable={setFirstName}
                  inputTitle="First Name"
                  inputType="input"
                  submitAttempted={submitAttempted}
                ></InputField>
              </div>
              <div
                className={`form-group ${
                  isMobile ? "mt-1 w-100" : "ms-1 w-50"
                }`}
              >
                <InputField
                  inputVariable={lastName}
                  setInputVariable={setLastName}
                  inputTitle="Last Name"
                  inputType="input"
                  submitAttempted={submitAttempted}
                ></InputField>
              </div>
            </form>
            <div className="form-group mt-3">
              <InputField
                inputVariable={email}
                setInputVariable={setEmail}
                inputTitle="Email Address"
                inputType="input"
                submitAttempted={submitAttempted}
              ></InputField>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="queryType">Query Type</label>
              <div
                className={`form-group d-flex ${
                  isMobile ? "flex-column" : "flex-row"
                }`}
              >
                {["Genral Enquiry", "Support Request"].map(
                  (queryType, index) => (
                    <div
                      className={`form-group ${
                        isMobile
                          ? `w-100 ${index == 0 ? "mb-1" : "mt-1"}`
                          : `w-50 ${index == 0 ? "me-1" : "ms-1"}`
                      }`}
                    >
                      <button
                        className={`btn border w-100 py-2 text-start ${
                          checkedQueryType == queryType && "border-success"
                        }`}
                        style={
                          checkedQueryType == queryType
                            ? { backgroundColor: "rgba(25, 135, 84, 0.2)" }
                            : {}
                        }
                        onClick={() => setCheckedQueryType(queryType)}
                      >
                        <input
                          type="radio"
                          className="form-check-input me-2 pe-none"
                          style={
                            checkedQueryType == queryType
                              ? {
                                  backgroundColor: "#198754",
                                  borderColor: "#198754",
                                }
                              : {}
                          }
                          checked={checkedQueryType == queryType}
                        />
                        {queryType}
                      </button>
                    </div>
                  )
                )}
              </div>
              {checkedQueryType == "" && submitAttempted && (
                <small className="form-text text-danger">
                  This field is required
                </small>
              )}
            </div>
            <div className="form-group mt-3">
              <InputField
                inputVariable={message}
                setInputVariable={setMessage}
                inputTitle="Message"
                inputType="textbox"
                submitAttempted={submitAttempted}
              ></InputField>
            </div>
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                style={
                  checkedConsent
                    ? { backgroundColor: "#198754", borderColor: "#198754" }
                    : {}
                }
                checked={checkedConsent}
                id="flexCheckDefault"
                onChange={() => setCheckedConsent(!checkedConsent)}
              ></input>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I consent to being contacted by the team
              </label>
            </div>
            {!checkedConsent && submitAttempted && (
              <small className="form-text text-danger">
                To submit this form, please consent to being contacted
              </small>
            )}
            <button
              className="btn btn-success mt-4 w-100 py-3"
              onClick={() => {
                setSubmitAttempted(true);
                if (
                  firstName.length > 0 &&
                  lastName.length > 0 &&
                  email.length > 0 &&
                  checkedQueryType != "" &&
                  message.length > 0 &&
                  checkedConsent
                ) {
                  setShowToast(true);
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
