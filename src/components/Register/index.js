import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    usernameError: "",
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const [showSubmitError, setShowSubmitError] = useState(false);
  const history = useHistory();

  const handleBlur = (field) => {
    const value = formData[field];
    if (value.trim() === "") {
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

  const onSubmitSuccess = () => {
    history.push("/login");
  };

  const onSubmitFailure = () => {
    setShowSubmitError(true);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, name, email, password } = formData;
    const userDetails = { username, name, email, password };
    const url = "https://testing-mongo-backend.onrender.com/api/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      onSubmitSuccess();
    } else {
      onSubmitFailure();
    }
  };

  const renderField = (label, fieldType, fieldName) => (
    <>
      <label className="input-label" htmlFor={fieldName}>
        {label.toUpperCase()}
      </label>
      <input
        type={fieldType}
        id={fieldName}
        className="input-filed"
        value={formData[fieldName]}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            [fieldName]: e.target.value,
          }))
        }
        onBlur={() => handleBlur(fieldName)}
      />
      {formData[`${fieldName}Error`] && (
        <p style={{ color: "red" }}>{formData[`${fieldName}Error`]}</p>
      )}
    </>
  );

  return (
    <div className="login-form-container">
      <form className="login-card" onSubmit={submitForm}>
        <h1 className="main-heading">SignUp Form</h1>
        <div className="input-container">
          {renderField("Username", "text", "username")}
        </div>
        <br />
        <div className="input-container">
          {renderField("Name", "text", "name")}
        </div>
        <br />
        <div className="input-container">
          {renderField("Email", "text", "email")}
        </div>
        <br />
        <div className="input-container">
          {renderField("Password", "password", "password")}
        </div>
        <br />
        <button type="submit" className="form-button">
          SIGN UP
        </button>
        {showSubmitError && <p className="error-message">*Bad Request</p>}
        <p className="paragraph">Already have an account?</p>
        <Link to="/login">
          <button type="button" className="sign-in-button">
            SIGN IN
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
