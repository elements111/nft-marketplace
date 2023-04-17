import Link from "next/link";
import React, { useState } from "react";

const ApplyComponent = () => {
  const initialValues = { website: "", twitter: "", email: "", instagram: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formWebsite, setFormWebsite] = useState("");
  const [formTwitter, setFormTwitter] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formInstagram, setFormInstagram] = useState("");

  const [errorMessageWebsite, setErrorMessageWebsite] = useState("Error");
  const [errorMessageTwitter, setErrorMessageTwitter] = useState("Error");
  const [errorMessageEmail, setErrorMessageEmail] = useState("Error");
  const [errorMessageInstagram, setErrorMessageInstagram] = useState("Error");

  const [errorWebsite, setErrorWebsite] = useState(false);
  const [errorTwitter, setErrorTwitter] = useState(false);
  const [errorInstagram, setErrorInstagram] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidWebsite = (name: string) => {
    const re =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return re.test(String(name));
  };

  const validateInputs = () => {
    const nameValue = formValues.website.trim();
    const emailValue = formValues.email.trim();
    let formIsValid = true;

    if (formValues.website === "") {
      setErrorMessageWebsite("Website is required");
      setErrorWebsite(true);
      formIsValid = false;
    } else if (!isValidWebsite(formValues.website)) {
      setErrorMessageEmail("Provide a valid website");
      setErrorEmail(true);
      formIsValid = false;
    } else {
      setErrorWebsite(false);
      setFormWebsite(formValues.website);
    }

    if (formValues.email === "") {
      setErrorMessageEmail("Email is required");
      setErrorEmail(true);
      formIsValid = false;
    } else if (!isValidEmail(emailValue)) {
      setErrorMessageEmail("Provide a valid email address");
      setErrorEmail(true);
      formIsValid = false;
    } else {
      setErrorEmail(false);
      setFormEmail(formValues.email);
    }
    if (formValues.instagram === "") {
      setErrorMessageInstagram("Instagram is required");
      setErrorInstagram(true);
      formIsValid = false;
    } else {
      setErrorInstagram(false);
      setFormInstagram(formValues.instagram);
    }
    return formIsValid;
  };
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "25px",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    //  const data = {
    //    date: date,
    //    name: formValues.name,
    //    school: formValues.school,
    //    phone: phone,
    //    email: formValues.email,
    //  };
    if (validateInputs()) {
      console.log("Verification passed!");
      setFormValues(initialValues);

      alert(
        "Thank you for your interest in New Elements! We will be in touch soon."
      );
      //   setLoading(true);
      //    axios
      //      .post(`/api/contact`, {
      //        website: formValues.website,
      //        school: formValues.school,
      //        phone: phone,
      //        email: formValues.email,
      //        message: formValues.message,
      //      })
      //      .then((response) => {
      //        setLoading(false);
      //        console.log(response);
      //        if (response.status === 201) {
      //          console.log("Message Sent.");
      //          openModal();
      //          setFormValues(initialValues);
      //          setPhone("");
      //          setFormEmail("");
      //        } else if (response.status === 202) {
      //          alert(
      //            "You have already submitted a message with us and we will get back to you soon!"
      //          );
      //          setFormValues(initialValues);
      //          setPhone("");
      //          setFormEmail("");
      //        }
      //      })
      //      .catch((err) => console.log(err));
    }
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // console.log(formValues);

  return (
    <div className="flex w-screen h-screen  items-center justify-center bg-center bg-cover bg-[url(/background.svg)]  ">
      <div className="flex  mt-24 w-[85vw] md:w-[50vw] flex-col items-center uppercase text-left text-green font-ibmPlex">
        <div className=" w-full  ">
          <form id="contact-form" onSubmit={handleSubmit} method="POST">
            <h2 className="text-[2vh] leading-[25px] mb-12 ">
              WE ARE SELECTING THE BEST FASHION STORY TELLERS AROUND THE GLOBE.{" "}
              <br />
              IF YOU BELEIVE THIS IS YOU, PLEASE APPLY HERE.
            </h2>
            <div className="flex flex-col ">
              <div className="form-group ">
                <label htmlFor="email1">Email</label>
                <input
                  type="text"
                  className={
                    errorEmail
                      ? "text-base bg-transparent py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all duration-500"
                      : "text-base bg-transparent py-3.5 px-4 w-full h-10 border  outline-0 transition-all duration-500"
                  }
                  id="email1"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  // aria-describedby="emailHelp"
                  placeholder="name@domain.com"
                  // required
                />
              </div>
              <div
                className={
                  errorEmail
                    ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                    : "invisible leading-tight text-[1.2vw]"
                }
              >
                {errorMessageEmail}
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  className={
                    errorWebsite
                      ? "text-base bg-transparent py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all"
                      : "text-base bg-transparent py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-all"
                  }
                  id="name1"
                  name="website"
                  value={formValues.website}
                  onChange={handleChange}
                  placeholder="mywebsite.com"
                  // required
                />
              </div>
              <div
                className={
                  errorWebsite
                    ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                    : "invisible leading-tight text-[1.2vw]"
                }
              >
                {errorMessageWebsite}
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="form-group ">
                <label htmlFor="name">Twitter</label>
                <input
                  type="text"
                  className={
                    errorTwitter
                      ? "text-base bg-transparent py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all"
                      : "text-base bg-transparent py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-all"
                  }
                  id="school1"
                  name="twitter"
                  value={formValues.twitter}
                  onChange={handleChange}
                  placeholder="@mytwitter"
                  // required
                />
              </div>
              <div
                className={
                  errorTwitter
                    ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                    : "invisible leading-tight text-[1.2vw]"
                }
              >
                {errorMessageTwitter}
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="form-group ">
                <label htmlFor="name">Instagram</label>
                <input
                  type="text"
                  className={
                    errorInstagram
                      ? "text-base bg-transparent py-3.5 px-4 w-full h-10 border border-red-500 outline-0 transition-all"
                      : "text-base bg-transparent py-3.5 px-4 w-full h-10 border border-blue outline-0 transition-all"
                  }
                  id="school1"
                  name="instagram"
                  value={formValues.instagram}
                  onChange={handleChange}
                  placeholder="@myinstagram"
                  // required
                />
              </div>
              <div
                className={
                  errorInstagram
                    ? "text-red-500 font-thin leading-tight text-[1.2vw]"
                    : "invisible leading-tight text-[1.2vw]"
                }
              >
                {errorMessageInstagram}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue text-green font-compressed border border-green w-full uppercase tracking-[12px]  bg-white bg-opacity-20 hover:bg-opacity-40 font-semibold  py-[1.2vh] px-[7vh] z-2 text-xl  "
            >
              {loading ? (
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyComponent;