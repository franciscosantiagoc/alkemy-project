import { useFormik } from "formik";
import * as Yup from "yup";
import "./TaskForm.styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { VITE_API_ENDPOINT } = import.meta.env;

export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    fetch(`${VITE_API_ENDPOINT}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        task: values,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Tarea creada correctamente");
        resetForm();
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(6, "Longitud minima de 6 caracteres")
      .required("El titulo es requerido"),
    status: Yup.string().required("El estatus es requerido"),
    importance: Yup.string().required("La prioridad es requerida"),
    description: Yup.string().required("La descripción es requerida"),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik;

  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <p>Crea tus tareas para gestionarlos con SCRUM</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              onChange={handleChange}
              placeholder="Título"
              onBlur={handleBlur}
              className={errors.title && touched.title ? "error" : ""}
              value={values.title}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status && touched.status ? "error" : ""}
              value={values.status}
            >
              <option value="">Seleccionar un estado</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
          <div>
            <select
              name="importance"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.importance && touched.importance ? "error" : ""}
              value={values.importance}
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className="error-message">{errors.importance}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción"
            onBlur={handleBlur}
            className={errors.importance && touched.importance ? "error" : ""}
            value={values.description}
          />
          {errors.description && touched.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>
        <button type="submit">Crear</button>
      </form>
      <ToastContainer />
    </section>
  );
};
