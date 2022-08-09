import Swal from "sweetalert2";

export const sweetError = () => {
  Swal.fire({
    title: "Credenciales incorrectas",
    text: "Usuario o contraseñas inválidas",
    confirmButtonText: "Aceptar",
    width: "400px",
    timer: 10000,
    timerProgressBar: true,
  });
};
