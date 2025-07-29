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
  // Questões extras
  E1?: string;
  E2?: string;
  E3?: string;
  E4?: string;
  E5?: string;
  E6?: string;
  E7?: string;
  E8?: string;
  E9?: string;
  E10?: string;
  E11?: string;
  E12?: string;
  E13?: string;
  E14?: string;
  E15?: string;
  E16?: string;
  E17?: string;
  E18?: string;
  E19?: string;
  E20?: string;
  E21?: string;
  E22?: string;
  E23?: string;
  E24?: string;
  E25?: string;
  E26?: string;
  E27?: string;
  E28?: string;
  E29?: string;
  E30?: string;
  E31?: string;
  E32?: string;
  [key: string]: string | number; // Para permitir propriedades dinâmicas
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
  // Questões extras
  E1?: string;
  E2?: string;
  E3?: string;
  E4?: string;
  E5?: string;
  E6?: string;
  E7?: string;
  E8?: string;
  E9?: string;
  E10?: string;
  E11?: string;
  E12?: string;
  E13?: string;
  E14?: string;
  E15?: string;
  E16?: string;
  E17?: string;
  E18?: string;
  E19?: string;
  E20?: string;
  E21?: string;
  E22?: string;
  E23?: string;
  E24?: string;
  E25?: string;
  E26?: string;
  E27?: string;
  E28?: string;
  E29?: string;
  E30?: string;
  [key: string]: string | number; // Para permitir propriedades dinâmicas
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
  // Questões extras
  E1?: string;
  E2?: string;
  E3?: string;
  E4?: string;
  E5?: string;
  E6?: string;
  E7?: string;
  E8?: string;
  E9?: string;
  E10?: string;
  E11?: string;
  E12?: string;
  E13?: string;
  E14?: string;
  E15?: string;
  E16?: string;
  E17?: string;
  E18?: string;
  E19?: string;
  E20?: string;
  E21?: string;
  E22?: string;
  E23?: string;
  [key: string]: string | number; // Para permitir propriedades dinâmicas
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
