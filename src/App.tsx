/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Brain, BadgeCheck, BarChart3, Workflow, Bot, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-bg-dark text-slate-100 font-sans transition-colors duration-300 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-bg-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity" href="https://roda.ia.br">
              <img src="/logo.png" alt="Roda IA Logo" className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
              <h2 className="text-lg sm:text-2xl font-black tracking-tighter uppercase text-white">Roda IA</h2>
            </a>
            <a 
              className="bg-gradient-to-br from-primary to-secondary text-slate-900 px-3 py-2 sm:px-5 sm:py-2.5 rounded text-[10px] sm:text-sm font-bold hover:brightness-110 transition-all tracking-wider shadow-lg shadow-primary/20 text-center" 
              href="https://wa.me/5524993183300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar <span className="hidden sm:inline">diagnóstico</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-bg-dark py-20 sm:py-32 lg:py-44">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-left space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white">
                Pare de tentar escalar o <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">caos organizacional.</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-2xl">
                Nós mapeamos os seus processos, cuidamos de seu marketing e entregamos inteligência artificial para sustentar o crescimento de sua empresa. 
                Seu negócio não precisa apenas de ferramentas genéricas; ele precisa de estratégia inteligente de ponta a ponta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  className="inline-block w-full sm:w-auto bg-gradient-to-br from-primary to-secondary text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-[0_0_20px_rgba(19,236,164,0.4)] transition-all text-center" 
                  href="https://wa.me/5524993183300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar diagnóstico gratuito
                </a>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-primary/80">
                <BadgeCheck className="w-5 h-5 shrink-0" />
                <span>Liderado por Administrador de Empresas</span>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md mx-auto lg:max-w-[600px] aspect-square relative mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div 
                className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/20 shadow-2xl bg-slate-900 bg-cover bg-center" 
                style={{ backgroundImage: "url('/roda-ia-1.jpg')" }}
              >
              </div>
            </div>
          </div>
        </section>

        {/* Pain & Empathy Section */}
        <section className="bg-bg-light text-slate-900 py-20 sm:py-32 lg:py-44">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6 sm:space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-bg-dark text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-4">
              Visão Estratégica
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Sua empresa não precisa de mais softwares; ela precisa de <span className="underline decoration-primary decoration-4 underline-offset-4 sm:underline-offset-8">engenharia de processos.</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
              O equívoco comum de muitas PMEs é buscar eficiência em ferramentas isoladas e agências externas enquanto negligenciam a base de seus fluxos internos e da estratégia de marketing, o que invariavelmente eleva os custos e compromete a conversão. Nosso diferencial reside na convergência entre a tecnologia de IA e o rigor da ciência da administração, garantindo que a inovação atue como um catalisador de performance operacional, e não apenas como mais uma camada de complexidade.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8 sm:pt-12">
              <div className="flex flex-col p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                <BarChart3 className="text-primary w-10 h-10 mb-4 mx-auto" />
                <h4 className="font-bold mb-2 text-slate-900">Análise Científica</h4>
                <p className="text-sm text-slate-500 flex-1">Diagnóstico profundo baseado em fundamentos de administração.</p>
              </div>
              <div className="flex flex-col p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                <Workflow className="text-primary w-10 h-10 mb-4 mx-auto" />
                <h4 className="font-bold mb-2 text-slate-900">Arquitetura de Fluxos</h4>
                <p className="text-sm text-slate-500 flex-1">Mapeamento visual de cada etapa da sua operação.</p>
              </div>
              <div className="flex flex-col p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/30 transition-colors sm:col-span-2 md:col-span-1">
                <Bot className="text-primary w-10 h-10 mb-4 mx-auto" />
                <h4 className="font-bold mb-2 text-slate-900">Automação Real</h4>
                <p className="text-sm text-slate-500 flex-1">Software que trabalha por você, não o contrário.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="bg-bg-dark text-white py-20 sm:py-32 lg:py-44" id="processos">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 sm:mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                Uma Abordagem Sequencial Contínua
              </h2>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 sm:mb-6">
                Organizamos, Promovemos e Automatizamos
              </h3>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">Três pilares fundamentais para transformar sua operação de ponta a ponta.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Pillar 1 */}
              <div className="group flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-primary/10 hover:border-primary transition-all duration-300">
                <div className="aspect-video sm:aspect-[4/3] lg:aspect-video bg-slate-900 relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Organizar" 
                    src="/roda-ia-21.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <span className="bg-gradient-to-br from-primary to-secondary text-slate-900 px-3 py-1 text-xs font-bold rounded">01</span>
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Organizar</span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3 sm:space-y-4 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold">Mapeamento de Processos</h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed flex-1">
                    Encontramos gargalos, identificamos perda financeira e reestruturamos as tarefas e fluxo do time para máxima eficiência.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="group flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-primary/10 hover:border-primary transition-all duration-300">
                <div className="aspect-video sm:aspect-[4/3] lg:aspect-video bg-slate-900 relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Promover" 
                    src="/roda-ia-31.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <span className="bg-gradient-to-br from-primary to-secondary text-slate-900 px-3 py-1 text-xs font-bold rounded">02</span>
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Promover</span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3 sm:space-y-4 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold">Marketing e Mídia</h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed flex-1">
                    Fazemos o direcionamento do seu produto, planejamento de mídia e ações 360° para tração comercial.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="group flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-primary/10 hover:border-primary transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="aspect-video sm:aspect-[4/3] lg:aspect-video bg-slate-900 relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Automatizar" 
                    src="/roda-ia-4.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <span className="bg-gradient-to-br from-primary to-secondary text-slate-900 px-3 py-1 text-xs font-bold rounded">03</span>
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Automatizar</span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3 sm:space-y-4 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold">Software com IA</h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed flex-1">
                    Lançamos 'O Concierge' ou 'O Estrategista': sistemas criados para assumir o trabalho burocrático 24/7 sem gestão direta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden bg-bg-light py-20 sm:py-32 lg:py-44">
          <div className="absolute top-0 right-0 w-full sm:w-1/3 h-1/2 sm:h-full bg-primary/5 blur-3xl -z-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-full sm:w-1/4 h-1/2 bg-secondary/5 blur-3xl -z-10 rounded-full"></div>
          <div className="max-w-5xl mx-auto px-4 text-center space-y-8 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1]">
              Transite da fragmentação de processos para uma gestão fluida e estratégica
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Dialogue com nossos especialistas em engenharia de processos e administração para mensurar o impacto que a inteligência operacional terá na recuperação do seu tempo e na escalabilidade real do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a 
                className="inline-block w-full sm:w-auto bg-gradient-to-br from-primary to-secondary text-slate-900 px-6 sm:px-10 py-4 sm:py-5 rounded-lg font-black text-base sm:text-xl hover:scale-105 transition-all shadow-xl shadow-primary/20 text-center" 
                href="https://wa.me/5524993183300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar conversa com um especialista
              </a>
            </div>
            <div className="pt-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 lg:gap-12 opacity-80">
              <div className="flex items-center gap-2 text-slate-700">
                <Zap className="text-primary w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> 
                <span className="font-bold text-sm sm:text-base">Rápida Implantação</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="text-primary w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> 
                <span className="font-bold text-sm sm:text-base">Segurança de Dados</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <TrendingUp className="text-primary w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> 
                <span className="font-bold text-sm sm:text-base">ROI Garantido</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-primary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-6 text-center">
          <a className="flex items-center gap-3 hover:opacity-80 transition-opacity" href="https://roda.ia.br">
            <img src="/logo.png" alt="Roda IA Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <span className="text-xl sm:text-2xl font-black uppercase text-white">Roda IA</span>
          </a>
          <p className="text-slate-500 text-sm">© 2026 Roda IA - Engenharia de Processos & Tecnologia.</p>
        </div>
      </footer>
    </div>
  );
}
