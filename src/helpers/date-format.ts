export const dateFormat = (value?: Date) => {
  const now = new Date();
  value = value || now;
  return new Date(value).toLocaleDateString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
