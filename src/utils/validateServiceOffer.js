// src/utils/validateServiceOffer.js

export const validateServiceOffer = data => {
  const errors = {};

  // Validações para o serviço base
  if (!data.name || data.name.trim() === '') {
    errors.name = 'O nome do serviço é obrigatório.';
  }

  if (!data.animalType || data.animalType.trim() === '') {
    errors.animalType = 'O tipo de animal é obrigatório.';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description =
      'A descrição do serviço base é muito curta (mínimo 10 caracteres).';
  }

  // Validação para a oferta específica
  if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
    errors.price =
      'O preço da oferta é inválido. Deve ser um número maior que zero.';
  }

  return errors;
};
