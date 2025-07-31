/* eslint-disable no-magic-numbers */
"use client";

// pages/index.tsx
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState, useEffect } from "react";
import AuthStatus from "@/components/AuthStatus";
import IniciarTriagemButton from "@/components/IniciarTriagemButton";

// Custom hook for animation on scroll
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};

const Home: FC = () => {
  const scrollY = useScroll();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut" as const,
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      title: "Detecção Precoce",
      description:
        "Identifique sinais potenciais de autismo nas fases iniciais do desenvolvimento",
      icon: "🔍",
    },
    {
      title: "Análise com IA",
      description:
        "Algoritmos avançados analisam padrões comportamentais com alta precisão",
      icon: "🧠",
    },
    {
      title: "Suporte Profissional",
      description:
        "Conecte-se com especialistas com base nos resultados da triagem",
      icon: "👨‍⚕️",
    },
    {
      title: "Aprendizado Contínuo",
      description:
        "Nossa IA melhora constantemente sua precisão através de novos dados de pesquisa",
      icon: "📈",
    },
  ];

  return (
    <>
      <>
        <title>Autinosis | Triagem de Autismo com IA</title>
        <meta
          name="description"
          content="Triagem revolucionária de autismo impulsionada por inteligência artificial"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </>

      <AnimatePresence>
        {isLoaded && (
          <section className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white to-blue-50">
            {/* Hero Section */}
            <section className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 relative">
              {/* Animated background elements */}
              <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

              <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
                Autinosis.
                <br className="max-md:hidden" />
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
                  Impulsionado por IA
                </span>
              </h1>

              <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mb-8">
                Revolucionando a triagem de autismo com inteligência artificial
                de ponta. A detecção precoce leva a melhores resultados e
                suporte personalizado.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <IniciarTriagemButton variant="hero" />
              </div>
            </section>

            {/* Auth Status Section */}
            <section className="w-full py-8 px-6 md:px-12 lg:px-24">
              <div className="max-w-4xl mx-auto">
                <AuthStatus />
              </div>
            </section>

            {/* Features Section */}
            <section className="w-full pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
              <motion.div
                initial={false}
                animate={scrollY > 1 ? "visible" : "hidden"}
                variants={staggerContainer}
                className="max-w-7xl mx-auto"
              >
                <motion.div
                  custom={0}
                  variants={fadeIn}
                  className="text-center mb-16"
                >
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                    Nossa Tecnologia
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Como o Autinosis Funciona
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Nossa plataforma impulsionada por IA utiliza algoritmos
                    avançados para analisar padrões comportamentais e fornecer
                    uma detecção precoce e precisa dos transtornos do espectro
                    autista.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      custom={index + 1}
                      variants={fadeIn}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Call To Action */}
            <section className="w-full py-16 bg-gradient-to-r from-blue-500 to-blue-700">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  scrollY > 600 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center px-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Encontre as melhores opções para você ou seu filho
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Nosso processo de triagem leva menos de 15 minutos e fornece
                  insights imediatos com próximos passos e recursos personalizados.
                </p>
                <IniciarTriagemButton variant="cta" />
              </motion.div>
            </section>

            {/* Mídia Section - Destaque na Mídia */}
            <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
              <motion.div
                initial="hidden"
                animate={scrollY > 900 ? "visible" : "hidden"}
                variants={staggerContainer}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                    Autinosis na Mídia
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Reconhecimento Nacional e Internacional
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    O Autinosis já foi destaque em grandes veículos de comunicação, premiações e eventos científicos:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Globo/EPTV */}
                  <a href="https://redeglobo.globo.com/sp/eptv/eptv-na-escola-sul-de-minas/noticia/ia-e-acessibilidade-tecnologias-para-auxiliar-pessoas-com-deficiencia.ghtml" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                      <img src="/assets/images/logo.svg" alt="Globo/EPTV" className="w-10 h-10 mr-3" />
                      <span className="font-semibold text-lg text-gray-900">Globo / EPTV</span>
                    </div>
                    <p className="text-gray-700 mb-2 font-medium">IA e acessibilidade: tecnologias para auxiliar pessoas com deficiência</p>
                    <p className="text-gray-500 text-sm">Reportagem sobre o impacto da IA na inclusão e menção ao Autinosis como ferramenta inovadora para triagem do autismo.</p>
                  </a>
                  {/* SBPC */}
                  <a href="https://portal.sbpcnet.org.br/noticias/programa-que-ajuda-no-diagnostico-de-autismo-e-um-dos-ganhadores-do-premio-carolina-bori/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                      <span className="w-10 h-10 mr-3 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">SBPC</span>
                      <span className="font-semibold text-lg text-gray-900">SBPC</span>
                    </div>
                    <p className="text-gray-700 mb-2 font-medium">Programa que ajuda no diagnóstico de autismo é um dos ganhadores do Prêmio Carolina Bori</p>
                    <p className="text-gray-500 text-sm">Reconhecimento científico nacional pelo uso de IA no diagnóstico do autismo.</p>
                  </a>
                  {/* SICEA */}
                  <a href="https://www.even3.com.br/anais/xiii-sicea-seminario-de-institutos-colegios-e-escolas-de-aplicacao-das-universidades-brasileiras-460542/954180-autinosis--uso-de-machine-learning-para-o-diagnostico-de-transtorno-do-espectro-autista/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                      <span className="w-10 h-10 mr-3 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-700">SICEA</span>
                      <span className="font-semibold text-lg text-gray-900">XIII SICEA</span>
                    </div>
                    <p className="text-gray-700 mb-2 font-medium">Autinosis: uso de machine learning para o diagnóstico de TEA</p>
                    <p className="text-gray-500 text-sm">Apresentação científica do projeto em evento acadêmico nacional.</p>
                  </a>
                  {/* Danilo Gentili */}
                  <a href="https://www.youtube.com/watch?v=Q87Lm5BjEmM" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                      <span className="w-10 h-10 mr-3 bg-black rounded-full flex items-center justify-center font-bold text-white">DN</span>
                      <span className="font-semibold text-lg text-gray-900">The Noite com Danilo Gentili</span>
                    </div>
                    <p className="text-gray-700 mb-2 font-medium">Participação e menção ao Autinosis em rede nacional.</p>
                    <p className="text-gray-500 text-sm">Reconhecimento em programa de grande audiência nacional.</p>
                  </a>
                </div>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="w-full py-12 px-6 md:px-12 lg:px-24 bg-gray-900 text-gray-300">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg font-bold">A</span>
                    </div>
                    <span className="text-xl font-bold text-white">
                      Autinosis
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Plataforma revolucionária de triagem e suporte para autismo
                    impulsionada por IA.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Contato</h3>
                  <ul className="space-y-2">
                    <li>autinosis@gmail.com</li>
                    <li>+55 32 99856-2006</li>
                    <li>
                      Minas Gerais
                      <br />
                      Brasil
                    </li>
                  </ul>
                </div>
              </div>

              <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-sm text-gray-500">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p>
                    © {new Date().getFullYear()} Autinosis. Todos os direitos
                    reservados.
                  </p>
                </div>
              </div>
            </footer>
          </section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
