import { useFormik } from "formik";
import * as Yup from "yup";
import "./TaskForm.styles.css";

export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };

  const onSubmit = (formData) => {
    //event.preventDefault();
    //alert();
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(6, "Longitud minima de 6 caracteres")
      .required("El titulo es requerido"),
    status: Yup.string().required("El estatus es requerido"),
    priority: Yup.string().required("La prioridad es requerida"),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur } = formik;

  console.log("errors", formik);

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
              className={errors.title ? "error" : ""}
            />
            {errors.title && touched.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div>
            <select
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status ? "error" : ""}
            >
              <option value="">Seleccionar un estado</option>
              <option value="new">Nueva</option>
              <option value="inProcess">En proceso</option>
              <option value="finished">Terminada</option>
            </select>
            {errors.status && touched.status && <span className="error-message">{errors.status}</span>}
          </div>
          <div>
            <select
              name="priority"
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.priority ? "error" : ""}
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            {errors.priority && touched.priority && (
              <span className="error-message">{errors.priority}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
