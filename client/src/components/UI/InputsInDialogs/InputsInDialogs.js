import { useState, useEffect } from 'react';

export default () => {
  // Initializing state variable
  const [value, setValue] = useState(""); 
  // Persisting the form
  useEffect(function persistForm() {
    localStorage.setItem(`${value}`, value);
  });

  return {
    value,
    onChange: event => {
      setValue(event.target.value);
    },
    reset: () => setValue('')
  };
}
