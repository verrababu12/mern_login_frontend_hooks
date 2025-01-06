import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
  });
  const [showSubmitError, setShowSubmitError] = useState(false);
  const history = useHistory();

  const handleBlur = (field) => {
    const value = formData[field].trim();
    if (value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [`${field}Error`]: "*Required",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [`${field}Error`]: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmitSuccess = () => {
    history.push("/home");
  };

  const onSubmitFailure = () => {
    setShowSubmitError(true);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = formData;
    const userDetails = { username, password };
    const url = "https://testing-mongo-backend.onrender.com/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      onSubmitSuccess();
    } else {
      onSubmitFailure();
    }
  };

  const renderField = (label, fieldType, fieldName, blurHandler) => (
    <>
      <label className="input-label" htmlFor={fieldName}>
        {label.toUpperCase()}
      </label>
      <input
        type={fieldType}
        id={fieldName}
        className="input-filed"
        value={formData[fieldName]}
        onChange={handleInputChange}
        onBlur={() => blurHandler(fieldName)}
      />
      {formData[`${fieldName}Error`] && (
        <p style={{ color: "red" }}>{formData[`${fieldName}Error`]}</p>
      )}
    </>
  );

  return (
    <div className="login-form-container-2">
      <form className="login-card-2" onSubmit={submitForm}>
        <h1 className="main-heading-2">Login Form</h1>
        <div className="input-container-2">
          {renderField("Username", "text", "username", handleBlur)}
        </div>
        <br />
        <div className="input-container-2">
          {renderField("Password", "password", "password", handleBlur)}
        </div>
        <br />
        <button type="submit" className="button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*Bad Request</p>}
        <p>Don't have an account?</p>
        <Link to="/">
          <button type="button" className="sign-up-button-2">
            SIGN UP
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
