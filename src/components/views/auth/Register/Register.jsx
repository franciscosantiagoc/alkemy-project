import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../Auth.styles.css";

export const Register = () => {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
  };

  const onSubmit = (formData) => {
    //event.preventDefault();
    //alert();
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(6, "Longitud minima de 6 caracteres")
      .required("El nombre de usuario es requirido"),
    password: Yup.string()
      .min(8, "Longitud minima de 8 caracteres")
      .required("La contraseña es requerida"),
    email: Yup.string()
      .email("Debe ser un email válido")
      .required("El email es requerido"),
    role: Yup.string().required("El rol es requerido"),
    continent: Yup.string().required("El continente es requerido"),
    region: Yup.string().required("La región es requerida"),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="userName"
            type="text"
            onChange={handleChange}
            value={values.userName}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <span className="message-error">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="message-error">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <span className="message-error">{errors.email}</span>
          )}
        </div>
        <input
          type="hidden"
          name="teamID"
          value="9cdbd108-f924-4383-947d-8f0c651d0dad"
        />
        <div>
          <label>Rol</label>
          <select
            name="role"
            onChange={handleChange}
            value={values.role}
            onBlur={handleBlur}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Seleccionar un rol</option>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
          {errors.role && touched.role && <span className="message-error">{errors.role}</span>}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={handleChange}
            value={values.continent}
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Seleccionar un continente</option>
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.continent && touched.continent && (
            <span className="message-error">{errors.continent}</span>
          )}
        </div>
        <div>
          <label>Región</label>
          <select
            name="region"
            onChange={handleChange}
            value={values.region}
            onBlur={handleBlur}
            className={errors.region && touched.region ? "error" : ""}
          >
            <option value="">Seleccionar un región</option>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.region && touched.region && (
            <span className="message-error">{errors.region}</span>
          )}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </form>
    </div>
  );
};
