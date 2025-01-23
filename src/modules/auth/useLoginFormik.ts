import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router";
import { UserLoginData } from "./auth.types";
import { loginUser } from "../../redux/slices/auth/authThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const useLoginFormik = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return useFormik<UserLoginData>({
    initialValues: {
      userName: "",
      code: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Ingrese un nombre valido"),
      code: Yup.string().required("Debe ingresar un codigo de acceso"),
    }),
    onSubmit: async (
      values: UserLoginData,
      formikHelpers: FormikHelpers<UserLoginData>
    ) => {
      formikHelpers.setSubmitting(true);
      const thunkResponse = await dispatch(loginUser(values));
      console.log("thunkResponse", thunkResponse);
      if (thunkResponse!.status == 200) navigate("/overview");
      formikHelpers.setSubmitting(false);
    },
  });
};
export { useLoginFormik };
