export function formatFecha(fecha) {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad;

  const mes = hoy.getMonth() - fechaNac.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad = hoy.getFullYear() - fechaNac.getFullYear() - 1;
  } else {
    edad = hoy.getFullYear() - fechaNac.getFullYear();
  }

  if (edad < 1) {
    const meses =
      (hoy.getMonth() -
        fechaNac.getMonth() +
        12 * (hoy.getFullYear() - fechaNac.getFullYear())) %
      12;
    return `${meses} meses`;
  } else {
    return `${edad} años`;
  }
}
