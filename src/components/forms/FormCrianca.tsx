// FormCrianca.tsx
"use client";

import React, { useState } from "react";
import FormInput from "@/components/forms/GeneralForm";
import type { FormCriancaData } from "@/components/forms/types";

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
      question: "Se você sorri para a criança, ela costuma sorrir de volta?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E2",
      question: "A criança faz sons ou balbucia para chamar sua atenção?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E3",
      question:
        "Quando você conversa com a criança, ela responde com palavras, gestos ou sons?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E4",
      question:
        "A criança imita expressões faciais, como quando você faz caretas ou mostra surpresa?",
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
        "A criança faz perguntas para entender o que está acontecendo ao seu redor?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E6",
      question:
        "A criança tenta participar de brincadeiras coletivas ou prefere brincar sozinha?",
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
      id: "E7",
      question:
        "A criança gosta de brincar com outras crianças da mesma idade?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E8",
      question: "A criança inventa histórias ou brincadeiras imaginativas?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E9",
      question:
        "A criança repete falas de desenhos ou filmes em situações que não fazem sentido?",
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
        "A criança tem dificuldade em entender brincadeiras que envolvem revezamento, como pega-pega ou jogos de tabuleiro?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Comportamento: [
    {
      id: "E11",
      question:
        "A criança prefere brinquedos organizados de maneira específica, sem gostar que outros mexam?",
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
        "A criança prefere assistir outras crianças brincando em vez de participar da brincadeira?",
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
        "A criança se incomoda quando outras crianças mudam a forma como uma brincadeira está acontecendo?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E14",
      question:
        "A criança brinca sempre do mesmo jeito, sem variar a maneira de interagir com os brinquedos?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
  Emoções: [
    {
      id: "E15",
      question:
        "A criança tenta compartilhar emoções, como chamar sua atenção para algo que a deixou feliz ou assustada?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E16",
      question:
        "A criança entende quando alguém está triste ou bravo apenas observando a expressão facial?",
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
        "A criança costuma demonstrar empatia quando vê outra pessoa chorando ou machucada?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
  Sensorialidade: [
    {
      id: "E18",
      question:
        "A criança se incomoda quando há muitas pessoas falando ao mesmo tempo?",
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
        "A criança demonstra frustração quando não consegue expressar o que quer?",
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
        "A criança entende quando alguém está brincando ou falando sério?",
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
      id: "E21",
      question:
        "A criança já fez amigos próximos ou prefere interagir apenas com familiares?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E22",
      question:
        "A criança já foi descrita como 'muito séria' ou 'muito reservada' por professores ou cuidadores?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
    {
      id: "E23",
      question: "A criança reage bem a elogios e demonstrações de carinho?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Rotinas: [
    {
      id: "E24",
      question:
        "A criança gosta de seguir rotinas fixas e se incomoda quando algo muda?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E25",
      question:
        "A criança insiste em usar o mesmo objeto (ex: um brinquedo, um copo, uma roupa) todos os dias?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E26",
      question:
        "A criança fica muito frustrada quando há mudanças inesperadas na rotina, como um caminho diferente para a escola?",
      options: [
        { value: 1, label: "Concordo totalmente" },
        { value: 2, label: "Concordo parcialmente" },
        { value: 3, label: "Discordo parcialmente" },
        { value: 4, label: "Discordo totalmente" },
      ],
    },
  ],
  Interesses: [
    {
      id: "E27",
      question:
        "A criança se interessa intensamente por um único tema ou objeto, falando sobre ele repetidamente?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E28",
      question:
        "A criança já demonstrou interesse por assuntos incomuns para a idade, como placas de trânsito ou calendários?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E29",
      question:
        "A criança repete movimentos corporais de forma frequente, como balançar as mãos ou girar em círculos?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
  Perspectiva: [
    {
      id: "E30",
      question:
        "A criança já demonstrou resistência a experimentar novos alimentos por causa da textura ou cheiro?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E31",
      question:
        "A criança se incomoda com certos tipos de roupas ou etiquetas nas roupas?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
    {
      id: "E32",
      question:
        "A criança se assusta com sons altos ou inesperados mais do que outras crianças da mesma idade?",
      options: [
        { value: 1, label: "Sempre" },
        { value: 2, label: "Frequentemente" },
        { value: 3, label: "Raramente" },
        { value: 4, label: "Nunca" },
      ],
    },
  ],
};

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

const FormCrianca: React.FC = () => {
  const [formData, setFormData] = useState<FormCriancaData>(INITIAL_FORM_STATE);
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
        "https://python-api-autinosis.onrender.com/predict_child",
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
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Realizar nova avaliação
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Questionário de Avaliação
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
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Questões Complementares
          </h2>
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              As questões a seguir são complementares e ajudam a ter uma visão
              mais ampla do desenvolvimento da criança. 
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

export default FormCrianca;
