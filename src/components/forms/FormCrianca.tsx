// FormCrianca.tsx
"use client";

import React, { useState } from "react";
import removeAccents from "remove-accents";
import FormInput from "@/components/forms/GeneralForm"
import type { FormCriancaData } from "@/components/forms/types";

const INITIAL_FORM_STATE: FormCriancaData = {
  Ethnicity: "",
  Jaundice: 1,
  ASD_Family: 0,
  Age_Mons: 0,
  Email: "",
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
};

const FormCrianca: React.FC = () => {
  const [formData, setFormData] = useState<FormCriancaData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resposta, setResposta] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cidade, setCidade] = React.useState("");
  const cidadeUrl = removeAccents(cidade.trim().toLowerCase().replace(/\s+/g, "-"));
  const linkDoctoralia = `https://www.doctoralia.com.br/doencas/autismo/${cidadeUrl}`;

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
        "https://python-api-autinosis.onrender.com/predict_child",
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Encontre profissionais especialistas em autismo
              </label>
              <input
                type="text"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                placeholder="Digite sua cidade"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {cidade && (
              <a
                href={linkDoctoralia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Buscar profissionais em {cidade}
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
    <section className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Questionário de Avaliação para Crianças
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Qual a idade da criança (em meses)"
          name="Age_Mons"
          type="number"
          placeholder="18"
          value={formData.Age_Mons}
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
          label="A criança olha para você quando chama pelo nome dela?"
          name="A1"
          type="select"
          value={formData.A1}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Sempre" },
            { value: 2, label: "Habitualmente" },
            { value: 3, label: "As vezes" },
            { value: 4, label: "Raramente" },
          ]}
        />

        <FormInput
          label="O quão fácil é para você conseguir contato visual com a criança?"
          name="A2"
          type="select"
          value={formData.A2}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muito fácil" },
            { value: 2, label: "Bastante fácil" },
            { value: 3, label: "Bastante difícil" },
            { value: 4, label: "Muito difícil" },
          ]}
        />

        <FormInput
          label="A sua criança aponta para indicar que quer alguma coisa?"
          name="A3"
          type="select"
          value={formData.A3}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muitas vezes por dia" },
            { value: 2, label: "Algumas vezes por dia" },
            { value: 3, label: "Algumas vezes por semana" },
            { value: 4, label: "Menos de uma vez por semana" },
          ]}
        />

        <FormInput
          label="A criança aponta para compartilhar interesse com você? (ex: apontar para um local interessante)"
          name="A4"
          type="select"
          value={formData.A4}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muitas vezes por dia" },
            { value: 2, label: "Algumas vezes por dia" },
            { value: 3, label: "Algumas vezes por semana" },
            { value: 4, label: "Menos de uma vez por semana" },
          ]}
        />

        <FormInput
          label="A criança 'faz de conta'? (ex: ao cuidar de bonecas ou usar um telefone de brinquedo)"
          name="A5"
          type="select"
          value={formData.A5}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muitas vezes por dia" },
            { value: 2, label: "Algumas vezes por dia" },
            { value: 3, label: "Algumas vezes por semana" },
            { value: 4, label: "Menos de uma vez por semana" },
          ]}
        />

        <FormInput
          label="A criança acompanha o seu olhar?"
          name="A6"
          type="select"
          value={formData.A6}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muitas vezes por dia" },
            { value: 2, label: "Algumas vezes por dia" },
            { value: 3, label: "Algumas vezes por semana" },
            { value: 4, label: "Menos de uma vez por semana" },
          ]}
        />

        <FormInput
          label="Se você ou alguém da família estiver visivelmente aborrecido, a criança mostra sinais de querer confortá-lo?"
          name="A7"
          type="select"
          value={formData.A7}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Sempre" },
            { value: 2, label: "Habitualmente" },
            { value: 3, label: "As vezes" },
            { value: 4, label: "Raramente" },
          ]}
        />

        <FormInput
          label="Descreveria as primeiras palavras da sua criança como?"
          name="A8"
          type="select"
          value={formData.A8}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muito comuns" },
            { value: 2, label: "Bastante comuns" },
            { value: 3, label: "Ligeiramente comuns" },
            { value: 4, label: "Muito incomuns" },
            { value: 5, label: "Minha criança não fala" },
          ]}
        />

        <FormInput
          label="A criança usa gestos simples (ex: acenar adeus)?"
          name="A9"
          type="select"
          value={formData.A9}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muitas vezes por dia" },
            { value: 2, label: "Algumas vezes por dia" },
            { value: 3, label: "Algumas vezes por semana" },
            { value: 4, label: "Menos de uma vez por semana" },
          ]}
        />

        <FormInput
          label="A criança olha fixamente para o nada sem razão aparente?"
          name="A10"
          type="select"
          value={formData.A10}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Muitas vezes por dia" },
            { value: 2, label: "Algumas vezes por dia" },
            { value: 3, label: "Algumas vezes por semana" },
            { value: 4, label: "Menos de uma vez por semana" },
          ]}
        />

        <FormInput
          label="A criança possui icterícia?"
          name="Jaundice"
          type="select"
          value={formData.Jaundice}
          onChange={handleInputChange}
          options={[
            { value: 1, label: "Sim" },
            { value: 0, label: "Não" },
          ]}
        />

        <FormInput
          label="Alguém na família possui TEA?"
          name="ASD_Family"
          type="select"
          value={formData.ASD_Family}
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

export default FormCrianca;
