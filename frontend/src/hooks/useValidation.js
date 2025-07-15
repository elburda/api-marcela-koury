import { useState } from 'react';

/**
 * Hook de validación reutilizable.
 * @returns {Object} { errors, validate, setErrors }
 */
export const useValidation = () => {
    const [errors, setErrors] = useState({});

    /**
     * Valida campos con base en un objeto de reglas.
     * @param {Object} campos - Los valores a validar.
     * @param {Object} reglas - Las reglas, ej: { nombre: 'required' }
     * @returns {boolean} true si todo es válido.
     */
    const validate = (campos, reglas) => {
        const nuevosErrores = {};

        for (const campo in reglas) {
        const regla = reglas[campo];
        const valor = campos[campo];

        if (regla === 'required' && (!valor || valor.toString().trim() === '')) {
            nuevosErrores[campo] = 'Este campo es obligatorio';
        }

        }

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    return { errors, validate, setErrors };
};
