import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useFlashMessage } from './FlashMessageStore';
import { useJwt } from './UserStore';

export default function LoginPage() {

    const {showMessage} = useFlashMessage();
    const {setJwt} = useJwt();

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const handleSubmit = async (values, formikHelpers) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", values);
            showMessage("Login successful", "success");
            setJwt(response.data.token);
        } catch (e) {
            showMessage("Unable to login", "danger")
        }


    }

    return (
        <div className="container">
            <h3>Login page</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    function (formik) {
                        return (
                            <Form>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <Field type="password" name="password" className="form-control" />
                                    <ErrorMessage name="password" component="div" className="text=danger" />
                                </div>
                                <button type="submit" className="btn btn-primary mb-3" disabled={formik.isSubmitting}>
                                    Login
                                </button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}