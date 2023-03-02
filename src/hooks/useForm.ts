import { useState, ChangeEvent } from "react";
import { TFormValues } from "../services/types/data";

export function useForm(inputValues: TFormValues) {
  const [values, setValues] = useState<TFormValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
      setValues({ ...values, [name]: value});    
  };
  return { values, handleChange, setValues };
}
