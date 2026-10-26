/* ==========================================================================
   CONTEÚDO DINÂMICO — projetos, eventos, artigos, notícias e produtos.
   Para publicar algo novo, copie um item e edite. A página inicial mostra
   automaticamente os itens mais recentes de cada lista.
   Conteúdo extraído do site atual (ipac.eco.br) em out/2026.
   ========================================================================== */

window.IPAC_DADOS = {

  /* situacao: 'andamento' | 'concluido'
     confirmar: true  → mostra a etiqueta "situação a confirmar" (protótipo)
     credito: 'Autor' → mostra "Foto: Autor" sobre a imagem
     imagem: ''  → mostra o espaço "foto aguardando envio" */
  projetos: [
    {
      id: 'cultivando-agua-boa-tangara',
      titulo: 'Cultivando Água Boa Tangará',
      local: 'Tangará da Serra – MT',
      periodo: '2024 – atual',
      situacao: 'andamento',
      imagem: 'assets/img/proj-cultivando.jpg',
      resumo: 'Revitalização das nascentes e áreas de preservação dos rios Queima Pé e Ararão, fundamentais para o abastecimento de Tangará da Serra, com educação ambiental e envolvimento da comunidade.',
      link: 'projeto-cultivando-agua-boa.html',
      destaque: true
    },
    { id: 'produtor-agua', titulo: 'Projeto Produtor de Água', local: 'Tangará da Serra – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-produtor-agua.jpg', resumo: 'Participação no Projeto Produtor de Água – PSA Queima-Pé.' },
    { id: 'coletor-chuva', titulo: 'Projeto coletor de água da chuva', local: 'Tangará da Serra – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-coletor-chuva.jpg', resumo: 'Descrição a ser fornecida pela Diretoria.' },
    { id: 'diagnostico-queimape', titulo: 'Diagnóstico da Bacia do Queima-Pé', local: 'Tangará da Serra – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-diagnostico-queimape.jpg', resumo: 'Diagnóstico de propriedades rurais da parte alta da bacia do Queima-Pé.' },
    { id: 'socio-queimape', titulo: 'Levantamento socioeconômico-cultural da Bacia do Queima-Pé', local: 'Tangará da Serra – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-socio-queimape.jpg', resumo: 'Descrição a ser fornecida pela Diretoria.' },
    { id: 'socio-ararao', titulo: 'Levantamento socioeconômico-cultural da Bacia do Córrego Ararão', local: 'Tangará da Serra – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-socio-ararao.jpg', resumo: 'Descrição a ser fornecida pela Diretoria.' },
    { id: 'vale-sol-1', titulo: 'Levantamento socioeconômico-cultural da Comunidade Vale do Sol I', local: 'Tangará da Serra – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-vale-sol-1.jpg', resumo: 'Descrição a ser fornecida pela Diretoria.' },
    { id: 'vale-sol-2', titulo: 'Levantamento socioeconômico-cultural da Comunidade Vale do Sol II', local: 'Tangará da Serra – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-vale-sol-2.jpg', resumo: 'Descrição a ser fornecida pela Diretoria.' },
    { id: 'vale-amanhecer', titulo: 'Levantamento socioeconômico-cultural do Assentamento Vale do Amanhecer', local: 'Juruena – MT', situacao: 'concluido', confirmar: true, imagem: 'assets/img/proj-assentamento.jpg', resumo: 'Descrição a ser fornecida pela Diretoria.' },
    { id: 'rio-lira-drenos', titulo: 'Produção de Água na Bacia do Rio Lira', local: 'Sorriso – MT', periodo: '2020 – 2021', situacao: 'concluido', imagem: 'assets/img/proj-rio-lira-drenos.jpg', credito: 'Decom / Prefeitura de Sorriso', resumo: 'Instalação de drenos verticais. CAT Sorriso / Mosaic Fertilizantes, com apoio da Prefeitura Municipal e do IFMT.' },
    { id: 'rio-lira-diagnostico', titulo: 'Diagnóstico da Qualidade Ambiental da Bacia do Rio Lira', local: 'Sorriso – MT', periodo: '2020', situacao: 'concluido', imagem: 'assets/img/proj-rio-lira-diagnostico.jpg', credito: 'Decom / Prefeitura de Sorriso', resumo: 'Executado para a Prefeitura Municipal de Sorriso.' },
    { id: 'vida-sustentavel', titulo: 'Cultivando Vida Sustentável', local: 'Sorriso – MT', periodo: '2019 – 2021', situacao: 'concluido', imagem: 'assets/img/proj-vida-sustentavel.jpg', credito: 'IDH', resumo: 'Elaboração e execução do projeto com IDH Holanda / CAT Sorriso.' },
    { id: 'qualidade-vida-rural', titulo: 'Cultivando a Qualidade de Vida na Área Rural nas Cabeceiras do Pantanal', local: 'Cabeceiras do Pantanal', periodo: '2014', situacao: 'concluido', imagem: '', resumo: 'Coordenação do projeto (WWF-Brasil/HSBC), com a instalação de 40 biofossas.' }
  ],

  /* data: 'AAAA-MM-DD' (use o dia 01 quando só se sabe o mês/ano).
     Eventos com data futura aparecem em "Próximos eventos".
     id: liga o evento (ou projeto) às suas fotos e vídeos em galerias.js. */
  eventos: [
    { id: 'formoso-2025', titulo: 'Diagnóstico, projeto e reparação de processo erosivo e proteção da gruta da nascente do Rio Bonitinho', data: '2025-10-30', dataTexto: '30 out 2025', local: 'Aldeia Indígena do Formoso', imagem: 'assets/img/news-formoso.jpg' },
    { id: 'escola-ecologica-sorriso-2025', titulo: 'Reunião com a Secretária de Educação de Sorriso – MT, Sra. Adriana, para apresentar o projeto Escola Ecológica, a ser implantado nas escolas do município', data: '2025-08-22', dataTexto: '22 ago 2025', local: 'Sorriso – MT', imagem: 'assets/img/ev-2025-08-escola-ecologica.jpg' },
    { id: 'reuniao-sorriso-2025', titulo: 'Reunião com o Sr. Clovis Picolo Filho, Secretário de Meio Ambiente de Sorriso – MT, para apresentação do programa de recuperação das nascentes do Rio Lira', data: '2025-08-21', dataTexto: '21 ago 2025', local: 'Sorriso – MT', imagem: 'assets/img/ev-2025-08-sorriso.jpg' },
    { id: 'producao-agua-parana', titulo: 'Exemplos de produção de água com conservação de solos, adequação de estradas rurais e revitalização de nascentes no Paraná', data: '2025-07-29', dataTexto: 'jul 2025', confirmar: true, local: 'Paraná', imagem: 'assets/img/video-producao-agua.jpg' },
    { id: 'queimape-resultado-2025', titulo: 'Resultado da recuperação da nascente do Rio Queima Pé', data: '2025-07-01', dataTexto: 'jul 2025', local: 'Tangará da Serra – MT', imagem: 'assets/img/news-queimape-2025.jpg' },
    { id: 'dia-da-agua-2025', titulo: 'Dia da Água 2025 — Nascente do Rio Queima Pé', data: '2025-03-22', dataTexto: 'mar 2025', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-2025-03.jpg' },
    { id: 'dia-arvore-2024-cristalino', titulo: 'Cultivando Água Boa e Dia da Árvore — Nascente 059', data: '2024-09-21', dataTexto: 'set 2024', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-2024-10.jpg' },
    { id: 'dia-arvore-2024-ararao', titulo: 'Cultivando Água Boa e Dia da Árvore — Nascentes 12 e 14', data: '2024-09-20', dataTexto: 'set 2024', local: 'Distrito de Progresso', imagem: 'assets/img/ev-a5ac.jpg' },
    { id: 'dia-da-agua-2024', titulo: 'Cultivando Água Boa — Dia da Água 2024, Nascente 060', data: '2024-03-22', dataTexto: 'mar 2024', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-2024-03.jpg' },
    { id: 'quenia-2023', titulo: 'Visita de técnicos do Quênia', data: '2023-11-01', dataTexto: '2023', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-2023-11.jpg' },
    { id: 'dia-arvore-2023', titulo: 'Dia da Árvore — Nascente 059', data: '2023-09-21', dataTexto: 'set 2023', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-arvore-2023.jpg' },
    { id: 'dia-arvore-2022', titulo: 'Dia da Árvore — Nascente 01', data: '2022-09-21', dataTexto: 'set 2022', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-arvore-2022.jpg' },
    { id: 'pci-2022', titulo: 'PCI Tangará da Serra', data: '2022-05-24', dataTexto: 'mai 2022', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-pci.jpg' },
    { id: 'queimape-2021', titulo: 'Recuperação da Nascente do Queima-Pé', data: '2021-01-01', dataTexto: '2021', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-queimape.jpg' },
    { id: 'workshop-2017', titulo: 'Workshop — Sustentabilidade na Gestão de Recursos Hídricos e Resíduos Sólidos', data: '2017-09-14', dataTexto: 'set 2017', local: 'Tangará da Serra – MT', imagem: 'assets/img/ev-workshop.jpg' }
  ],

  artigos: [
    {
      titulo: 'IPAC mostra os resultados da recuperação das nascentes do Queima-Pé em reunião da Region C Water Planning Group, no Texas (EUA)',
      autores: 'Decio Eloi Siebert',
      data: '2025-05-19', dataTexto: '19 mai 2025',
      categoria: 'Recursos hídricos',
      imagem: 'assets/img/art-texas.jpg',
      resumo: 'O IPAC participou da reunião do Grupo de Planejamento Hídrico (Region C Water Planning Group – RCWPG), realizada no Texas, Estados Unidos, em 19 de maio de 2025.',
      arquivo: 'assets/docs/artigos/ipac-texas-queima-pe.pdf'
    },
    {
      titulo: 'A crise hídrica do Texas: fatores que contribuem e alternativas para o aumento das águas superficiais e subterrâneas',
      autores: 'Decio Eloi Siebert, Fernando Ximenes de T. Salomão, Pedro Paulo Costa',
      data: '2025-05-01', dataTexto: '2025',
      categoria: 'Recursos hídricos',
      imagem: 'assets/img/art-texas-2.jpg',
      resumo: 'O Texas tem enfrentado uma gama de problemas que pode, a curto prazo, causar uma crise hídrica em suas diferentes regiões. Segundo o Texas Water Development Board, algumas regiões podem enfrentar séria escassez de água já em 2030.',
      arquivo: 'assets/docs/artigos/crise-hidrica-texas.pdf'
    },
    {
      titulo: 'Water Plan of Region C: considerations and contributions of actions for the increase of surface and groundwater',
      autores: 'Decio Eloi Siebert, Pedro Paulo Costa',
      data: '2025-04-30', dataTexto: '2025',
      categoria: 'Em inglês',
      imagem: 'assets/img/news-eua.jpg',
      resumo: 'Texas is a well-organized state, particularly regarding its water resources. Through agencies like the Texas Water Development Board (TWDB), the mission is to spearhead efforts in ensuring a secure water future for Texas.',
      arquivo: 'assets/docs/artigos/water-plan-region-c.pdf'
    }
  ],

  /* Notícias Verdes: matérias da imprensa sobre o IPAC (links externos). */
  noticias: [
    { titulo: 'Força-tarefa realizará trabalhos de correção de erosão subterrânea na Aldeia Formoso', fonte: 'Enfoque Business', data: '2025-11-05', imagem: 'assets/img/news-forca-tarefa.jpg', link: 'https://enfoquebusiness.com.br/forca-tarefa-realizara-trabalhos-de-correcao-de-erosao-subterranea-na-aldeia-do-formoso/' },
    { titulo: 'Erosão subterrânea ameaça estabilidade do solo na TI Formoso e motiva intervenção técnica', fonte: 'Enfoque Business', data: '2025-10-23', imagem: 'assets/img/news-formoso.jpg', link: 'https://enfoquebusiness.com.br/erosao-subterranea-ameaca-estabilidade-do-solo-na-ti-formoso-e-motiva-intervencao-tecnica/' },
    { titulo: 'Revitalização da nascente do Queima Pé mostra resultado e garante regularidade no abastecimento', fonte: 'Diário da Serra', data: '2025-07-18', imagem: 'assets/img/news-queimape-2025.jpg', link: 'https://diariodaserra.com.br/Noticia/Detalhes/MjEzNDQ3/RECUPERACAO-HIDRICA-%E2%80%93-Revitalizacao-da-nascente-do-Queima-Pe-mostra-resultado-e-garante-regularidade-no-abastecimento' },
    { titulo: 'IPAC mostra os resultados da recuperação das nascentes do Queima-Pé em reunião nos Estados Unidos', fonte: 'Diário da Serra', data: '2025-06-03', imagem: 'assets/img/news-eua.jpg', link: 'https://diariodaserra.com.br/Noticia/Detalhes/MjEzMTAy/PRESERVACAO-DOS-RECURSOS-HIDRICOS-%E2%80%93-IPAC-mostra-os-resultados-da-recuperacao-das-nascentes-do-Queima-Pe-em-reuniao-nos-Estados-Unidos' },
    { titulo: 'Recuperação do Rio Queima Pé, um marco na história ambiental de Tangará', fonte: 'Diário da Serra', data: '2025-03-13', imagem: 'assets/img/news-marco-2025.jpg', link: 'https://diariodaserra.com.br/Noticia/Detalhes/MjEyNTA1/DESAFIOS-E-VITORIA-%E2%80%93-Recuperacao-do-Rio-Queima-Pe-um-marco-na-historia-ambiental-de-Tangara' },
    { titulo: 'IPAC avalia 2024 como ano de reflexão e projeta 2025 para nova consciência ambiental', fonte: 'Enfoque Business', data: '2024-12-11', imagem: 'assets/img/news-enfoque-2024.jpg', link: 'https://enfoquebusiness.com.br/ipac-avalia-2024-como-ano-de-reflexao-e-projeta-2025-para-nova-consciencia-ambiental/' },
    { titulo: 'Recuperação de nascentes garante abastecimento urbano em Tangará', fonte: 'Enfoque Business', data: '2024-09-23', imagem: 'assets/img/news-represas.jpg', link: 'https://enfoquebusiness.com.br/recuperacao-de-nascentes-garante-abastecimento-urbano-em-tangara-comparativo-em-fotos/' },
    { titulo: 'Nascente do Cristalino recebe trabalhos de recuperação após incêndio', fonte: 'Diário da Serra', data: '2024-09-23', imagem: 'assets/img/news-cristalino.jpg', link: 'https://diariodaserra.com.br/Noticia/Detalhes/MjExMTc4/Nascente-do-Cristalino-recebe-trabalhos-de-recuperacao-apos-incendio' },
    { titulo: 'Com presença de alunos, nascente do Cristalino recebe trabalhos de recuperação após incêndio', fonte: 'Enfoque Business', data: '2024-09-20', link: 'https://enfoquebusiness.com.br/com-presenca-de-alunos-nascente-do-cristalino-recebe-trabalhos-de-recuperacao-apos-incendio/' },
    { titulo: 'Ações de educação ambiental iniciam nesta terça na nascente do Rio Ararão', fonte: 'Diário da Serra', data: '2024-09-17', imagem: 'assets/img/news-ararao.jpg', link: 'https://diariodaserra.com.br/Noticia/Detalhes/MjExMTM0/CULTIVANDO-AGUA-BOA-TANGARA-%E2%80%93-Acoes-de-educacao-ambiental-iniciam-nesta-terca-na-nascente-do-Rio-Ararao' },
    { titulo: 'Alunos participam de ação ambiental em nascente do Rio Ararão, no Distrito de Progresso', fonte: 'Enfoque Business', data: '2024-09-17', link: 'https://enfoquebusiness.com.br/alunos-participam-de-acao-ambiental-em-nascente-do-rio-ararao-no-distrito-de-progresso/' },
    { titulo: 'Projeto “Cultivando Água Boa Tangará” segue com ações de revitalização do Queima Pé e Ararão', fonte: 'Diário da Serra', data: '2024-09-09', imagem: 'assets/img/news-cav-2024.jpg', link: 'https://diariodaserra.com.br/Noticia/Detalhes/MjExMDUx/RECUPERACAO-%E2%80%93-Projeto-%E2%80%98Cultivando-Agua-Boa-Tangara%E2%80%99-segue-com-acoes-de-revitalizacao-do-Queima-Pe-e-Ararao' },
    { titulo: 'IPAC fará diagnóstico de propriedades rurais da parte alta das bacias do Queima Pé e Ararão', fonte: 'Diário da Serra', data: '2021-10-20', link: 'https://diariodaserra.com.br/Noticia/Detalhes/MTk1NjIz/TANGARA-DA-SERRA-%E2%80%93-IPAC-fara-diagnostico-de--propriedades-rurais-da-parte-alta-das-bacias-do-Queima-Pe-e-Ararao' },
    { titulo: 'Drenos verticais: tecnologia desenvolvida em Tangará da Serra deverá ser ampliada no município de Sorriso', fonte: 'Diário da Serra', data: '2017-09-18' },
    { titulo: 'Com palestrantes renomados, workshop sobre gestão aconteceu em Tangará', fonte: 'Diário da Serra', data: '2017-09-18' },
    { titulo: 'Workshop na gestão de recursos hídricos e resíduos sólidos inicia quinta', fonte: 'Diário da Serra', data: '2017-09-12' },
    { titulo: 'Pacto das Cabeceiras e Cultivando Água Boa são apresentados para o Estado', fonte: 'Diário da Serra', data: '2015-12-05' },
    { titulo: 'Projeto Produtor de Água será apresentado nesta sexta-feira', fonte: 'Diário da Serra', data: '2014-12-04' },
    { titulo: 'Diamantino sedia reunião de “Pacto em Defesa das Cabeceiras”', fonte: 'Diário da Serra', data: '2014-04-12' }
  ],

  /* Loja: preços, tamanhos e estoque A DEFINIR pela Diretoria.
     preco: null → mostra "Preço a definir" e não permite pedido. */
  produtos: [
    { id: 'camiseta', nome: 'Camiseta IPAC', descricao: 'Camiseta institucional com a marca do IPAC.', preco: null, icone: 'camiseta', opcoes: { Tamanho: ['P', 'M', 'G', 'GG'] }, disponivel: true },
    { id: 'bone', nome: 'Boné IPAC', descricao: 'Boné com a marca do IPAC, ideal para atividades de campo.', preco: null, icone: 'bone', opcoes: { Tamanho: ['Único'] }, disponivel: true },
    { id: 'colete', nome: 'Colete IPAC', descricao: 'Colete de campo com bolsos e identificação do IPAC.', preco: null, icone: 'colete', opcoes: { Tamanho: ['P', 'M', 'G', 'GG'] }, disponivel: true }
  ]
};
