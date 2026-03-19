import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from 'yup';
import { useFlashMessage } from "./FlashMessageStore";
import { useLocation } from "wouter";


export default function RegisterPage() {

    const [_, setLocation] = useLocation();
    const { showMessage } = useFlashMessage();
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        salutation: Yup.string().required('Salutation is required'),
        country: Yup.string().required('Country is required'),
    });


    const [marketingPreferences, setMarketingPreferences] = useState([]);

    useEffect(() => {
        const fetchMarketingPreferences = async () => {
            const response = await axios.get('/marketingPreferences.json');
            setMarketingPreferences(response.data);
        }
        fetchMarketingPreferences();
    }, [])

    // store the default values for each of the from field
    const initialValues = {
        "name": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "salutation": "",
        "marketingPreferences": [],
        "country": "sg"
    }

    // function to handle the form submission
    // values: the values from the form (i.e what the user has entered)
    // formikHelpers: is an object that contains utility functions
    const handleSubmit = async (values, formikHelpers) => {
        console.log("values from the form =>", values);
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/register", values);
            console.log("Form has been processed successfully");
            formikHelpers.setSubmitting(false);
            showMessage("You have registered successfully", "success");
            setLocation("/");
        } catch (e) {
            showMessage("Unable to register. Please try again later", "danger");
        }
    }

    return (<div className="container">
        <h1>Register</h1>

        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {
                (formik) => {
                    return (
                        <Form>
                            {/* Name */}
                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className="form-label">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="ex. Mary Sue"
                                />
                            </div>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                            />

                            {/* Email */}
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                />
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                            />

                            {/* Password */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                />
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                            />

                            {/* Confirm password */}
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <Field
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"
                                />
                            </div>
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-danger"
                            />

                            {/* Salutation */}
                            <label className="form-label">Salutation</label>
                            <div>
                                <div className="form=check form-check-inline">
                                    <Field
                                        type="radio"
                                        name="salutation"
                                        id="mr"
                                        value="mr"
                                    />
                                    <label htmlFor="mr" className="form-check-label">Mr.</label>
                                </div>


                                <div className="form=check form-check-inline">
                                    <Field
                                        type="radio"
                                        name="salutation"
                                        id="ms"
                                        value="ms"
                                    />
                                    <label htmlFor="ms" className="form-check-label">Ms.</label>
                                </div>

                                <div className="form=check form-check-inline">
                                    <Field
                                        type="radio"
                                        name="salutation"
                                        id="mrs"
                                        value="mrs"
                                    />
                                    <label htmlFor="mrs" className="form-check-label">Mrs.</label>
                                </div>

                                <div className="form=check form-check-inline">
                                    <Field
                                        type="radio"
                                        name="salutation"
                                        id="others"
                                        value="others"
                                    />
                                    <label htmlFor="others" className="form-check-label">Others</label>
                                </div>

                            </div>
                            <ErrorMessage
                                name="salutation"
                                component="div"
                                className="text-danger"
                            />

                            {/* Marketing Preferences */}
                            <div className="mb-3 mt-3">
                                <label className="form-label">Marketing Preferences</label>
                                {

                                    marketingPreferences.map((preference) => {
                                        return (
                                            <div className="form-check" key={preference.id}>
                                                <Field
                                                    type="checkbox"
                                                    name="marketingPreferences"
                                                    value={String(preference.id)}
                                                    className="form-check-input"
                                                    id={"marketing-preference-" + preference.id}
                                                />
                                                <label className="form-check-label"
                                                    htmlFor={"marketing-preference-" + preference.id}>
                                                    {preference.name}
                                                </label>
                                            </div>
                                        )
                                    })

                                }



                            </div>

                            {/* Countries */}
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">
                                    Country
                                </label>
                                <Field
                                    as="select"
                                    className="form-select"
                                    id="country"
                                    name="country">
                                    <option value="">Select Country</option>
                                    <option value="sg">Singapore</option>
                                    <option value="my">Malaysia</option>
                                    <option value="id">Indoneisa</option>
                                    <option value="th">Thailand</option>
                                    <option value="in">India</option>
                                </Field>
                                <ErrorMessage
                                    name="country"
                                    component="div"
                                    className="text-danger"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={formik.isSubmitting}
                            >
                                Register
                            </button>


                        </Form>
                    )
                }
            }
        </Formik>
    </div>);
}