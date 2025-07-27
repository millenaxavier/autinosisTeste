// types.ts
export interface FormCriancaData {
  Ethnicity: string;
  Jaundice: number;
  ASD_Family: number;
  Age_Mons: number;
  Email: string;
  A1: string;
  A2: string;
  A3: string;
  A4: string;
  A5: string;
  A6: string;
  A7: string;
  A8: string;
  A9: string;
  A10: string;
}

export interface FormAdolescentData {
  Ethnicity: string;
  jundice: string;
  Gender: string;
  Relation: string;
  Autism: number;
  Result: number;
  Target: string;
  A1: string;
  A2: string;
  A3: string;
  A4: string;
  A5: string;
  A6: string;
  A7: string;
  A8: string;
  A9: string;
  A10: string;
  Age: number;
  Email: string;
}

export interface FormAdultData {
  Ethnicity: string;
  jundice: string;
  Gender: string;
  Relation: string;
  Autism: number;
  Result: number;
  Target: string;
  A1: string;
  A2: string;
  A3: string;
  A4: string;
  A5: string;
  A6: string;
  A7: string;
  A8: string;
  A9: string;
  A10: string;
  Age: number;
  Email: string;
}

export interface FormInputProps {
  label: string;
  name: keyof FormCriancaData | keyof FormAdolescentData | keyof FormAdultData;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  type?: "text" | "number" | "email" | "select";
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
}
