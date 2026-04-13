import { useState, useCallback } from 'react';

function useForm(initialValues, validate = () => ({})) {
  const [values,  setValues]  = useState(initialValues);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues(prev => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      const newErrors = validate({ ...values, [name]: newValue });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  }, [values, touched, validate]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validate(values);
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  }, [values, validate]);

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(validate(values)).length === 0;

  return { values, errors, touched, isSubmitting, isValid, handleChange, handleBlur, handleSubmit, reset };
}

export default useForm;