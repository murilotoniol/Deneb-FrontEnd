export const validateService = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = "O nome do serviço deve ter pelo menos 3 caracteres.";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "A descrição deve ter no mínimo 10 caracteres.";
  }

  return errors;
};
