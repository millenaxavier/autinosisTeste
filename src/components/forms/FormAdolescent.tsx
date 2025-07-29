// FormAdolescent.tsx
"use client";

import React, { useState } from "react";
import FormInput from "@/components/forms/GeneralForm";
import type { FormAdolescentData } from "@/components/forms/types";

// Definindo o tipo para as questões extras
interface ExtraQuestion {
  id: string;
  question: string;
  options: Array<{
    value: number;
    label: string;
  }>;
}

interface ExtraQuestions {
  [category: string]: ExtraQuestion[];
}

const EXTRA_QUESTIONS: ExtraQuestions = {
  Padrões: [
    {
      id: "E1",
      question:
        "Você sempre percebe padrões nas coisas ao seu redor, como sequências de números ou repetições em músicas?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E2",
      question:
        "Quando vê um filme ou lê um livro, você percebe pequenos detalhes que outras pessoas geralmente ignoram?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E3",
      question:
        "Você sente que precisa organizar objetos de um jeito específico (por cor, tamanho, simetria, etc.)?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E4",
      question:
        "Quando você aprende algo novo, você prefere entender o conceito geral antes de focar nos detalhes?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E5",
      question:
        "Você se sente frustrado quando outras pessoas não percebem padrões que são óbvios para você?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Interação: [
    {
      id: "E6",
      question:
        "Quando está em um grupo social, consegue facilmente acompanhar conversas de várias pessoas ao mesmo tempo?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E7",
      question:
        "Você se sente confortável iniciando uma conversa com alguém que não conhece bem?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E8",
      question:
        "Você já sentiu que as pessoas não entenderam o que você quis dizer, mesmo que tenha explicado claramente?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E9",
      question:
        "Você sente dificuldade em entender o tom de voz ou expressões faciais das pessoas?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E10",
      question:
        "Socialmente, você se considera bom em tagarelar sobre qualquer assunto?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Comunicação: [
    {
      id: "E11",
      question:
        "Você já sentiu que precisa ensaiar mentalmente o que vai dizer antes de falar?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E12",
      question:
        "Em conversas, as pessoas já disseram que você muda de assunto de repente?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E13",
      question:
        "Você já foi corrigido por parecer rude ou direto demais sem perceber?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E14",
      question:
        "Você sente que precisa imitar a maneira como os outros falam para parecer mais natural?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E15",
      question:
        "Você sente dificuldade em entender piadas ou expressões que não devem ser levadas ao pé da letra?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Imaginação: [
    {
      id: "E16",
      question:
        "Quando era mais novo, gostava de brincar de faz-de-conta com outras crianças?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E17",
      question:
        "Você sente dificuldade em imaginar como seria ser outra pessoa?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E18",
      question:
        "Você se sente desconfortável quando precisa improvisar uma história ou brincadeira?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E19",
      question:
        "Você tem facilidade em criar histórias na sua mente, mas dificuldade em expressá-las para os outros?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E20",
      question:
        "Você prefere brincadeiras que tenham regras claras e estruturadas, em vez de brincadeiras imaginativas?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Socialização: [
    {
      id: "E21",
      question: "Acha situações sociais algo fácil de lidar?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E22",
      question: "Você sente dificuldade em fazer novos amigos?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E23",
      question:
        "Você já teve a sensação de que as outras pessoas têm uma conexão automática que você não entende?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E24",
      question:
        "Você sente necessidade de ficar sozinho depois de passar muito tempo com outras pessoas?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E25",
      question:
        "Você prefere conversar sobre seus interesses específicos do que sobre assuntos mais gerais?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Organização: [
    {
      id: "E26",
      question:
        "Em caso de interrupção, consegue voltar ao que estava fazendo com facilidade?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E27",
      question:
        "Você sente dificuldade em começar tarefas mesmo sabendo que precisa fazê-las?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E28",
      question:
        "Você já se sentiu frustrado porque não conseguiu organizar seus pensamentos para explicar algo?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E29",
      question:
        "Você costuma precisar de lembretes ou alarmes para lembrar de tarefas importantes?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E30",
      question:
        "Você já ficou tão focado em algo que esqueceu de fazer outras coisas ao seu redor?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
};

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
  // Inicializando as questões extras
  ...Object.values(EXTRA_QUESTIONS).reduce(
    (acc, questions) => {
      questions.forEach((q) => {
        acc[q.id] = "";
      });
      return acc;
    },
    {} as Record<string, string>,
  ),
};

const FormAdolescent: React.FC = () => {
  const [formData, setFormData] =
    useState<FormAdolescentData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resposta, setResposta] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cidade, setCidade] = useState("");

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev: FormAdolescentData) => ({
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
        },
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
          : "Ocorreu um erro ao processar sua solicitação",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setResposta(null);
    setError(null);
    setCidade("");
  };

  // Função para gerar o link do Doctoralia
  const getDoctoraliaLink = (cidade: string) => {
    // Remove acentos e converte para minúsculas
    const cidadeSemAcentos = cidade
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    
    // Converte espaços em hífens e remove caracteres especiais
    const cidadeUrl = cidadeSemAcentos
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    return `https://www.doctoralia.com.br/doencas/autismo/${cidadeUrl}`;
  };

  if (resposta !== null) {
    return (
      <div className="my-10 rounded-lg bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Resultado da Avaliação
        </h2>
        <p className="mb-6 text-4xl font-bold text-blue-600">{resposta}%</p>
        <p className="mb-6 text-gray-600">
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
                href={getDoctoraliaLink(cidade)}
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
          className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Realizar nova avaliação
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Questionário de Avaliação para Adolescentes
      </h1>

      {error && (
        <div className="mb-6 border-l-4 border-red-500 bg-red-100 p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Questões para Avaliação
          </h2>
          <div className="mb-6 rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              As questões abaixo são utilizadas para calcular o resultado da
              avaliação.
            </p>
          </div>

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
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Questões Complementares
          </h2>
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              As questões a seguir são complementares e ajudam a ter uma visão
              mais ampla do seu perfil em situações específicas. 
            </p>
          </div>

          {Object.entries(EXTRA_QUESTIONS).map(([category, questions]) => (
            <div key={category} className="mb-8">
              <h3 className="mb-4 text-lg font-medium capitalize text-gray-700">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <div className="space-y-4">
                {questions.map((question) => (
                  <FormInput
                    key={question.id}
                    label={question.question}
                    name={question.id}
                    type="select"
                    value={formData[question.id] || ""}
                    onChange={handleInputChange}
                    options={question.options}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
          >
            {isSubmitting ? "Processando..." : "Enviar"}
          </button>
        </div>
      </form>

      {isSubmitting && (
        <div className="mt-6 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Processando sua solicitação...</p>
        </div>
      )}
    </section>
  );
};

export default FormAdolescent;
