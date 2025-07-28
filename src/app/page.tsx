/* eslint-disable no-magic-numbers */
"use client";

// pages/index.tsx
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useState, useEffect } from "react";
import IniciarTriagemButton from "@/components/IniciarTriagemButton";
import AuthStatus from "@/components/AuthStatus";

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
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white to-blue-50"
          >
            {/* Hero Section */}
            <section className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 relative">
              {/* Animated background elements */}
              <motion.div
                className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                animate={{
                  x: [0, 30, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                animate={{
                  x: [0, -40, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                }}
              />

              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4"
              >
                Autinosis.
                <br className="max-md:hidden" />
                <motion.span
                  custom={1}
                  variants={fadeIn}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700"
                >
                  Impulsionado por IA
                </motion.span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mb-8"
              >
                Revolucionando a triagem de autismo com inteligência artificial
                de ponta. A detecção precoce leva a melhores resultados e
                suporte personalizado.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <IniciarTriagemButton variant="hero" />

                <Link href="/learn-more">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    Saiba Mais
                  </motion.button>
                </Link>
              </motion.div>
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

            {/* Testimonials */}
            <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
              <motion.div
                initial="hidden"
                animate={scrollY > 900 ? "visible" : "hidden"}
                variants={staggerContainer}
                className="max-w-6xl mx-auto"
              >
                <motion.div
                  custom={0}
                  variants={fadeIn}
                  className="text-center mb-16"
                >
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                    Histórias de Sucesso
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Confiado por Famílias e Profissionais
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Veja como o Autinosis está fazendo a diferença na detecção
                    precoce do autismo
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      quote:
                        "A detecção precoce por meio do Autinosis nos ajudou a obter apoio para nosso filho 18 meses antes do que poderíamos ter conseguido de outra forma.",
                      author: "Sarah M., Responsável",
                      avatar: "/images/avatar1.jpg",
                    },
                    {
                      quote:
                        "Como pediatra, descobri que o Autinosis é uma ferramenta inestimável na minha prática. A triagem impulsionada por IA complementa os métodos tradicionais.",
                      author: "Dr. James Wilson, Pediatra",
                      avatar: "/images/avatar2.jpg",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      custom={index + 1}
                      variants={fadeIn}
                      className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                    >
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            width={48}
                            height={48}
                          />
                        </div>
                        <p className="font-medium text-gray-900">
                          {testimonial.author}
                        </p>
                      </div>
                    </motion.div>
                  ))}
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
                  <h3 className="text-lg font-semibold mb-4">Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="https://google.com"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Sobre Nós
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://google.com"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Nossa Tecnologia
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://google.com"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Pesquisa
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://google.com"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Perguntas Frequentes
                      </Link>
                    </li>
                  </ul>
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

                <div>
                  <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
                  <div className="flex space-x-4">
                    {["twitter", "facebook", "instagram", "linkedin"].map(
                      (social) => (
                        <a
                          key={social}
                          href={`https://${social}.com/autinosis`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition-colors"
                        >
                          <span className="sr-only">{social}</span>
                          {/* Social icon would go here - simplified for the example */}
                          <div className="w-5 h-5 bg-white/20 rounded-sm"></div>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-sm text-gray-500">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p>
                    © {new Date().getFullYear()} Autinosis. Todos os direitos
                    reservados.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link
                      href="/privacy"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Política de Privacidade
                    </Link>
                    <Link
                      href="/terms"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Termos de Serviço
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
