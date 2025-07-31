// FormTesting.tsx
"use client";

import React, { useState } from "react";
import FormInput from "@/components/forms/GeneralForm";
import type { FormAdultData } from "@/components/forms/types";
import { getResultMessage } from "./resultMessages";

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
  Comunicação: [
    {
      id: "E1",
      question:
        "Quando está em grupo, você espera os outros falarem antes de se sentir confortável para falar?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E2",
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
      id: "E3",
      question:
        "Você se sente confortável iniciando conversas em ambientes desconhecidos?",
      options: [
        { value: 1, label: "Nunca" },
        { value: 2, label: "Raramente" },
        { value: 3, label: "Frequentemente" },
        { value: 4, label: "Sempre" },
      ],
    },
    {
      id: "E4",
      question:
        "Você precisa ensaiar ou planejar o que vai dizer antes de falar?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E5",
      question:
        "Você já foi corrigida por parecer rude ou direta demais sem perceber?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Expressão: [
    {
      id: "E6",
      question:
        "Já te disseram que sua expressão facial nem sempre combina com o que você está sentindo?",
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
        "Em reuniões ou festas, você observa e imita o jeito de falar das pessoas para parecer mais natural?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E8",
      question:
        "Quando há muitas pessoas falando ao mesmo tempo, você consegue acompanhar a conversa facilmente?",
      options: [
        { value: 1, label: "Nunca" },
        { value: 2, label: "Raramente" },
        { value: 3, label: "Frequentemente" },
        { value: 4, label: "Sempre" },
      ],
    },
    {
      id: "E9",
      question:
        "Você já se pegou praticando expressões faciais ou tom de voz para soar mais 'natural'?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E10",
      question:
        "Em discussões, você já foi acusada de não demonstrar empatia, mesmo quando estava preocupada?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Comportamentos: [
    {
      id: "E11",
      question:
        "Você sente necessidade de repetir frases ou palavras específicas ao longo do dia?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E12",
      question:
        "Se um plano muda de última hora, você sente um incômodo físico ou mental?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E13",
      question:
        "Você prefere seguir uma rotina fixa e sente dificuldade em improvisar?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Sensorialidade: [
    {
      id: "E14",
      question:
        "Você já se sentiu fisicamente desconfortável ao ser interrompida enquanto falava de algo que gosta?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E15",
      question:
        "Você precisa organizar seus objetos de maneira específica (por cor, tamanho, simetria, etc.)?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
  Interesses: [
    {
      id: "E16",
      question:
        "Quando se interessa por um assunto, você sente necessidade de aprender tudo sobre ele?",
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
        "Você se sente desconfortável quando precisa lidar com várias tarefas ao mesmo tempo?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
  Percepção: [
    {
      id: "E18",
      question:
        "Você sente incômodo extremo ao ouvir sons altos ou repetitivos, como buzinas ou mastigação?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E19",
      question:
        "Você sente necessidade de tocar em certas texturas ou evita tocar em algumas por desconforto?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E20",
      question:
        "Você já sentiu enjoo ou tontura por causa de luzes muito brilhantes ou piscantes?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
  Organização: [
    {
      id: "E21",
      question:
        "Você já perdeu compromissos ou prazos por esquecer completamente, mesmo que fosse importante para você?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E22",
      question:
        "Você sente dificuldade em começar tarefas mesmo sabendo que precisa fazê-las?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E23",
      question:
        "Você costuma precisar de lembretes visuais ou alarmes para lembrar de tarefas diárias?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
};

const INITIAL_FORM_STATE: FormAdultData = {
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

const FormTesting: React.FC = () => {
  const [formData, setFormData] = useState<FormAdultData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resposta, setResposta] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cidade, setCidade] = useState("");

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
        "https://python-api-autinosis.onrender.com/predict_adult",
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
    const resultMessage = getResultMessage(resposta, 'adult');
    
    return (
      <div className="my-10 rounded-lg bg-white p-6 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          {resultMessage.title}
        </h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          {resultMessage.description}
        </p>
        
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
        Questionário de Avaliação para Adultos
      </h1>

      {error && (
        <div className="mb-6 border-l-4 border-red-500 bg-red-100 p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Questões Originais */}
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
            label="Costuma notar pequenos sons quando outros não percebem?"
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
            label="Acha fácil fazer mais de uma coisa de uma só vez?"
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
            label="Acha fácil 'ler nas entrelinhas' quando alguém está falando contigo?"
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
            label="Sabe dizer se alguém que está te ouvindo está ficando entediado?"
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
            label="Quando está lendo uma história, acha difícil descobrir as intenções dos personagens?"
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
            label="Gosta de coletar informações sobre categorias das coisas? (ex: tipos de carro, pássaro, trem, planta etc.)"
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
            label="Acha fácil descobrir o que alguém está pensando ou sentindo apenas olhando no rosto da pessoa?"
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
            label="Tem dificuldade em compreender as intenções das pessoas?"
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

        {/* Questões Complementares */}
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Questões Complementares
          </h2>
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              As questões a seguir são complementares e ajudam a ter uma visão
              mais ampla do seu perfil. 
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

export default FormTesting;
