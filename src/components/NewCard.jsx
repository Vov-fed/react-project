import { useEffect, useState } from "react";
import { useFormik, getIn } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createCard } from "../services/userServices";
import '../css/newCard.css';

function NewCard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [urlWrapper, setUrlWrapper] = useState(null);
    const [editField, setEditField] = useState(null);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "Your Company",
            subtitle: "Subtitle",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: {
                url: "https://www.uniwide.co.uk/wp-content/uploads/2024/10/company-name-check.jpg",
                alt: "",
            },
            address: {
                state: "",
                country: "Israel",
                city: "Jerusalem",
                street: "",
                houseNumber: "",
                zip: "",
            },
        },
        validationSchema: Yup.object({
            title: Yup.string().min(2).max(256).required("Title is required"),
            subtitle: Yup.string().min(2).max(256).required("Subtitle is required"),
            description: Yup.string().min(2).max(1024).required("Description is required"),
            phone: Yup.string()
                .matches(/^(\+972|0)([23489]|5[0-9]|77)[1-9]\d{6}$/, "Phone must be a standard Israeli phone number")
                .required("Phone number is required"),
            email: Yup.string().email("Invalid email address").min(5).required("Email is required"),
            web: Yup.string().url("Web must be a standard URL").min(14),
            image: Yup.object({
                url: Yup.string().url("Image URL must be a standard URL").min(14).required("Image URL is required"),
                alt: Yup.string().min(2).max(256),
            }),
            address: Yup.object({
                state: Yup.string(),
                country: Yup.string().required("Country is required"),
                city: Yup.string().required("City is required"),
                street: Yup.string().required("Street is required"),
                houseNumber: Yup.number().typeError("Please enter a number").required("House number is required"),
                zip: Yup.number().typeError("Please enter a number"),
            }),
        }),
        onSubmit: async (values) => {
            try {
                
                const response = await createCard(values);
                if(response.status === 201) {
                    navigate("/success:card");
                }
            } catch (error) {
                console.error("Error creating card", error.response?.data || error.message);
                alert("Error creating card. Please try again.");
            }
        },
    });
    
    const inputs = [
        { name: "title", placeholder: "Title", type: "text" },
        { name: "subtitle", placeholder: "Subtitle", type: "text" },
        { name: "description", placeholder: "Description", type: "text" },
        { name: "phone", placeholder: "Phone", type: "text" },
        { name: "email", placeholder: "Email", type: "email" },
        { name: "web", placeholder: "Web", type: "text" },
        { name: "image.url", placeholder: "Image URL", type: "text" },
        { name: "image.alt", placeholder: "Image Alt", type: "text" },
        ...Object.keys(formik.values.address).map((key) => ({
            name: `address.${key}`,
            placeholder: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
            type: "text",
        })),
    ];

    const handleEditField = (field) => {
        setEditField(field);
    };

    const handleSaveField = () => {
        if(!editField) {
            return;
        }
        if(document.querySelector(".field-input").value === "") {
            return;
        }
        setEditField(null);
    };


    useEffect(() => {
        if(!urlWrapper) {
            return;
        }
        document.querySelector('.card-img-url-submit').addEventListener("click", () => {
            const url = document.querySelector('.card-img-url').value;
            formik.setFieldValue("image.url", url);
            document.querySelector(".card-img-url-wrapper").remove();
            setUrlWrapper(false);
        });
        document.querySelector('.card-img-url-wrapper').addEventListener("click", () => {
            if (e.target.classList.contains("card-img-url")) {
                return;
            }
            document.querySelector(".card-img-url-wrapper").remove();
            setUrlWrapper(false);
        });
    }, [urlWrapper, formik]);

    // const today = new Date().toLocaleDateString();
    const currentInput = inputs[step];
    const currentValue = getIn(formik.values, currentInput?.name) || "";
    const currentError = getIn(formik.errors, currentInput?.name) || "";

    const handleNext = () => {
        if(formik.values[currentInput.name] === "") {
          return;
        }
        if(document.querySelector(".form-input").value === "") {
          return;
        }
        if (step < inputs.length - 1) {
          setStep(step + 1);
          setTimeout(() => {
            document.querySelector(".form-input").focus();
          }, 0);
        }
      };

      const handlePrevious = () => {
        if (step > 0) {
          setStep(step - 1);
          setTimeout(() => {
            document.querySelector(".form-input").focus();
          }, 0);
        }
    
      };
    
    return (

        <form className="newcard-form form-form" onSubmit={formik.handleSubmit}>
            <ToastContainer />
                <div className="newcard-left">
                    <h2 className="newcard-title">Create your own card!</h2>
                    {inputs.map((input, index) => (
                        index === step && (
                            <div key={input.name}>
                                <h3>Enter Your {input.name.replace('.', '-').replace(/([A-Z])/g, ' $1')}</h3>
                                <input
                                    className="form-input"
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    onChange={formik.handleChange}
                                    value={currentValue}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleNext();
                                        } else if (e.key === "Backspace" && e.target.value === "") {
                                            e.preventDefault();
                                            handlePrevious();
                                        }
                                    }}
                                    />
                                {currentError && <div className="newcard-error">{currentError}</div>}
                            </div>
                        )
                    ))}
                    <div className="form-btns-wrapper">
                        <div className="form-btns">
                            {step > 0 && (
                                <button
                                type="button"
                                className="btn-back"
                                onClick={handlePrevious}
                                >
                                    Previous
                                </button>
                            )}
                            {step < inputs.length - 1 && (
                                <button
                                type="button"
                                className="btn-next"
                                onClick={handleNext}
                                disabled={!!currentError || currentValue === ""}
                                >
                                    Next
                                </button>
                            )}
                            {step === inputs.length - 1 && <button
                                className="btn-submit"
                                type="submit">Submit</button>}
                        </div>
                        <div className="form-cancel-btn">
                            <button
                                className="btn-cancel"
                                onClick={() => navigate("/home")}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="newcard-right">
                <div className="card card-new">
                    <div className="card-img-wrapper">
                        <img
                            className="card-img"
                            src={formik.values.image.url}
                            alt={formik.values.image.alt}
                            onClick={() => handleEditField("image.url")}
                        />
                    </div>
                    <div className="card-content newcard-content">
                <h2 className="card-title"
                onClick={() => handleEditField("title")}
                >{formik.values.title}</h2>
                <p className="card-sub"
                onClick={() => handleEditField("subtitle")}
                >{formik.values.subtitle}</p>
                <div className="newcard-location">
                <i className="fa-solid fa-location-dot"></i>
                <span className="card-country"
                onClick={() => handleEditField("address.country")}
                >
                    {formik.values.address.country}, 
                    </span>
                    <span className="card-country"
                    onClick={() => handleEditField("address.city")}
                    >
                        {formik.values.address.city}</span>
                </div>
                <div className="card-date">
                <i className="fa-solid fa-calendar"></i>
                <span className="card-created">{new Date().toLocaleDateString().split('/').join('.')
                    }</span>
                </div>
              </div>
                </div>
            </div>
            {editField && (
            <div className="field-modal-wrapper">
                <div className="field-modal">
                    <input
                        className="field-input"
                        type="text"
                        value={getIn(formik.values, editField)}
                        onChange={(e) => {formik.setFieldValue(editField, e.target.value);}}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSaveField();
                            } else if (e.key === "Backspace" && e.target.value === "") {
                                setEditField(null);
                            }
                        }
                        }
                        />
                    <button className="field-save-btn" onClick={handleSaveField}>
                        Save
                    </button>
                </div>
            </div>
            )}
        </form>
    );
}

export default NewCard;