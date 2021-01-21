import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import styles from "./Contact.module.scss";
import form from "./validSchema";
import Footer from "../../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { addFormDataMiddleWare } from "../../../redux/actions";

const Contact = () => {
  const dispatch = useDispatch();
  const formFulfilled = useSelector((state) => state.formFulfilled);
  const [formikValues, setFormikValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    formFulfilled && setFormikValues({ name: "", email: "", message: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFulfilled]);

  return (
    <>
      <section className={styles.contactContainer}>
        <h2 className={styles.contactHeader}>Contact</h2>

        <Formik
          onSubmit={(values) => dispatch(addFormDataMiddleWare(values))}
          validationSchema={form}
          initialValues={{ name: "", email: "", message: "" }}
          validateOnChange={true}
          initialErrors={false}
        >
          {({ errors, touched, submitForm, handleChange }) => {
            const onChange = (e) => {
              const { name, value } = e.target;

              setFormikValues({
                ...formikValues,
                [name]: value,
              });
              return handleChange(e);
            };

            return (
              <form>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formikValues.name}
                  onChange={onChange}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={styles.contactError}
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formikValues.email}
                  onChange={onChange}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={styles.contactError}
                />
                <Field
                  as="textarea"
                  name="message"
                  value={formikValues.message}
                  placeholder="Your message here..."
                  className={styles.contactTextArea}
                  onChange={onChange}
                />
                <ErrorMessage
                  name="message"
                  component="span"
                  className={styles.contactError}
                />

                <Field>
                  {() => {
                    const notDisabled = !(
                      Object.keys(touched).length >= 2 &&
                      Object.keys(errors).length === 0
                    );

                    if (!notDisabled) {
                      return (
                        <button
                          type="button"
                          onClick={submitForm}
                          style={{ cursor: "pointer" }}
                        >
                          SUBMIT
                        </button>
                      );
                    }

                    return (
                      <button
                        disabled
                        type="button"
                        style={{ cursor: "not-allowed" }}
                      >
                        SUBMIT
                      </button>
                    );
                  }}
                </Field>
              </form>
            );
          }}
        </Formik>

        <div className={`${styles.contactInfo} row`}>
          <div>ghalechyan@yahoo.com</div>
          <div className={styles.contactMiddleLine} />
          <div>+374 93 416 572</div>
        </div>

        <p className={styles.map}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.7866242451905!2d44.57963303770367!3d40.30279829537573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406a9faa9dac50f7%3A0x37b0a394eddd43ab!2zQ2hhcmVudHMgU3RyZWV0LCBOb3IgSGFjaG4gMjQxMiwg0JDRgNC80LXQvdC40Y8!5e0!3m2!1sru!2s!4v1610879909235!5m2!1sru!2s"
            width="600"
            height="450"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </p>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
