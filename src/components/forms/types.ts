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
  [key: string]: string | number; // Para permitir as questões extras (E1, E2, etc)
}

export interface FormAdolescentData {
  // Campos principais
  Ethnicity: string;
  jundice: string;
  Gender: string;
  Relation: string;
  Autism: number;
  Result: number;
  Target: string;
  Age: number;
  Email: string;

  // Questões principais de avaliação
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

  // Questões extras
  [key: string]: string | number; // Para permitir as questões extras E1-E30
}

export type FormAdultData = FormAdolescentData;

export interface FormOption {
  value: number;
  label: string;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "select";
  value: string | number;
  placeholder?: string;
  options?: FormOption[];
  onChange: (name: string, value: string | number) => void;
  required?: boolean;
}
