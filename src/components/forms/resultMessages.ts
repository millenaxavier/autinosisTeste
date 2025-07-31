export interface ResultMessage {
  title: string;
  description: string;
  showProfessionalSearch: boolean;
}

export const getResultMessage = (score: number, ageGroup: 'child' | 'adolescent' | 'adult'): ResultMessage => {
  const camuflagemInfo = "A camuflagem autista é o processo em que uma pessoa aprende a esconder traços autistas para se adaptar socialmente — o que pode fazer os sinais parecerem menos visíveis.";

  if (ageGroup === 'child') {
    if (score >= 0 && score <= 20) {
      return {
        title: "Chance baixa de autismo",
        description: `A chance de autismo é baixa, mas isso pode ocorrer devido à camuflagem autista — quando a criança aprende, conscientemente ou não, a esconder comportamentos para se adaptar ao ambiente. ${camuflagemInfo} Sugerimos que familiares também respondam ao formulário, e que um profissional avalie caso ainda haja dúvidas.`,
        showProfessionalSearch: true
      };
    } else if (score >= 21 && score <= 40) {
      return {
        title: "Nível médio-baixo de sinais autistas",
        description: "Nível médio-baixo de sinais autistas. Os comportamentos observados podem estar dentro da variação típica, mas sugerimos atenção e, se possível, uma conversa com profissional especializado.",
        showProfessionalSearch: true
      };
    } else if (score >= 41 && score <= 60) {
      return {
        title: "Nível médio",
        description: "Nível médio. Há sinais consistentes que podem indicar traços do espectro autista. Recomendamos buscar uma avaliação especializada.",
        showProfessionalSearch: true
      };
    } else if (score >= 61 && score <= 80) {
      return {
        title: "Nível médio-alto",
        description: "Nível médio-alto. Foram identificados vários sinais compatíveis com o espectro autista. Avaliação profissional é altamente recomendada.",
        showProfessionalSearch: true
      };
    } else if (score >= 81 && score <= 100) {
      return {
        title: "Alta chance de características do espectro autista",
        description: "Alta chance de características do espectro autista. É muito importante procurar um profissional especializado.",
        showProfessionalSearch: true
      };
    }
  } else if (ageGroup === 'adolescent') {
    if (score >= 0 && score <= 20) {
      return {
        title: "Chance baixa de autismo",
        description: `A chance de autismo é baixa, mas pode estar sendo mascarada por camuflagem autista — um esforço para parecer socialmente adequado. Isso é comum em adolescentes. ${camuflagemInfo} Peça que familiares também ajudem a responder e considere buscar um profissional.`,
        showProfessionalSearch: true
      };
    } else if (score >= 21 && score <= 40) {
      return {
        title: "Nível médio-baixo",
        description: "Nível médio-baixo. Alguns sinais estão presentes. Podem ser compatíveis com variações do desenvolvimento típico ou indicar traços sutis. Sugerimos conversar com um especialista.",
        showProfessionalSearch: true
      };
    } else if (score >= 41 && score <= 60) {
      return {
        title: "Nível médio",
        description: "Nível médio. Os resultados indicam características que podem estar associadas ao espectro autista. Uma avaliação clínica pode ajudar a entender melhor.",
        showProfessionalSearch: true
      };
    } else if (score >= 61 && score <= 80) {
      return {
        title: "Nível médio-alto",
        description: "Nível médio-alto. Os sinais são mais evidentes e consistentes com o espectro autista. Recomendamos fortemente uma avaliação profissional.",
        showProfessionalSearch: true
      };
    } else if (score >= 81 && score <= 100) {
      return {
        title: "Alta chance",
        description: "Alta chance. Vários comportamentos observados são típicos do espectro autista. É importante buscar ajuda profissional para diagnóstico e apoio.",
        showProfessionalSearch: true
      };
    }
  } else if (ageGroup === 'adult') {
    if (score >= 0 && score <= 20) {
      return {
        title: "Chance baixa de autismo",
        description: `A chance de autismo é baixa, mas pode estar sendo ocultada por camuflagem autista — comportamento aprendido ao longo da vida para se adaptar socialmente. ${camuflagemInfo} Reflita sobre sua história e, se persistirem dúvidas, considere falar com um profissional.`,
        showProfessionalSearch: true
      };
    } else if (score >= 21 && score <= 40) {
      return {
        title: "Nível médio-baixo",
        description: "Nível médio-baixo. Há alguns indícios leves. A camuflagem pode dificultar a percepção dos sinais. Conversar com um profissional pode ajudar a esclarecer.",
        showProfessionalSearch: true
      };
    } else if (score >= 41 && score <= 60) {
      return {
        title: "Nível médio",
        description: "Nível médio. Os resultados mostram traços que podem estar relacionados ao espectro. Recomendamos procurar um especialista para uma avaliação aprofundada.",
        showProfessionalSearch: true
      };
    } else if (score >= 61 && score <= 80) {
      return {
        title: "Nível médio-alto",
        description: "Nível médio-alto. Foram detectados vários sinais compatíveis com o autismo. A avaliação clínica é recomendada.",
        showProfessionalSearch: true
      };
    } else if (score >= 81 && score <= 100) {
      return {
        title: "Alta chance",
        description: "Alta chance. Os resultados indicam fortes indícios de características autistas. Buscar avaliação profissional é fortemente recomendado.",
        showProfessionalSearch: true
      };
    }
  }

  // Fallback para casos inesperados
  return {
    title: "Resultado da avaliação",
    description: "Consulte um profissional especializado para uma avaliação completa.",
    showProfessionalSearch: true
  };
}; 