// FormAdolescent.tsx
"use client";

import React, { useState } from "react";
import FormInput from "@/components/forms/GeneralForm";
import type { FormAdolescentData } from "@/components/forms/types";

const INITIAL_FORM_STATE: FormAdolescentData = {
  Ethnicity: "",
  jundice: "",
  Gender: "f",
  Relation: "",
  Autism: 1,
  Result: 1,
  Target: "",
  A1: "",
  A2: "",
  A3: "",
  A4: "",
  A5: "",
  A6: "",
  A7: "",
  A8: "",
  A9: "",
  A10: "",
  Age: 0,
  Email: "",
};

const FormAdolescent: React.FC = () => {
  const [formData, setFormData] = useState<FormAdolescentData>(
    INITIAL_FORM_STATE
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resposta, setResposta] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cidade, setCidade] = React.useState("");

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "https://python-api-autinosis.onrender.com/predict_adolescent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setResposta(responseData.Result);
    } catch (error) {
      console.error("Error making prediction:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao processar sua solicitação"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setResposta(null);
    setError(null);
  };

  if (resposta !== null) {
    const linkDoctoralia = `https://www.doctoralia.com.br/resultados?search%5Bspecializations%5D%5B%5D=autismo&search%5Blocations%5D%5B%5D=${encodeURIComponent(cidade)}`;
    return (
      <div className="my-10 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Resultado da Avaliação
        </h2>
        <p className="text-4xl font-bold text-blue-600 mb-6">{resposta}%</p>
        <p className="text-gray-600 mb-6">
          Este resultado indica a probabilidade de presença de características
          associadas ao TEA com base nas informações fornecidas.
        </p>
        {resposta > 0 && (
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Digite sua cidade para buscar profissionais especialistas em autismo:</label>
            <input
              type="text"
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              placeholder="Digite sua cidade"
              className="border rounded px-3 py-2 mb-2 w-full"
            />
            {cidade && (
              <a
                href={linkDoctoralia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mt-2"
              >
                Ver profissionais especialistas em autismo perto de {cidade}
              </a>
            )}
          </div>
        )}
        <button
          onClick={resetForm}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Realizar nova avaliação
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Questionário de Avaliação para Adolescentes
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Qual a sua idade?"
          name="Age"
          type="number"
          placeholder="18"
          value={formData.Age}
          onChange={handleInputChange}
        />

        <FormInput
          label="Seu Email"
          name="Email"
          type="email"
          placeholder="seuemail@exemplo.com"
          value={formData.Email}
          onChange={handleInputChange}
        />

        <FormInput
          label="Você sempre percebe padrões nas coisas?"
          name="A1"
          type="select"
          value={formData.A1}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Normalmente concentra-se mais no todo, em vez de pequenos detalhes?"
          name="A2"
          type="select"
          value={formData.A2}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Quando está em um grupo social, consegue facilmente acompanhar conversas de várias pessoas?"
          name="A3"
          type="select"
          value={formData.A3}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Em caso de interrupção, consegue voltar ao que estava fazendo com facilidade?"
          name="A4"
          type="select"
          value={formData.A4}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Frequentemente nota que não consegue manter uma conversa?"
          name="A5"
          type="select"
          value={formData.A5}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Socialmente, é bom em tagarelar?"
          name="A6"
          type="select"
          value={formData.A6}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Quando mais novo, gostava de brincar de faz-de-conta com outras crianças?"
          name="A7"
          type="select"
          value={formData.A7}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Tem dificuldades em imaginar como seria ser outra pessoa?"
          name="A8"
          type="select"
          value={formData.A8}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Acha situações sociais algo fácil?"
          name="A9"
          type="select"
          value={formData.A9}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Tem dificuldade em fazer novos amigos?"
          name="A10"
          type="select"
          value={formData.A10}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Concordo totalmente" },
            { value: 2, label: "Concordo" },
            { value: 3, label: "Discordo" },
            { value: 4, label: "Discordo totalmente" },
          ]}
        />

        <FormInput
          label="Você tem icterícia?"
          name="jundice"
          type="select"
          value={formData.jundice}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Sim" },
            { value: 0, label: "Não" },
          ]}
        />

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
          >
            {isSubmitting ? "Processando..." : "Enviar"}
          </button>
        </div>
      </form>

      {isSubmitting && (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Processando sua solicitação...</p>
        </div>
      )}
    </section>
  );
};

export default FormAdolescent;
