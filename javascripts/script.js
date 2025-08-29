// Colocar efeito na seção que o usuário esteja
document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    { id: "capitulo-1", name: "1", bgColor: "#B14B7A", hoverColor: "#FFEBFB", active: false },
    { id: "capitulo-2", name: "2", bgColor: "#ECF4F3", hoverColor: "#e5e2ff", active: false },
    { id: "capitulo-3", name: "3", bgColor: "#F6F1E4", hoverColor: "#e6f2ff", active: false },
    { id: "capitulo-4", name: "4", bgColor: "#F6EBFC", hoverColor: "#ecdaf4", active: false },
    { id: "capitulo-5", name: "5", bgColor: "#ECF4F3", hoverColor: "#ffdeee", active: false },
    { id: "capitulo-6", name: "6", bgColor: "#F6F1E4", hoverColor: "#eaf4ff", active: false },
    { id: "capitulo-7", name: "7", bgColor: "#F6EBFC", hoverColor: "#d4ffc7", active: false },
    { id: "capitulo-8", name: "8", bgColor: "#F6EBFC", hoverColor: "#ffe1e5", active: false },
  ];
  const menuLinks = document.querySelectorAll(".nav-menu .nav-item");
  const dropdownLinks = document.querySelectorAll(".mobile-dropdown-menu a");
  const navMobileContainer = document.querySelector(".nav-menu-mobile-container");
  const navMobileText = document.querySelector(".nome-secao-container p");

  function updateMenuHighlight() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      const sectionTop = sectionElement.offsetTop;
      const sectionBottom = sectionTop + sectionElement.offsetHeight;

      if (scrollTop + windowHeight >= sectionTop && scrollTop < sectionBottom) {
        if (!section.active) {
          // Mark only the current section as active
          sections.forEach((sec) => (sec.active = false));
          section.active = true;

          // Update upper menu links
          menuLinks.forEach((link) => {
            link.classList.remove("active");
          });
          const activeLink = document.querySelector(
            `.nav-menu .nav-item[href="#${section.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }

          // Update mobile menu text
          navMobileText.textContent = section.name;

          // Update dropdown menu links
          dropdownLinks.forEach((link) => {
            link.classList.remove("active");
            link.removeEventListener("mouseover", handleHover);
            link.removeEventListener("mouseout", removeHover);
          });

          const activeDropdownLink = document.querySelector(
            `.mobile-dropdown-menu a[href="#${section.id}"]`
          );
          if (activeDropdownLink) {
            activeDropdownLink.classList.add("active");
          }

          // Add hover effect for dropdown links
          dropdownLinks.forEach((link) => {
            link.addEventListener("mouseover", handleHover);
            link.addEventListener("mouseout", removeHover);
          });

          // Define hover handlers
          function handleHover() {
              this.style.backgroundColor = section.hoverColor;
          }

          function removeHover() {
              this.style.removeProperty("background-color");
          }
        }
      }
    });
  }

  window.addEventListener("scroll", updateMenuHighlight);
});

   /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */


/* Menu*/
let previouslyInViewportMobile = false; 
function isBottomTouchingTopOfScreen(element) {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.bottom <= 0;
}

function checkElementVisibilityMobile() {
  const element = document.querySelector('.checkpoint-menu');
  const isBottomTouchingTop = isBottomTouchingTopOfScreen(element);
  const menu = document.querySelector('.nav-menu-mobile-container');

  if (isBottomTouchingTop && !previouslyInViewportMobile) {
    menu.classList.add('fixed');
    previouslyInViewportMobile = true;  
  } else if (!isBottomTouchingTop && previouslyInViewportMobile) {
    menu.classList.remove('fixed');
    previouslyInViewportMobile = false;  
  }
}

document.addEventListener('DOMContentLoaded', checkElementVisibilityMobile);
window.addEventListener('scroll', checkElementVisibilityMobile);

// Menu Dropdown - Updated for toggling "visible" class
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".icone-menu"); // Changed from hamButton
  const dropdownMenu = document.querySelector(".mobile-dropdown-menu");
  const menuLinks = document.querySelectorAll(".mobile-dropdown-menu a");

  // Toggle visibility
  menuButton.addEventListener("click", (event) => {
    dropdownMenu.classList.toggle("visible");
    event.stopPropagation();
  });

  // Close menu when clicking a section
  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      dropdownMenu.classList.remove("visible");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideMenu =
      dropdownMenu.contains(event.target) || menuButton.contains(event.target);

    if (!isClickInsideMenu && dropdownMenu.classList.contains("visible")) {
      dropdownMenu.classList.remove("visible");
    }
  });
});

 /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */





 /* Highlight */
// Checar se tá no viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Highlight de acordo com a classe
function highlightOnScroll() {
  const highlights = document.querySelectorAll('.highlight-lilas, .highlight-azul, .highlight-preto, .highlight-laranja, .highlight-laranja-claro, .highlight-azul-escuro-1');
  
  highlights.forEach((highlight) => {
    if (isInViewport(highlight)) {
      highlight.classList.add('active-highlight');
    } else {
      highlight.classList.remove('active-highlight');
    }
  });
}


window.addEventListener('scroll', highlightOnScroll);
/* -- */ /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */


// Saiba Mais
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".saiba-mais-botao").forEach(button => {
      button.addEventListener("click", () => {

          const subContainer = button.nextElementSibling;
          
          if (subContainer.classList.contains("hide-saiba-mais")) {
              subContainer.classList.remove("hide-saiba-mais");
              subContainer.classList.add("appear-saiba-mais");
              
              const image = button.querySelector("img");
              if (image) {
                  image.classList.add("rotate");
              }

   
          } else {
              subContainer.classList.remove("appear-saiba-mais");
              subContainer.classList.add("hide-saiba-mais");

              const image = button.querySelector("img");
              if (image) {
                  image.classList.remove("rotate");
              }
          }
      });
  });
});
/* -- */ /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */








// Box
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".box-botao").forEach(button => {
      button.addEventListener("click", () => {

          const subContainer = button.nextElementSibling;
          
          if (subContainer.classList.contains("hide-box")) {
              subContainer.classList.remove("hide-box");
              subContainer.classList.add("appear-box");
              
              const image = button.querySelector("img");
              if (image) {
                  image.classList.add("rotate");
              }


          } else {
              subContainer.classList.remove("appear-box");
              subContainer.classList.add("hide-box");

              const image = button.querySelector("img");
              if (image) {
                  image.classList.remove("rotate");
              }
          }
      });
  });
});


// Box
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".box-botao-cap4-sub4, .box-botao-cap4-sub4-direita").forEach(button => {
    button.addEventListener("click", (event) => {


      const mainBox = event.currentTarget.closest('.box-cap4-sub4');


      const subContainer = mainBox.querySelector("p");
      const image = mainBox.querySelector(".box-botao-cap4-sub4-direita img");


      if (subContainer.classList.contains("hide-box-cap4-sub4")) {

        document.querySelectorAll(".box-cap4-sub4").forEach(box => {
          const otherSubContainer = box.querySelector("p");
          const otherImage = box.querySelector(".box-botao-cap4-sub4-direita img");

          if (otherSubContainer && !otherSubContainer.classList.contains("hide-box-cap4-sub4")) {
            otherSubContainer.classList.remove("appear-box-cap4-sub4");
            otherSubContainer.classList.add("hide-box-cap4-sub4");
            if (otherImage) {
              otherImage.classList.remove("rotate");
            }
          }
        });


        subContainer.classList.remove("hide-box-cap4-sub4");
        subContainer.classList.add("appear-box-cap4-sub4");
        if (image) {
          image.classList.add("rotate");
        }
      } else {

        subContainer.classList.remove("appear-box-cap4-sub4");
        subContainer.classList.add("hide-box-cap4-sub4");
        if (image) {
          image.classList.remove("rotate");
        }
      }
    });
  });
});


/* -- */ /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */




// Glossário e Referências
document.addEventListener('DOMContentLoaded', () => {
  const btnReferences = document.getElementById('botao-referencias');
  const btnGlossary = document.getElementById('botao-glossario');
  const referencesContent = document.getElementById('referencias-container');
  const glossaryContent = document.getElementById('glossario-container');

  let activeButton = null; 

  btnReferences.addEventListener('click', () => {
    if (activeButton === btnReferences) {
     
      referencesContent.classList.remove('visible');
      activeButton = null;
    } else {
    
      referencesContent.classList.add('visible');
      glossaryContent.classList.remove('visible');
      activeButton = btnReferences; 
    }
  });

  btnGlossary.addEventListener('click', () => {
    if (activeButton === btnGlossary) {

      glossaryContent.classList.remove('visible');
      activeButton = null; 
    } else {

      glossaryContent.classList.add('visible');
      referencesContent.classList.remove('visible');
      activeButton = btnGlossary; 
    }
  });
});
/* -- */ /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */




// Linha do Tempo
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-linha-do-tempo");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;


        if (card.parentElement.classList.contains("esquerda")) {
          card.classList.add("animate-left");
        } else if (card.parentElement.classList.contains("direita")) {
          card.classList.add("animate-right");
        }


        const circles = card.parentElement.querySelectorAll(".circulo");


        circles.forEach((circle) => {
          circle.classList.add("show");
        });


        observer.unobserve(card);
      }
    });
  }, {
    threshold: 0.1,
  });


  cards.forEach((card) => observer.observe(card));
});


document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".popup-trigger");

  triggers.forEach(trigger => {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const image = document.createElement("img");
    image.src = trigger.getAttribute("data-image");
    popup.appendChild(image);

    document.body.appendChild(popup);

    trigger.addEventListener("mouseenter", () => {
      const rect = trigger.getBoundingClientRect();
      popup.style.left = `${rect.left}px`;
      popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
      popup.classList.add("popup-visible");
    });

    trigger.addEventListener("mouseleave", () => {
      popup.classList.remove("popup-visible");
    });
  });
});


/* Carrossel capítulo 5 */
document.addEventListener('DOMContentLoaded', function () {
    const postuladoElements = document.querySelectorAll('.conteudo-carrossel');
    const leftButton = document.querySelector('.seta-esquerda');
    const rightButton = document.querySelector('.seta-direita');
    const leftMobileButton = document.querySelector('.seta-esquerda-mobile');
    const rightMobileButton = document.querySelector('.seta-direita-mobile');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
  
   
    function updatePostulados() {
      postuladoElements.forEach((element, index) => {
        element.style.display = index === currentIndex ? 'flex' : 'none';
      });

      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.style.backgroundColor = '#5D2E12'; 
          dot.style.pointerEvents = 'none'; 
        } else {
          dot.style.backgroundColor = '';
          dot.style.pointerEvents = 'auto'; 
        }
      });
  
      
      leftButton.disabled = currentIndex === 0;
      rightButton.disabled = currentIndex === postuladoElements.length - 1;
      leftMobileButton.disabled = currentIndex === 0;
      rightMobileButton.disabled = currentIndex === postuladoElements.length - 1;


    }
  
    
   /* Botão desktop */
    leftButton.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
        updatePostulados();
      }
    });
  
    rightButton.addEventListener('click', function () {
      if (currentIndex < postuladoElements.length - 1) {
        currentIndex++;
        updatePostulados();
      }
    });

    /* Botão mobile */
    leftMobileButton.addEventListener('click', function () {
        if (currentIndex > 0) {
          currentIndex--;
          updatePostulados();
        }
      });
    
      rightMobileButton.addEventListener('click', function () {
        if (currentIndex < postuladoElements.length - 1) {
          currentIndex++;
          updatePostulados();
        }
      });

    /* Dots */

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
          currentIndex = index; 
          updatePostulados();
        });
      });
  
   
    updatePostulados();
  });
   /* -- */ /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */


   // Números desafios
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".conteudo-desafio").forEach(content => {
    content.classList.add("hide-conteudo-desafio");
  });


  document.querySelectorAll(".botao-desafio").forEach(button => {
    button.addEventListener("click", (event) => {
      const container = event.currentTarget.closest('.container');
      const content = container.querySelector(".conteudo-desafio");
      

      if (content.classList.contains("hide-conteudo-desafio")) {
        content.classList.remove("hide-conteudo-desafio");
        content.classList.add("appear-conteudo-desafio");
      } else {
        content.classList.remove("appear-conteudo-desafio");
        content.classList.add("hide-conteudo-desafio");
      }
    });
  });
});

/* -- */ /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */




document.addEventListener('DOMContentLoaded', function() {
    // questões
    const quizQuestions = [
      {
            question: "Qual é o principal objetivo da <span class='bold'>escuta pedagógica</span> no contexto hospitalar?",
            options: [
              "Apenas ouvir as palavras ditas pelo aluno.", 
              "Compreender os sentimentos, desejos e inquietações do aluno.", 
              "Ignorar as emoções do aluno e focar apenas no ensino tradicional.", 
              "Criar um ambiente rígido de aprendizado, sem espaço para acolhimento.", 
              "Incentivar o aluno a seguir um modelo único de aprendizagem sem adaptações."
            ],
            correctAnswer: 1,
            explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Compreender os sentimentos, desejos e inquietações do aluno</span>”, pois este saber destaca que a escuta pedagógica envolve uma compreensão profunda do aluno, indo além das palavras para acolher seus sentimentos e necessidades."
        },
        {
            question: "Qual é um dos principais desafios enfrentados por professores que lecionam em hospitais para manter o <span class='bold'>equilíbrio emocional</span>?",
            options: [
              "Ensinar apenas conteúdos técnicos, sem interação emocional.", 
              "Evitar qualquer contato com os pacientes para não se envolver emocionalmente.", 
              "Manter uma abordagem mais humanizada e empática, mesmo diante da doença e aceitar a finitude.", 
              "Ignorar o impacto da morte no ambiente escolar hospitalar.", 
              "Focar apenas no desenvolvimento acadêmico dos alunos, sem considerar seu bem-estar emocional."
            ],
            correctAnswer: 2,
            explanation: "<span class='bold'>Justificativa:</span> : A resposta correta é “<span class='bold'>Manter uma abordagem mais humanizada e empática, mesmo diante da doença e aceitar a finitude</span>”, pois este saber destaca que ensinar no hospital exige lidar constantemente com a realidade da doença e da morte, sendo essencial para o professor manter seu equilíbrio emocional."
        },
    {
        question: "Por que é importante que os docentes conheçam a <span class='bold'>instituição hospitalar</span> onde lecionam?",
        options: [
            "Para atuarem como médicos e auxiliarem diretamente no tratamento dos pacientes.",
            "Para compreender a doença dentro da perspectiva médica e aplicá-la ao ensino.",
            "Para subsidiar sua prática pedagógica, considerando o contexto hospitalar e suas particularidades.",
            "Para focar exclusivamente nos conteúdos escolares, sem necessidade de interação com o ambiente hospitalar.",
            "Para evitar qualquer envolvimento com protocolos hospitalares e concentrar-se apenas na aula."
        ],
        correctAnswer: 2,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Para subsidiar sua prática pedagógica, considerando o contexto hospitalar e suas particularidades</span>”, pois este saber enfatiza que a doença deve ser compreendida não na perspectiva da medicina, mas como um elemento que apoie a prática pedagógica, além da necessidade de conhecer prontuários, nomenclaturas e protocolos hospitalares."
    },
    {
        question: "Qual é a importância do <span class='bold'>diálogo com a equipe hospitalar</span>?",
        options: [
            "Permite que os professores assumam funções médicas no cuidado dos alunos.",
            "Facilita a compreensão das patologias dos alunos e seus limites, melhorando a prática pedagógica.",
            "Elimina a necessidade de adaptação do ensino ao contexto hospitalar.",
            "Restringe a colaboração apenas aos profissionais diretamente ligados à saúde.",
            "Substitui a interação com os alunos, tornando o ensino mais distante e impessoal."
        ],
        correctAnswer: 1,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Facilita a compreensão das patologias dos alunos e seus limites, melhorando a prática pedagógica</span>”, pois o texto destaca que o diálogo com a equipe hospitalar fortalece a prática docente, permitindo compreender as condições dos alunos e viabilizar ações para melhor integração escolar."
    },
    {
        question: "Qual é a importância da <span class='bold'>parceria com acompanhantes e voluntários</span> no atendimento pedagógico hospitalar?",
        options: [
            "Substituir completamente o papel dos professores no ensino hospitalar.",
            "Criar um ambiente de isolamento para que os alunos foquem apenas nos estudos.",
            "Melhorar a qualidade de vida e o bem-estar dos alunos hospitalizados.",
            "Limitar a interação dos alunos apenas aos profissionais da saúde.",
            "Focar exclusivamente no desempenho acadêmico dos estudantes, sem considerar seu estado emocional."
        ],
        correctAnswer: 2,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Melhorar a qualidade de vida e o bem-estar dos alunos hospitalizados</span>”, pois este saber destaca que o apoio de acompanhantes e voluntários contribui diretamente para o bem-estar dos alunos, proporcionando um ambiente mais acolhedor e humanizado."
    },
    {
        question: "Qual é um dos principais desafios da <span class='bold'>sala hospitalar multisseriada</span>?",
        options: [
            "Ensinar apenas alunos que estão no mesmo nível de escolarização.",
            "Adaptar estratégias pedagógicas para atender a diversidade dos estudantes.",
            "Evitar que alunos com diferentes condições de saúde interajam entre si.",
            "Focar exclusivamente nos alunos que já possuem experiência escolar.",
            "Criar um ambiente de ensino padronizado, sem considerar as diferenças individuais."
        ],
        correctAnswer: 1,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Adaptar estratégias pedagógicas para atender a diversidade dos estudantes</span>”, pois este saber destaca que a sala hospitalar reúne estudantes de diversas idades, níveis de escolarização e condições de saúde, exigindo adaptação por parte dos docentes."
    },
    {
        question: "Por que o <span class='bold'>currículo</span> na classe hospitalar precisa ser flexível e adaptável?",
        options: [
            "Para garantir que todos os alunos sigam o mesmo planejamento, independentemente do tempo de internação.",
            "Para permitir que os estudantes escolham qualquer disciplina sem considerar suas condições de saúde.",
            "Para ajustar o planejamento conforme o tempo de permanência do aluno no hospital, garantindo um ensino adequado.",
            "Para evitar qualquer tipo de organização diferenciada, aplicando apenas um modelo de ensino fixo.",
            "Para focar exclusivamente em conteúdos básicos, sem necessidade de adaptação curricular."
        ],
        correctAnswer: 2,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Para ajustar o planejamento conforme o tempo de permanência do aluno no hospital, garantindo um ensino adequado</span>”, pois este saber destaca que a flexibilidade do currículo é essencial para atender alunos com diferentes tempos de internação, garantindo que cada um receba um ensino adequado."
    },
    {
        question: "Por que o <span class='bold'>planejamento</span> da classe hospitalar precisa ser flexível?",
        options: [
            "Para garantir que todos os alunos sigam o mesmo cronograma sem adaptações.",
            "Para considerar o tempo de internação, o estado físico e emocional do aluno e suas necessidades educacionais.",
            "Para manter um modelo rígido de ensino, sem alterações na duração das aulas.",
            "Para evitar mudanças nos conteúdos pedagógicos, independentemente da situação do aluno.",
            "Para priorizar apenas os alunos com internação prolongada, sem levar em conta os de curta permanência."
        ],
        correctAnswer: 1,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Para considerar o tempo de internação, o estado físico e emocional do aluno e suas necessidades educacionais</span>”, pois este saber destaca que o planejamento na classe hospitalar deve ser adaptável às diferentes condições dos alunos, incluindo sua internação, estado físico e emocional."
    },
    {
        question: "Por que a <span class='bold'>regulamentação da escolarização hospitalar</span> é essencial?",
        options: [
            "Para transformar o ensino hospitalar em uma atividade recreativa sem compromisso educacional.",
            "Para garantir que a escolarização hospitalar seja reconhecida como parte da política educacional.",
            "Para limitar o acesso dos alunos hospitalizados à educação formal.",
            "Para substituir totalmente a necessidade de aulas presenciais nas escolas convencionais.",
            "Para estabelecer que a escolarização hospitalar deve seguir um único modelo rígido e inflexível."
        ],
        correctAnswer: 1,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Para garantir que a escolarização hospitalar seja reconhecida como parte da política educacional</span>”, pois este saber destaca que legislações específicas são fundamentais para legitimar a escolarização hospitalar como parte integrante de políticas públicas educacionais."
    },
    {
        question: "Qual é a principal função do <span class='bold'>registro diário</span> das atividades na classe hospitalar?",
        options: [
            "Servir como um documento burocrático sem impacto na prática docente.",
            "Avaliar e refletir sobre a prática docente, permitindo ajustes no planejamento.",
            "Impedir mudanças no planejamento pedagógico, mantendo um ensino rígido.",
            "Substituir a interação entre professores e alunos, tornando o ensino mais impessoal.",
            "Priorizar exclusivamente a coleta de dados administrativos sobre os alunos."
        ],
        correctAnswer: 1,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Avaliar e refletir sobre a prática docente, permitindo ajustes no planejamento</span>”, pois este saber destaca que o registro diário das atividades é uma ferramenta essencial para avaliação e reflexão, contribuindo para melhorias no planejamento e na qualidade do ensino."
    },
    {
        question: "Por que a <span class='bold'>formação continuada</span> é essencial para os docentes que atuam em hospitais?",
        options: [
            "Para garantir que sigam apenas métodos tradicionais de ensino sem atualizações.",
            "Para permitir a troca de experiências e o desenvolvimento de novas teorias a partir da prática vivenciada.",
            "Para reduzir a necessidade de interação entre os professores e seus alunos hospitalizados.",
            "Para eliminar a importância dos eventos e grupos de estudo na qualificação docente.",
            "Para limitar o aprendizado dos docentes apenas ao conhecimento médico."
        ],
        correctAnswer: 1,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Para permitir a troca de experiências e o desenvolvimento de novas teorias a partir da prática vivenciada</span>”, pois este saber enfatiza que a participação em eventos e grupos de estudo é fundamental para a socialização das práticas e a elaboração de novas teorias, contribuindo para a evolução profissional dos docentes."
    },
    {
        question: "Por que a <span class='bold'>autoformação</span> é essencial para o professor hospitalar?",
        options: [
            "Para manter-se acomodado em suas práticas sem necessidade de mudanças.",
            "Para fortalecer sua motivação interna e buscar soluções inovadoras para seu desenvolvimento.",
            "Para depender exclusivamente de treinamentos externos e evitar reflexões pessoais.",
            "Para priorizar apenas conhecimentos técnicos, sem considerar o autoconhecimento.",
            "Para seguir um modelo fixo de ensino, sem adaptações às necessidades dos alunos hospitalizados."
        ],
        correctAnswer: 1,
        explanation: "<span class='bold'>Justificativa:</span> A resposta correta é “<span class='bold'>Para fortalecer sua motivação interna e buscar soluções inovadoras para seu desenvolvimento</span>”, pois este saber destaca que ser professor hospitalar exige comprometimento com a formação contínua, por meio da busca de novas soluções e possibilidades através do autoconhecimento."
    }

];

    // DOM
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const actionButton = document.getElementById('action-button');
    const explanationContainer = document.getElementById('explanation-container');
    const explanationText = document.getElementById('explanation-text');
    const progressText = document.getElementById('progress-text');
    const parabensIcon = document.getElementById('quiz-parabens');
    const gabaritoButton = document.getElementById('gabarito-button');
    const btnGabarito = document.getElementById('gabarito-button');
    const gabaritoConteudo = document.querySelector('.gabarito-container');


    let currentQuestionIndex = 0;
    let selectedOptionIndex = null;
    let quizCompleted = false;
    let score = 0;
    let shuffledOptions = []; 
    let originalCorrectIndex = 0; 

    // shuffle
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // 
    function initQuiz() {
        currentQuestionIndex = 0;
        selectedOptionIndex = null;
        quizCompleted = false;
        score = 0;
        questionText.classList.remove('hidden');
        parabensIcon.classList.add('hidden');
        actionButton.textContent = "Verificar";
        actionButton.disabled = true;
        actionButton.classList.remove('active');
        progressText.style.textAlign = "right"; 
        gabaritoButton.classList.add('hidden');
        gabaritoConteudo.classList.remove('visivel');
        loadQuestion(currentQuestionIndex);
    }

    // 
    function loadQuestion(index) {
        if (index >= quizQuestions.length) {
            endQuiz();
            return;
        }

        const question = quizQuestions[index];
        questionText.innerHTML = question.question;
        optionsContainer.innerHTML = '';
        
        // 
        shuffledOptions = shuffleArray(question.options);
        originalCorrectIndex = question.correctAnswer;
        
        // 
        const newCorrectIndex = shuffledOptions.indexOf(question.options[originalCorrectIndex]);
        
        shuffledOptions.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = i;
            optionElement.dataset.originalIndex = question.options.indexOf(option); 
            optionElement.addEventListener('click', () => selectOption(i));
            optionsContainer.appendChild(optionElement);
        });

        // 
        quizQuestions[index].correctAnswer = newCorrectIndex;

        explanationContainer.classList.add('hidden');
        selectedOptionIndex = null;
        actionButton.disabled = true;
        actionButton.classList.remove('active');
        progressText.textContent = `Questão ${index + 1} de ${quizQuestions.length}`;
    }

    // 
    function selectOption(index) {
        if (actionButton.textContent === "Avançar") return;

        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        const options = document.querySelectorAll('.option');
        options[index].classList.add('selected');
        selectedOptionIndex = index;

        actionButton.disabled = false;
        actionButton.classList.add('active');
    }

    // 
    function verifyAnswer() {
        if (selectedOptionIndex === null) return;

        const question = quizQuestions[currentQuestionIndex];
        const options = document.querySelectorAll('.option');

        options[question.correctAnswer].classList.add('correct');

        if (selectedOptionIndex === question.correctAnswer) {
            score++;
        } else {
            options[selectedOptionIndex].classList.add('incorrect');
        }

        explanationText.innerHTML = question.explanation;

        explanationContainer.classList.remove('hidden');
        actionButton.textContent = "Avançar";
        
        // 
        quizQuestions[currentQuestionIndex].correctAnswer = originalCorrectIndex;
    }

    // 
    function proceedToNext() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion(currentQuestionIndex);
            actionButton.textContent = "Verificar";
        } else {
            endQuiz();
        }
    }

    // 
    function endQuiz() {
        quizCompleted = true;
        questionText.textContent = "Quiz Completed!";
        questionText.classList.add('hidden');
        parabensIcon.classList.remove('hidden');
        optionsContainer.innerHTML = '';
        explanationContainer.classList.add('hidden');
        actionButton.textContent = "Refazer";
        actionButton.disabled = false;
        actionButton.classList.add('active');
        progressText.innerHTML = `Você chegou ao final deste Game Quiz sobre os doze saberes fundamentais para a classe hospitalar, acertando <span class='bold azul-escuro-2'>${score} de ${quizQuestions.length} questões.</span>`;
        progressText.style.textAlign = "center"; 
        gabaritoButton.classList.remove('hidden');
      }

    //
    actionButton.addEventListener('click', function() {
        if (quizCompleted) {
            initQuiz();
        } else if (actionButton.textContent === "Verificar") {
            verifyAnswer();
        } else {
            proceedToNext();
        }
    });


    btnGabarito.addEventListener('click', () => {
    gabaritoConteudo.classList.toggle('visivel');
    
    // 
    btnGabarito.textContent = gabaritoConteudo.classList.contains('visivel') 
      ? 'Ocultar Gabarito' 
      : 'Mostrar Gabarito';
  });

    // 
    initQuiz();

});


/* -- */ /* -- */   /* -- */   /* -- */ /* -- */   /* -- */   /* -- */

// Vídeo de apoio capítulo 6
document.addEventListener('DOMContentLoaded', () => {
  const subSubDiv = document.querySelector('#capitulo-6 .conteudo-box-saiba-mais');
  const iframes = subSubDiv.querySelectorAll('iframe');
  const videoLegenda = iframes[0];
  const videoDescricao = iframes[1];

  const containerBotoes = document.querySelector('#capitulo-6 .container-botoes');
  const botoes = containerBotoes.querySelectorAll('button');
  const botaoLegenda = botoes[0];
  const botaoDescricao = botoes[1];

  function showVideo(activeVideo, inactiveVideo, activeButton, inactiveButton) {
    activeVideo.classList.add('visible');
    inactiveVideo.classList.remove('visible');
    activeButton.disabled = true;
    inactiveButton.disabled = false;
  }

  botaoLegenda.addEventListener('click', () => {
    if (botaoLegenda.disabled) return; // already active
    showVideo(videoLegenda, videoDescricao, botaoLegenda, botaoDescricao);
  });

  botaoDescricao.addEventListener('click', () => {
    if (botaoDescricao.disabled) return; // already active
    showVideo(videoDescricao, videoLegenda, botaoDescricao, botaoLegenda);
  });

  // Disable first button by default
  botaoLegenda.disabled = true;
});
