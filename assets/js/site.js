/* ==========================================================================
   IPAC — comportamento do site (sem dependências)
   - Monta cabeçalho, menu secundário e rodapé em todas as páginas
   - Renderiza listas a partir de dados.js
   - Formulário de contato, doação (Pix/cartão) e pedidos da loja
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.IPAC_CONFIG || {};
  var DADOS = window.IPAC_DADOS || {};
  var pagina = document.body.getAttribute('data-page') || '';

  /* ---------- Idiomas: português na raiz, /en/ e /es/ em pastas ---------- */
  var LANG = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
  if (['pt', 'en', 'es'].indexOf(LANG) < 0) LANG = 'pt';
  var BASE = LANG === 'pt' ? '' : '../';
  var LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[LANG];
  function asset(p) { return /^assets\//.test(p || '') ? BASE + p : p; }

  var TEXTOS = {
    pt: {
      pular: 'Pular para o conteúdo', brasil: 'Brasil', inicioAria: 'IPAC — página inicial', logoAlt: 'Logo do IPAC', desde: 'Desde',
      menuPrincipal: 'Menu principal', menuSecundario: 'Menu secundário', abrirMenu: 'Abrir menu', fecharMenu: 'Fechar menu', idioma: 'Idioma',
      doe: 'Doe agora', lema: '<b>Sensibilização ambiental</b> · Pelo direito de toda criança à natureza · Desde ',
      m: { inicio: 'Início', institucional: 'Institucional', comites: 'Comitês', diretoria: 'Diretoria', comiteA: 'Comitê A', comiteB: 'Comitê B', comiteC: 'Comitê C',
        programas: 'Programas & Projetos', andamento: 'Em andamento', concluidos: 'Concluídos', eventos: 'Eventos', artigos: 'Biblioteca Virtual',
        noticias: 'Notícias Verdes', faq: 'FAQ', transparencia: 'Transparência', contato: 'Contato' },
      newsTitulo: 'Receba as novidades do IPAC', newsTexto: 'Ações, eventos e conteúdos sobre sensibilização ambiental e o ECA Ambiental, direto no seu e-mail.',
      newsPlaceholder: 'Seu melhor e-mail', newsBotao: 'Quero receber',
      newsConsent: 'Aceito receber e-mails do IPAC e posso cancelar quando quiser. <a href="privacidade.html">Privacidade</a>',
      newsOk: 'Pronto! Seu e-mail foi cadastrado para receber as novidades do IPAC.', newsInvalido: 'Informe um e-mail válido e marque a autorização.',
      newsErro: 'Não foi possível cadastrar agora. Tente novamente mais tarde.', newsPrevia: 'Pré-visualização local: o cadastro funciona quando o site estiver publicado na hospedagem.',
      logoParceiro: 'Espaço para logo', parceiroLink: function (n) { return 'Site de ' + n; },
      descRodape: function (c) { return c.nome + '. Organização sem fins lucrativos fundada em ' + c.fundacao + ' em ' + c.cidade + ', dedicada à defesa, preservação e recuperação ambiental e cultural. Entidade de Utilidade Pública Municipal e Estadual.'; },
      navegue: 'Navegue', participe: 'Participe', loja: 'Loja IPAC', eca: 'ECA Ambiental', perguntas: 'Perguntas frequentes', privacidade: 'Política de privacidade',
      direitos: 'Todos os direitos reservados.', linksLegais: 'Links legais', rede: function (n) { return n + ' do IPAC'; },
      emAndamento: 'Em andamento', concluido: 'Concluído', situacaoConfirmar: 'situação a confirmar', conhecaProjeto: 'Conheça o projeto', acaoProjeto: 'Ação do projeto',
      lerArtigo: 'Ler artigo completo (PDF)', lerMateria: 'Ler matéria', emPortugues: '',
      semEventos: '<strong>Nenhum evento agendado no momento.</strong><br>Acompanhe nossas redes sociais para saber das próximas ações.',
      verifique: 'Verifique os campos destacados.', enviando: 'Enviando…', enviar: 'Enviar mensagem',
      previa: function (e) { return 'Esta é uma pré-visualização local: o envio funciona quando o site estiver publicado na hospedagem. Enquanto isso, escreva para ' + e + '.'; },
      enviado: '<strong>Mensagem enviada!</strong> Obrigado pelo contato. Responderemos em breve pelo e-mail informado.',
      falhou: function (e) { return 'Não foi possível enviar agora. Escreva para ' + e + '.'; },
      escaneie: 'Escaneie o QR Code no app do seu banco', ouCopia: 'ou use o Pix copia e cola:', copiar: 'Copiar', copiado: 'Copiado!',
      codigoPix: 'Código Pix copia e cola', recebedor: 'Recebedor', chave: 'Chave', porMes: '/mês',
      escolhaValor: 'Escolha ou digite um valor (mínimo R$ 1,00).',
      pixConfig: '<strong>Pix em configuração.</strong> O QR Code e o código copia e cola serão gerados aqui assim que o IPAC cadastrar a chave Pix oficial da instituição. Enquanto isso, fale com a gente em <a href="contato.html">Contato</a>.',
      cartaoConfig: function (mensal) { return '<strong>Pagamento com cartão em configuração.</strong> Esta opção depende da contratação de um provedor de pagamentos pelo IPAC' + (mensal ? ', com suporte a cobrança recorrente (assinatura)' : '') + '.'; },
      irPagamento: 'Ir para o pagamento seguro', redirecionado: 'Você será direcionado ao ambiente do provedor de pagamentos.',
      disponivel: 'Disponível', esgotado: 'Esgotado', fotoIlustrativa: 'foto ilustrativa', precoDefinir: 'preço a definir', pedirWhats: 'Pedir pelo WhatsApp',
      msgPedido: function (p, esc2, v) { return 'Olá! Gostaria de fazer um pedido na Loja IPAC:\n\n• Produto: ' + p + (esc2 ? '\n• ' + esc2 : '') + '\n• Quantidade: 1\n• Valor: ' + v + '\n\nMeu nome: \nCidade para entrega/retirada: '; }
    },
    en: {
      pular: 'Skip to content', brasil: 'Brazil', inicioAria: 'IPAC — home page', logoAlt: 'IPAC logo', desde: 'Since',
      menuPrincipal: 'Main menu', menuSecundario: 'Secondary menu', abrirMenu: 'Open menu', fecharMenu: 'Close menu', idioma: 'Language',
      doe: 'Donate now', lema: '<b>Environmental awareness</b> · For every child’s right to nature · Since ',
      m: { inicio: 'Home', institucional: 'About IPAC', comites: 'Committees', diretoria: 'Board of Directors', comiteA: 'Committee A', comiteB: 'Committee B', comiteC: 'Committee C',
        programas: 'Programs & Projects', andamento: 'Ongoing', concluidos: 'Completed', eventos: 'Events', artigos: 'Virtual Library',
        noticias: 'Green News', faq: 'FAQ', transparencia: 'Transparency', contato: 'Contact' },
      newsTitulo: 'Get IPAC news by e-mail', newsTexto: 'Activities, events and content on environmental awareness and the ECA Ambiental, straight to your inbox.',
      newsPlaceholder: 'Your e-mail address', newsBotao: 'Subscribe',
      newsConsent: 'I agree to receive e-mails from IPAC and can unsubscribe at any time. <a href="privacidade.html">Privacy</a>',
      newsOk: 'Done! Your e-mail has been added to IPAC’s mailing list.', newsInvalido: 'Please enter a valid e-mail and tick the consent box.',
      newsErro: 'We could not subscribe you right now. Please try again later.', newsPrevia: 'Local preview: subscriptions work once the site is published on the server.',
      logoParceiro: 'Logo space', parceiroLink: function (n) { return n + ' website'; },
      descRodape: function (c) { return c.nome + ' (IPAC). A non-profit organization founded in ' + c.fundacao + ' in ' + c.cidade + ', Brazil, dedicated to the defense, preservation and restoration of the environment and culture. Recognized as a Public Utility Entity at the municipal and state levels.'; },
      navegue: 'Explore', participe: 'Get involved', loja: 'IPAC Store', eca: 'ECA Ambiental (Children’s Right to Nature)', perguntas: 'FAQ', privacidade: 'Privacy policy',
      direitos: 'All rights reserved.', linksLegais: 'Legal links', rede: function (n) { return 'IPAC on ' + n; },
      emAndamento: 'Ongoing', concluido: 'Completed', situacaoConfirmar: 'status to be confirmed', conhecaProjeto: 'Explore the project', acaoProjeto: 'Project activity',
      lerArtigo: 'Read the full article (PDF)', lerMateria: 'Read the story', emPortugues: 'in Portuguese',
      semEventos: '<strong>No events scheduled at the moment.</strong><br>Follow us on social media to hear about upcoming activities.',
      verifique: 'Please check the highlighted fields.', enviando: 'Sending…', enviar: 'Send message',
      previa: function (e) { return 'This is a local preview: messages are sent once the site is published on the server. Meanwhile, write to ' + e + '.'; },
      enviado: '<strong>Message sent!</strong> Thank you for reaching out. We will reply soon to the e-mail you provided.',
      falhou: function (e) { return 'We could not send your message right now. Please write to ' + e + '.'; },
      escaneie: 'Scan the QR code with your Brazilian banking app', ouCopia: 'or use Pix copy and paste:', copiar: 'Copy', copiado: 'Copied!',
      codigoPix: 'Pix copy-and-paste code', recebedor: 'Recipient', chave: 'Key', porMes: '/month',
      escolhaValor: 'Choose or enter an amount (minimum R$ 1.00).',
      pixConfig: '<strong>Pix is being set up.</strong> The QR code and copy-and-paste code will appear here once IPAC registers its official Pix key. Meanwhile, please <a href="contato.html">contact us</a>.',
      cartaoConfig: function (mensal) { return '<strong>Card payments are being set up.</strong> This option depends on IPAC hiring a payment provider' + (mensal ? ' that supports recurring billing (subscriptions)' : '') + '.'; },
      irPagamento: 'Go to secure payment', redirecionado: 'You will be redirected to the payment provider’s page.',
      disponivel: 'Available', esgotado: 'Sold out', fotoIlustrativa: 'illustration', precoDefinir: 'price to be defined', pedirWhats: 'Order on WhatsApp',
      msgPedido: function (p, esc2, v) { return 'Hello! I would like to place an order at the IPAC Store:\n\n• Product: ' + p + (esc2 ? '\n• ' + esc2 : '') + '\n• Quantity: 1\n• Price: ' + v + '\n\nMy name: \nCity for delivery/pick-up: '; }
    },
    es: {
      pular: 'Saltar al contenido', brasil: 'Brasil', inicioAria: 'IPAC — página de inicio', logoAlt: 'Logo del IPAC', desde: 'Desde',
      menuPrincipal: 'Menú principal', menuSecundario: 'Menú secundario', abrirMenu: 'Abrir menú', fecharMenu: 'Cerrar menú', idioma: 'Idioma',
      doe: 'Dona ahora', lema: '<b>Sensibilización ambiental</b> · Por el derecho de todo niño y niña a la naturaleza · Desde ',
      m: { inicio: 'Inicio', institucional: 'Institucional', comites: 'Comités', diretoria: 'Directorio', comiteA: 'Comité A', comiteB: 'Comité B', comiteC: 'Comité C',
        programas: 'Programas y Proyectos', andamento: 'En curso', concluidos: 'Concluidos', eventos: 'Eventos', artigos: 'Biblioteca Virtual',
        noticias: 'Noticias Verdes', faq: 'Preguntas', transparencia: 'Transparencia', contato: 'Contacto' },
      newsTitulo: 'Recibe las novedades del IPAC', newsTexto: 'Acciones, eventos y contenidos sobre sensibilización ambiental y el ECA Ambiental, directo en tu correo.',
      newsPlaceholder: 'Tu correo electrónico', newsBotao: 'Quiero recibirlas',
      newsConsent: 'Acepto recibir correos del IPAC y puedo darme de baja cuando quiera. <a href="privacidade.html">Privacidad</a>',
      newsOk: '¡Listo! Tu correo fue registrado para recibir las novedades del IPAC.', newsInvalido: 'Escribe un correo válido y marca la autorización.',
      newsErro: 'No fue posible registrarte ahora. Inténtalo más tarde.', newsPrevia: 'Vista previa local: el registro funciona cuando el sitio esté publicado en el servidor.',
      logoParceiro: 'Espacio para logo', parceiroLink: function (n) { return 'Sitio de ' + n; },
      descRodape: function (c) { return c.nome + ' (IPAC). Organización sin fines de lucro fundada en ' + c.fundacao + ' en ' + c.cidade + ', Brasil, dedicada a la defensa, preservación y recuperación ambiental y cultural. Entidad de Utilidad Pública municipal y estatal.'; },
      navegue: 'Navega', participe: 'Participa', loja: 'Tienda IPAC', eca: 'ECA Ambiental', perguntas: 'Preguntas frecuentes', privacidade: 'Política de privacidad',
      direitos: 'Todos los derechos reservados.', linksLegais: 'Enlaces legales', rede: function (n) { return n + ' del IPAC'; },
      emAndamento: 'En curso', concluido: 'Concluido', situacaoConfirmar: 'situación a confirmar', conhecaProjeto: 'Conoce el proyecto', acaoProjeto: 'Acción del proyecto',
      lerArtigo: 'Leer el artículo completo (PDF)', lerMateria: 'Leer la nota', emPortugues: 'en portugués',
      semEventos: '<strong>No hay eventos programados por ahora.</strong><br>Sigue nuestras redes sociales para conocer las próximas acciones.',
      verifique: 'Revisa los campos destacados.', enviando: 'Enviando…', enviar: 'Enviar mensaje',
      previa: function (e) { return 'Esta es una vista previa local: el envío funciona cuando el sitio esté publicado en el servidor. Mientras tanto, escribe a ' + e + '.'; },
      enviado: '<strong>¡Mensaje enviado!</strong> Gracias por escribirnos. Te responderemos pronto al correo indicado.',
      falhou: function (e) { return 'No fue posible enviar el mensaje ahora. Escribe a ' + e + '.'; },
      escaneie: 'Escanea el código QR con la app de tu banco brasileño', ouCopia: 'o usa Pix copia y pega:', copiar: 'Copiar', copiado: '¡Copiado!',
      codigoPix: 'Código Pix copia y pega', recebedor: 'Beneficiario', chave: 'Clave', porMes: '/mes',
      escolhaValor: 'Elige o escribe un monto (mínimo R$ 1,00).',
      pixConfig: '<strong>Pix en configuración.</strong> El código QR y el código copia y pega aparecerán aquí cuando el IPAC registre su clave Pix oficial. Mientras tanto, <a href="contato.html">contáctanos</a>.',
      cartaoConfig: function (mensal) { return '<strong>Pago con tarjeta en configuración.</strong> Esta opción depende de que el IPAC contrate un proveedor de pagos' + (mensal ? ' con cobro recurrente (suscripción)' : '') + '.'; },
      irPagamento: 'Ir al pago seguro', redirecionado: 'Serás dirigido a la página del proveedor de pagos.',
      disponivel: 'Disponible', esgotado: 'Agotado', fotoIlustrativa: 'imagen ilustrativa', precoDefinir: 'precio a definir', pedirWhats: 'Pedir por WhatsApp',
      msgPedido: function (p, esc2, v) { return '¡Hola! Me gustaría hacer un pedido en la Tienda IPAC:\n\n• Producto: ' + p + (esc2 ? '\n• ' + esc2 : '') + '\n• Cantidad: 1\n• Precio: ' + v + '\n\nMi nombre: \nCiudad de entrega/retiro: '; }
    }
  };
  var T = TEXTOS[LANG];

  /* ---------- Ícones (SVG em linha) ---------- */
  function svg(path, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + path + '</svg>';
  }
  var I = {
    folha: svg('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'),
    livro: svg('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),
    balanca: svg('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>'),
    agua: svg('<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>'),
    coracao: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
    sacola: svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>'),
    documento: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>'),
    escudo: svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
    email: svg('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    telefone: svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    local: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'),
    calendario: svg('<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    cartao: svg('<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>'),
    pix: svg('<path d="m12 2 4.5 4.5L12 11 7.5 6.5Z"/><path d="m12 13 4.5 4.5L12 22l-4.5-4.5Z"/><path d="M2 12l4.5-4.5L11 12l-4.5 4.5Z"/><path d="m13 12 4.5-4.5L22 12l-4.5 4.5Z"/>'),
    menu: svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    fechar: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    pessoa: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
    relogio: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    externo: svg('<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.1 23.7v-8H6.6V12h2.5v-1.6c0-4.08 1.85-5.97 5.86-5.97.76 0 2.07.15 2.6.3v3.32c-.28-.03-.77-.04-1.38-.04-1.97 0-2.73.74-2.73 2.68V12h3.92l-.67 3.67h-3.25v8.25A12 12 0 1 0 9.1 23.7"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0"/></svg>'
  };
  // Ilustrações simples dos produtos (até haver fotos reais)
  var PRODUTO_SVG = {
    camiseta: '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M42 18 22 28 10 50l16 8 6-10v58h56V48l6 10 16-8-12-22-20-10c-2 8-9 13-18 13s-16-5-18-13Z" fill="#fff" stroke="#1f5a3c" stroke-width="2.5" stroke-linejoin="round"/><circle cx="54" cy="58" r="5" fill="#3b8d5f"/><circle cx="64" cy="58" r="5" fill="#e8b622"/><path d="M53 66h22a11 11 0 0 1-22 0Z" fill="#2f3d8f"/></svg>',
    bone: '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M20 72c0-24 17-40 40-40s38 16 38 40Z" fill="#fff" stroke="#1f5a3c" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 72h78c8 0 14 3 16 8H24c-3 0-4-4-4-8Z" fill="#cfe3d4" stroke="#1f5a3c" stroke-width="2.5" stroke-linejoin="round"/><circle cx="59" cy="31" r="3" fill="#1f5a3c"/><circle cx="52" cy="54" r="5" fill="#3b8d5f"/><circle cx="62" cy="54" r="5" fill="#e8b622"/><path d="M51 62h22a11 11 0 0 1-22 0Z" fill="#2f3d8f"/></svg>',
    colete: '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M40 16h12l8 16 8-16h12l12 18v76H70V64H50v46H28V34Z" fill="#e7f1e9" stroke="#1f5a3c" stroke-width="2.5" stroke-linejoin="round"/><rect x="33" y="74" width="14" height="12" rx="2" fill="none" stroke="#1f5a3c" stroke-width="2"/><rect x="73" y="74" width="14" height="12" rx="2" fill="none" stroke="#1f5a3c" stroke-width="2"/><circle cx="78" cy="46" r="3.5" fill="#3b8d5f"/><circle cx="85" cy="46" r="3.5" fill="#e8b622"/></svg>'
  };

  /* ---------- Utilitários ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function dataBR(iso) { return new Date(iso + 'T12:00:00').toLocaleDateString(LOCALE, { day: '2-digit', month: '2-digit', year: 'numeric' }); }
  function porData(a, b) { return a.data < b.data ? 1 : a.data > b.data ? -1 : 0; }
  function hoje() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function moeda(v) { return v.toLocaleString(LOCALE, { style: 'currency', currency: 'BRL' }); }
  function soDigitos(s) { return String(s || '').replace(/\D/g, ''); }

  /* ---------- Menu ---------- */
  var MENU = [
    { id: 'inicio', rotulo: T.m.inicio, href: 'index.html' },
    { id: 'institucional', rotulo: T.m.institucional, href: 'institucional.html' },
    { id: 'comites', rotulo: T.m.comites, href: 'comites.html', sub: [
      [T.m.diretoria, 'comites.html#diretoria'], [T.m.comiteA, 'comites.html#comite-a'],
      [T.m.comiteB, 'comites.html#comite-b'], [T.m.comiteC, 'comites.html#comite-c']] },
    { id: 'programas', rotulo: T.m.programas, href: 'programas.html', sub: [
      [T.m.andamento, 'programas.html#em-andamento'], [T.m.concluidos, 'programas.html#concluidos']] },
    { id: 'eventos', rotulo: T.m.eventos, href: 'eventos.html' },
    { id: 'artigos', rotulo: T.m.artigos, href: 'artigos.html' },
    { id: 'noticias', rotulo: T.m.noticias, href: 'noticias-verdes.html' },
    { id: 'faq', rotulo: T.m.faq, href: 'faq.html' },
    { id: 'transparencia', rotulo: T.m.transparencia, href: 'transparencia.html' },
    { id: 'contato', rotulo: T.m.contato, href: 'contato.html' }
  ];

  // Mesmo arquivo no outro idioma (funciona no servidor e abrindo o arquivo direto)
  function seletorIdiomas() {
    var arquivo = location.pathname.split('/').pop() || 'index.html';
    return '<nav class="idiomas" aria-label="' + T.idioma + '">' + [['pt', 'PT', 'Português'], ['es', 'ES', 'Español'], ['en', 'EN', 'English']].map(function (l) {
      var href = BASE + (l[0] === 'pt' ? '' : l[0] + '/') + arquivo + location.hash;
      return '<a href="' + href + '" lang="' + l[0] + '" hreflang="' + l[0] + '" title="' + l[2] + '"' + (l[0] === LANG ? ' aria-current="true"' : '') + '>' + l[1] + '</a>';
    }).join('') + '</nav>';
  }
  function itemMenu(id) { for (var i = 0; i < MENU.length; i++) if (MENU[i].id === id) return MENU[i]; return null; }

  function redesHTML(cls) {
    var r = CFG.redes || {}, out = '';
    if (r.instagram) out += '<a href="' + esc(r.instagram) + '" target="_blank" rel="noopener" aria-label="' + T.rede('Instagram') + '">' + I.instagram + '</a>';
    if (r.facebook) out += '<a href="' + esc(r.facebook) + '" target="_blank" rel="noopener" aria-label="' + T.rede('Facebook') + '">' + I.facebook + '</a>';
    if (r.linkedin) out += '<a href="' + esc(r.linkedin) + '" target="_blank" rel="noopener" aria-label="' + T.rede('LinkedIn') + '">' + I.linkedin + '</a>';
    return '<div class="' + cls + '">' + out + '</div>';
  }
  function telLink(t) { return 'tel:+55' + soDigitos(t); }

  function montarCabecalho() {
    var alvo = $('#site-header');
    if (!alvo) return;
    var links = MENU.map(function (m) {
      var atual = m.id === pagina;
      return '<li' + (m.sub ? ' class="tem-sub"' : '') + '><a href="' + m.href + '" data-id="' + m.id + '"' +
        (atual ? ' aria-current="page"' : '') + '>' + esc(m.rotulo) + '</a></li>';
    }).join('');
    var linksMobile = MENU.map(function (m) {
      var sub = m.sub ? '<ul class="sub">' + m.sub.map(function (s) { return '<li><a href="' + s[1] + '">' + esc(s[0]) + '</a></li>'; }).join('') + '</ul>' : '';
      return '<li><a href="' + m.href + '"' + (m.id === pagina ? ' aria-current="page"' : '') + '>' + esc(m.rotulo) + '</a>' + sub + '</li>';
    }).join('');

    alvo.outerHTML =
      '<a class="pular-conteudo" href="#conteudo">' + T.pular + '</a>' +
      '<div class="topo-faixa"><div class="container">' +
        '<div class="contatos">' +
          '<span class="ocultar-mobile">' + esc(CFG.cidade || '') + ' · ' + T.brasil + '</span>' +
          (CFG.telefone ? '<a href="' + telLink(CFG.telefone) + '">' + esc(CFG.telefone) + '</a>' : '') +
          (CFG.email ? '<a class="ocultar-estreito" href="mailto:' + esc(CFG.email) + '">' + esc(CFG.email) + '</a>' : '') +
          seletorIdiomas() +
        '</div>' + redesHTML('redes') +
      '</div></div>' +
      '<header class="cabecalho" id="cabecalho">' +
        '<div class="cabecalho-principal"><div class="container">' +
          '<a class="marca" href="index.html" aria-label="' + T.inicioAria + '">' +
            '<img src="' + BASE + 'assets/img/logo-marca.png" alt="' + T.logoAlt + '" width="160" height="81">' +
            '<span class="marca-texto"><strong>' + esc(CFG.nome || 'IPAC') + '</strong><span>' + T.desde + ' ' + esc(CFG.fundacao || '') + ' · ' + esc(CFG.cidade || '') + '</span></span>' +
          '</a>' +
          '<nav aria-label="' + T.menuPrincipal + '"><ul class="menu-principal">' + links + '</ul></nav>' +
          '<div class="acoes-cabecalho">' +
            '<a class="btn btn-sol btn-sm btn-doe-desktop" href="doe.html">' + I.coracao.replace('<svg', '<svg width="16" height="16"') + ' ' + T.doe + '</a>' +
            '<button class="botao-menu" type="button" aria-label="' + T.abrirMenu + '" aria-expanded="false" aria-controls="menu-mobile">' + I.menu + '</button>' +
          '</div>' +
        '</div></div>' +
        '<nav class="subnav" aria-label="' + T.menuSecundario + '"><div class="container" id="subnav-conteudo"></div></nav>' +
      '</header>' +
      '<div class="menu-mobile" id="menu-mobile" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<div class="menu-mobile-painel">' +
          '<div class="menu-mobile-topo"><img src="' + BASE + 'assets/img/logo-marca.png" alt="IPAC" style="height:38px;width:auto">' +
          '<button class="botao-menu" type="button" aria-label="' + T.fecharMenu + '" style="display:inline-flex">' + I.fechar + '</button></div>' +
          '<ul>' + linksMobile + '</ul>' +
          '<a class="btn btn-sol" href="doe.html">' + T.doe + '</a>' +
        '</div>' +
      '</div>';

    configurarSubnav();
    configurarMenuMobile();
    // o seletor de idioma acompanha a aba/filtro atual (#comite-b, #concluidos...)
    window.addEventListener('hashchange', function () {
      $$('.idiomas a').forEach(function (a) { a.setAttribute('href', a.getAttribute('href').split('#')[0] + location.hash); });
    });
  }

  /* Menu secundário: mostra os subitens da seção atual; ao passar o mouse
     (ou focar pelo teclado) num item com subitens, mostra os dele. */
  function configurarSubnav() {
    var caixa = $('#subnav-conteudo');
    function render(id) {
      var m = itemMenu(id);
      if (m && m.sub) {
        var hash = location.hash;
        caixa.innerHTML = '<span class="subnav-rotulo">' + esc(m.rotulo) + '</span>' + m.sub.map(function (s) {
          var marcado = pagina === m.id && (s[1].split('#')[1] === hash.slice(1));
          return '<a href="' + s[1] + '"' + (marcado ? ' aria-current="true"' : '') + '>' + esc(s[0]) + '</a>';
        }).join('');
      } else {
        caixa.innerHTML = '<span class="subnav-lema">' + T.lema + esc(CFG.fundacao || 2004) + '</span>';
      }
    }
    var secaoAtual = pagina;
    render(secaoAtual);
    var cab = $('#cabecalho');
    $$('.menu-principal a').forEach(function (a) {
      function mostrar() {
        var m = itemMenu(a.getAttribute('data-id'));
        $$('.menu-principal a').forEach(function (x) { x.classList.remove('ativo-hover'); });
        if (m && m.sub) { a.classList.add('ativo-hover'); render(m.id); }
      }
      a.addEventListener('mouseenter', mostrar);
      a.addEventListener('focus', mostrar);
    });
    cab.addEventListener('mouseleave', function () {
      $$('.menu-principal a').forEach(function (x) { x.classList.remove('ativo-hover'); });
      render(secaoAtual);
    });
    window.addEventListener('hashchange', function () { render(secaoAtual); });
  }

  function configurarMenuMobile() {
    var painel = $('#menu-mobile');
    var abrir = $('.acoes-cabecalho .botao-menu');
    var fechar = $('.menu-mobile .botao-menu');
    function set(aberto) {
      painel.classList.toggle('aberto', aberto);
      abrir.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      document.body.style.overflow = aberto ? 'hidden' : '';
      if (aberto) fechar.focus(); else abrir.focus();
    }
    abrir.addEventListener('click', function () { set(true); });
    fechar.addEventListener('click', function () { set(false); });
    painel.addEventListener('click', function (e) { if (e.target === painel) set(false); });
    $$('a', painel).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && painel.classList.contains('aberto')) set(false); });
  }

  function montarRodape() {
    var alvo = $('#site-footer');
    if (!alvo) return;
    var ano = new Date().getFullYear();
    alvo.outerHTML =
      '<footer class="rodape">' +
        '<div class="rodape-chamada"><div class="container">' +
          '<div class="novidades-texto"><h2>' + T.newsTitulo + '</h2><p>' + T.newsTexto + '</p></div>' +
          '<form class="novidades" id="form-novidades" novalidate>' +
            '<div class="novidades-linha">' +
              '<label for="novidades-email" class="sr-only">E-mail</label>' +
              '<input id="novidades-email" name="email" type="email" autocomplete="email" required maxlength="160" placeholder="' + T.newsPlaceholder + '">' +
              '<button class="btn btn-sol" type="submit">' + T.newsBotao + '</button>' +
            '</div>' +
            '<div class="campo-isca" aria-hidden="true"><input name="site" type="text" tabindex="-1" autocomplete="off"></div>' +
            '<input type="hidden" name="idioma" value="' + LANG + '">' +
            '<label class="novidades-consentimento"><input id="novidades-consentimento" type="checkbox" name="consentimento" value="sim" required> <span>' + T.newsConsent + '</span></label>' +
            '<p class="novidades-aviso" role="status" hidden></p>' +
          '</form>' +
        '</div></div>' +
        '<div class="container rodape-grade">' +
          '<div>' +
            '<a class="rodape-marca" href="index.html"><img src="' + BASE + 'assets/img/logo-marca.png" alt="IPAC" width="118" height="60"></a>' +
            '<p>' + esc(T.descRodape(CFG)) + '</p>' +
            redesHTML('redes-rodape') +
          '</div>' +
          '<div><h3>' + T.navegue + '</h3><ul>' +
            '<li><a href="institucional.html">' + T.m.institucional + '</a></li>' +
            '<li><a href="comites.html">' + T.m.comites + '</a></li>' +
            '<li><a href="programas.html">' + esc(T.m.programas) + '</a></li>' +
            '<li><a href="eventos.html">' + T.m.eventos + '</a></li>' +
            '<li><a href="artigos.html">' + T.m.artigos + '</a></li>' +
            '<li><a href="noticias-verdes.html">' + T.m.noticias + '</a></li>' +
          '</ul></div>' +
          '<div><h3>' + T.participe + '</h3><ul>' +
            '<li><a href="doe.html">' + T.doe + '</a></li>' +
            '<li><a href="loja.html">' + T.loja + '</a></li>' +
            '<li><a href="transparencia.html">' + T.m.transparencia + '</a></li>' +
            '<li><a href="eca-ambiental.html">' + T.eca + '</a></li>' +
            '<li><a href="faq.html">' + T.perguntas + '</a></li>' +
            '<li><a href="contato.html">' + T.m.contato + '</a></li>' +
          '</ul></div>' +
          '<div><h3>' + T.m.contato + '</h3><ul class="rodape-contato">' +
            (CFG.email ? '<li>' + I.email + '<a href="mailto:' + esc(CFG.email) + '">' + esc(CFG.email) + '</a></li>' : '') +
            (CFG.telefone ? '<li>' + I.telefone + '<a href="' + telLink(CFG.telefone) + '">' + esc(CFG.telefone) + '</a></li>' : '') +
            '<li>' + I.local + '<span>' + (CFG.endereco ? esc(CFG.endereco) : esc(CFG.cidade || '')) + '</span></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="rodape-base"><div class="container">' +
          '<span>© ' + ano + ' ' + esc(CFG.sigla || 'IPAC') + ' — ' + esc(CFG.nome || '') + '. ' + T.direitos + '</span>' +
          '<nav aria-label="' + T.linksLegais + '"><a href="privacidade.html">' + T.privacidade + '</a><a href="transparencia.html">' + T.m.transparencia + '</a></nav>' +
        '</div></div>' +
      '</footer>';
  }

  /* ---------- Renderizadores de conteúdo ---------- */
  function etiquetaSituacao(p) {
    var t = p.situacao === 'andamento' ? '<span class="etiqueta etiqueta-andamento">' + T.emAndamento + '</span>' : '<span class="etiqueta etiqueta-concluido">' + T.concluido + '</span>';
    if (p.confirmar) t += ' <span class="provisorio">' + T.situacaoConfirmar + '</span>';
    return t;
  }
  function cardProjeto(p) {
    var titulo = p.link ? '<a href="' + p.link + '">' + esc(p.titulo) + '</a>' : esc(p.titulo);
    return '<article class="card">' +
      '<div class="card-img"><img src="' + asset(p.imagem) + '" alt="" loading="lazy"></div>' +
      '<div class="card-corpo">' +
        '<div class="card-meta">' + etiquetaSituacao(p) + '</div>' +
        '<h3>' + titulo + '</h3>' +
        '<p>' + esc(p.resumo) + '</p>' +
        '<div class="card-rodape card-meta">' + I.local.replace('<svg', '<svg width="14" height="14"') + ' ' + esc(p.local) + (p.periodo ? ' · ' + esc(p.periodo) : '') + '</div>' +
      '</div></article>';
  }
  function destaqueProjeto(p) {
    return '<article class="destaque-projeto card">' +
      '<img src="' + asset(p.imagem) + '" alt="' + T.acaoProjeto + ' ' + esc(p.titulo) + '" loading="lazy">' +
      '<div class="card-corpo">' +
        '<div class="card-meta">' + etiquetaSituacao(p) + '<span>' + esc(p.local) + '</span></div>' +
        '<h3><a href="' + p.link + '">' + esc(p.titulo) + '</a></h3>' +
        '<p>' + esc(p.resumo) + '</p>' +
        '<div class="card-rodape"><span class="link-seta">' + T.conhecaProjeto + '</span></div>' +
      '</div></article>';
  }
  function cardEvento(e) {
    // "30 out 2025" → 30 / out 2025 · "set 2024" → set / 2024 · "2023" → 2023
    var partes = (e.dataTexto || '').split(' ');
    var grande = partes[0];
    var pequeno = partes.slice(1).join(' ');
    return '<article class="card">' +
      '<div class="evento-data">' + esc(grande) + (pequeno ? '<small>' + esc(pequeno) + '</small>' : '') + '</div>' +
      '<div class="card-img"><img src="' + asset(e.imagem) + '" alt="" loading="lazy"></div>' +
      '<div class="card-corpo">' +
        '<h3>' + esc(e.titulo) + '</h3>' +
        '<div class="card-rodape card-meta">' + I.local.replace('<svg', '<svg width="14" height="14"') + ' ' + esc(e.local) + '</div>' +
      '</div></article>';
  }
  function cardArtigo(a) {
    return '<article class="card">' +
      '<div class="card-img"><img src="' + asset(a.imagem) + '" alt="" loading="lazy"></div>' +
      '<div class="card-corpo">' +
        '<div class="card-meta"><span class="etiqueta etiqueta-agua">' + esc(a.categoria) + '</span><span>' + esc(a.dataTexto) + '</span></div>' +
        '<h3><a href="' + asset(a.arquivo) + '" target="_blank" rel="noopener">' + esc(a.titulo) + '</a></h3>' +
        '<p>' + esc(a.resumo) + '</p>' +
        '<div class="card-rodape card-meta"><span>' + I.pessoa.replace('<svg', '<svg width="14" height="14"') + ' ' + esc(a.autores) + '</span></div>' +
        '<div class="card-rodape" style="padding-top:8px"><span class="link-seta">' + T.lerArtigo + '</span></div>' +
      '</div></article>';
  }
  function cardNoticia(n) {
    return '<article class="card">' +
      '<div class="card-img"><img src="' + asset(n.imagem) + '" alt="" loading="lazy"></div>' +
      '<div class="card-corpo">' +
        '<div class="card-meta"><span class="etiqueta">' + esc(n.fonte) + '</span><span>' + dataBR(n.data) + '</span></div>' +
        '<h3><a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.titulo) + '</a></h3>' +
        '<div class="card-rodape"><span class="link-seta">' + T.lerMateria + (T.emPortugues ? ' (' + T.emPortugues + ')' : '') + '</span></div>' +
      '</div></article>';
  }
  function itemEditorial(titulo, meta, img, href, externo) {
    return '<li><a href="' + esc(href) + '"' + (externo ? ' target="_blank" rel="noopener"' : '') + '>' +
      '<img src="' + asset(img) + '" alt="" loading="lazy">' +
      '<span><span class="meta">' + meta + '</span><span class="titulo">' + esc(titulo) + '</span></span></a></li>';
  }

  function renderInicio() {
    var proj = DADOS.projetos || [];
    var el = $('#home-projetos');
    if (el) {
      var dest = proj.filter(function (p) { return p.destaque; })[0];
      var outros = proj.filter(function (p) { return !p.destaque && !p.confirmar; }).slice(0, 3);
      el.innerHTML = (dest ? destaqueProjeto(dest) : '') + '<div class="grade grade-3">' + outros.map(cardProjeto).join('') + '</div>';
    }
    el = $('#home-eventos');
    if (el) el.innerHTML = (DADOS.eventos || []).slice().sort(porData).slice(0, 3).map(cardEvento).join('');
    el = $('#home-artigos');
    if (el) el.innerHTML = (DADOS.artigos || []).slice().sort(porData).slice(0, 3).map(function (a) {
      return itemEditorial(a.titulo, esc(a.dataTexto) + ' · ' + esc(a.categoria), a.imagem, asset(a.arquivo), true);
    }).join('');
    el = $('#home-noticias');
    if (el) el.innerHTML = (DADOS.noticias || []).filter(function (n) { return n.imagem; }).sort(porData).slice(0, 3).map(function (n) {
      return itemEditorial(n.titulo, dataBR(n.data) + ' · ' + esc(n.fonte), n.imagem, n.link, true);
    }).join('');
  }

  function renderProgramas() {
    var lista = $('#lista-projetos');
    if (!lista) return;
    var proj = DADOS.projetos || [];
    var botoes = $$('[data-filtro]');
    function contar(f) { return proj.filter(function (p) { return f === 'todos' || p.situacao === f; }).length; }
    botoes.forEach(function (b) { b.insertAdjacentHTML('beforeend', '<span class="qtd">(' + contar(b.getAttribute('data-filtro')) + ')</span>'); });
    function aplicar() {
      var h = location.hash.slice(1);
      var f = h === 'em-andamento' ? 'andamento' : h === 'concluidos' ? 'concluido' : 'todos';
      botoes.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filtro') === f ? 'true' : 'false'); });
      var itens = proj.filter(function (p) { return f === 'todos' || p.situacao === f; });
      lista.innerHTML = itens.map(cardProjeto).join('');
    }
    botoes.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filtro');
        var h = f === 'andamento' ? '#em-andamento' : f === 'concluido' ? '#concluidos' : '';
        history.replaceState(null, '', location.pathname + h);
        aplicar();
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });
    });
    window.addEventListener('hashchange', aplicar);
    aplicar();
  }

  function renderEventos() {
    var prox = $('#eventos-proximos'), ant = $('#eventos-realizados');
    if (!prox && !ant) return;
    var h = hoje();
    var ev = (DADOS.eventos || []).slice().sort(porData);
    var futuros = ev.filter(function (e) { return e.data >= h; }).reverse();
    var passados = ev.filter(function (e) { return e.data < h; });
    prox.innerHTML = futuros.length ? '<div class="grade grade-3">' + futuros.map(cardEvento).join('') + '</div>' :
      '<div class="vazio">' + I.calendario + '<p class="mb-0">' + T.semEventos + '</p></div>';
    ant.innerHTML = passados.map(cardEvento).join('');
  }

  function renderArtigos() {
    var el = $('#lista-artigos');
    if (el) el.innerHTML = (DADOS.artigos || []).slice().sort(porData).map(cardArtigo).join('');
  }

  function renderNoticias() {
    var dest = $('#noticias-destaque'), lista = $('#noticias-lista');
    if (!dest) return;
    var todas = (DADOS.noticias || []).slice().sort(porData);
    var comImg = todas.filter(function (n) { return n.imagem; }).slice(0, 3);
    dest.innerHTML = comImg.map(cardNoticia).join('');
    var resto = todas.filter(function (n) { return comImg.indexOf(n) < 0; });
    var porAno = {};
    resto.forEach(function (n) { var a = n.data.slice(0, 4); (porAno[a] = porAno[a] || []).push(n); });
    lista.innerHTML = Object.keys(porAno).sort().reverse().map(function (ano) {
      return '<h2 class="noticia-ano">' + ano + '</h2><ul class="lista-noticias">' + porAno[ano].map(function (n) {
        return '<li><a href="' + esc(n.link) + '" target="_blank" rel="noopener"><span class="data">' + dataBR(n.data) + '</span><span class="titulo">' + esc(n.titulo) + '</span><span class="fonte">' + esc(n.fonte) + '</span></a></li>';
      }).join('') + '</ul>';
    }).join('');
  }

  /* Comitês: abas controladas pelo endereço (#diretoria, #comite-a ...) */
  function configurarComites() {
    var paineis = $$('.painel-comite');
    if (!paineis.length) return;
    var abas = $$('[data-aba]');
    function aplicar() {
      var id = location.hash.slice(1);
      if (!paineis.some(function (p) { return p.id === id; })) id = paineis[0].id;
      paineis.forEach(function (p) { p.hidden = p.id !== id; });
      abas.forEach(function (a) { a.setAttribute('aria-selected', a.getAttribute('data-aba') === id ? 'true' : 'false'); });
    }
    abas.forEach(function (a) {
      a.addEventListener('click', function () { location.hash = a.getAttribute('data-aba'); });
    });
    window.addEventListener('hashchange', aplicar);
    aplicar();
  }

  /* Índice lateral com destaque da seção visível */
  function configurarIndice() {
    var links = $$('.indice a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var mapa = {};
    links.forEach(function (a) { var s = document.getElementById(a.getAttribute('href').slice(1)); if (s) mapa[s.id] = a; });
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('ativo'); });
          mapa[e.target.id].classList.add('ativo');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(mapa).forEach(function (id) { obs.observe(document.getElementById(id)); });
  }

  /* ---------- Formulário de contato ---------- */
  function configurarContato() {
    var form = $('#form-contato');
    if (!form) return;
    var inicio = Date.now();
    var aviso = $('#form-aviso');
    function mostrar(tipo, html) { aviso.className = 'aviso aviso-' + tipo; aviso.innerHTML = html; aviso.hidden = false; }
    function validar() {
      var ok = true;
      $$('[required]', form).forEach(function (c) {
        var campo = c.closest('.campo') || c.closest('.consentimento');
        var valido = c.type === 'checkbox' ? c.checked : c.checkValidity() && c.value.trim() !== '';
        if (campo) campo.classList.toggle('invalido', !valido);
        if (!valido && ok) { c.focus(); ok = false; }
      });
      return ok;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      aviso.hidden = true;
      if (!validar()) { mostrar('erro', T.verifique); return; }
      var emailLink = '<a href="mailto:' + esc(CFG.email) + '">' + esc(CFG.email) + '</a>';
      if (location.protocol === 'file:') { mostrar('info', T.previa(emailLink)); return; }
      var dados = new FormData(form);
      dados.append('tempo', String(Math.round((Date.now() - inicio) / 1000)));
      var botao = $('button[type=submit]', form);
      botao.disabled = true; botao.textContent = T.enviando;
      fetch(BASE + (CFG.formularioContato || 'enviar.php'), { method: 'POST', body: dados, headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (r) {
          if (r.ok) { form.reset(); mostrar('sucesso', T.enviado); }
          // as mensagens de erro do servidor estão em português; nos outros idiomas usa a genérica
          else mostrar('erro', LANG === 'pt' && r.erro ? esc(r.erro) + ' Se preferir, escreva para ' + emailLink + '.' : T.falhou(emailLink));
        })
        .catch(function () { mostrar('erro', T.falhou(emailLink)); })
        .then(function () { botao.disabled = false; botao.textContent = T.enviar; });
    });
    $$('input, textarea', form).forEach(function (c) {
      c.addEventListener('input', function () { var p = c.closest('.campo'); if (p) p.classList.remove('invalido'); });
    });
  }

  /* ---------- Pix: gera o "copia e cola" (padrão BR Code do Banco Central) ---------- */
  function semAcento(s, max) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9 .\-]/g, '').toUpperCase().slice(0, max);
  }
  function emv(id, valor) { return id + String(valor.length).padStart(2, '0') + valor; }
  function crc16(s) {
    var crc = 0xFFFF;
    for (var i = 0; i < s.length; i++) {
      crc ^= s.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
  function pixPayload(valor, descricao) {
    var p = CFG.pix || {};
    var conta = emv('00', 'br.gov.bcb.pix') + emv('01', p.chave) + (descricao ? emv('02', semAcento(descricao, 40)) : '');
    var s = emv('00', '01') + emv('26', conta) + emv('52', '0000') + emv('53', '986') +
      (valor ? emv('54', valor.toFixed(2)) : '') + emv('58', 'BR') +
      emv('59', semAcento(p.recebedor || 'IPAC', 25)) + emv('60', semAcento(p.cidade || 'BRASIL', 15)) +
      emv('62', emv('05', '***')) + '6304';
    return s + crc16(s);
  }
  function carregarQR(cb) {
    if (window.QRCode) return cb();
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }
  function caixaPix(alvo, valor, descricao) {
    var codigo = pixPayload(valor, descricao);
    alvo.innerHTML = '<div class="pix-caixa">' +
      '<p class="mb-0"><strong>' + T.escaneie + '</strong></p>' +
      '<div id="pix-qrcode" aria-label="QR Code Pix"></div>' +
      '<p class="pequeno texto-suave">' + T.ouCopia + '</p>' +
      '<div class="pix-codigo"><input class="campo" readonly value="' + esc(codigo) + '" aria-label="' + T.codigoPix + '" style="padding:10px;border:1.5px solid var(--linha-2);border-radius:10px">' +
      '<button type="button" class="btn btn-primario btn-sm" id="pix-copiar">' + T.copiar + '</button></div>' +
      '<p class="pequeno texto-suave mt-1">' + T.recebedor + ': ' + esc(CFG.pix.recebedor) + ' · ' + T.chave + ': ' + esc(CFG.pix.chave) + '</p></div>';
    carregarQR(function () {
      var box = $('#pix-qrcode', alvo);
      if (window.QRCode) new window.QRCode(box, { text: codigo, width: 200, height: 200, correctLevel: window.QRCode.CorrectLevel.M });
      else box.outerHTML = '';
    });
    $('#pix-copiar', alvo).addEventListener('click', function () {
      var inp = $('.pix-codigo input', alvo);
      inp.select();
      (navigator.clipboard ? navigator.clipboard.writeText(codigo) : Promise.reject()).catch(function () { document.execCommand('copy'); });
      this.textContent = T.copiado;
    });
  }

  /* Aceita "35,50" e "1.000,50" (BR) e também "35.50" e "1,000.50" (EN):
     o último separador seguido de 1 ou 2 dígitos é o decimal; os demais separam milhares. */
  function lerValor(texto) {
    var s = String(texto).replace(/[^\d.,]/g, '');
    var m = s.match(/^(.*)[.,](\d{1,2})$/);
    return parseFloat(m ? m[1].replace(/[.,]/g, '') + '.' + m[2] : s.replace(/[.,]/g, ''));
  }
  window.IPAC_lerValor = lerValor; // exposto só para o autoteste em ferramentas/testes.html

  /* ---------- Doação ---------- */
  function configurarDoacao() {
    var raiz = $('#doacao');
    if (!raiz) return;
    var estado = { tipo: 'unica', valor: 100, metodo: 'pix' };
    var outro = $('#outro-valor');
    var resultado = $('#doacao-resultado');
    function marcar(grupo, attr, val) { $$('[' + attr + ']', raiz).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute(attr) === String(val) ? 'true' : 'false'); }); }
    function atualizar() {
      marcar('tipo', 'data-tipo', estado.tipo);
      marcar('valor', 'data-valor', estado.valor);
      marcar('metodo', 'data-metodo', estado.metodo);
      $('#resumo-valor').textContent = estado.valor ? moeda(estado.valor) + (estado.tipo === 'mensal' ? T.porMes : '') : '—';
      $('#aviso-mensal').hidden = estado.tipo !== 'mensal';
      var pixBtn = $('[data-metodo="pix"]', raiz);
      pixBtn.disabled = estado.tipo === 'mensal';
      if (estado.tipo === 'mensal' && estado.metodo === 'pix') { estado.metodo = 'cartao'; marcar('metodo', 'data-metodo', 'cartao'); }
      resultado.hidden = true;
    }
    $$('[data-tipo]', raiz).forEach(function (b) { b.addEventListener('click', function () { estado.tipo = b.getAttribute('data-tipo'); atualizar(); }); });
    $$('[data-valor]', raiz).forEach(function (b) { b.addEventListener('click', function () { estado.valor = +b.getAttribute('data-valor'); outro.value = ''; atualizar(); }); });
    $$('[data-metodo]', raiz).forEach(function (b) { b.addEventListener('click', function () { if (!b.disabled) { estado.metodo = b.getAttribute('data-metodo'); atualizar(); } }); });
    outro.addEventListener('input', function () {
      var v = lerValor(outro.value);
      estado.valor = v >= 1 ? Math.round(v * 100) / 100 : 0;
      atualizar();
    });
    $('#doacao-continuar').addEventListener('click', function () {
      resultado.hidden = false;
      if (!estado.valor) { resultado.innerHTML = '<div class="aviso aviso-erro">' + T.escolhaValor + '</div>'; return; }
      var c = CFG.cartao || {};
      if (estado.metodo === 'pix') {
        if (CFG.pix && CFG.pix.chave) caixaPix(resultado, estado.valor, 'Doacao IPAC');
        else resultado.innerHTML = '<div class="bloco-provisorio">' + T.pixConfig + '</div>';
      } else {
        var link = estado.tipo === 'mensal' ? c.linkMensal : c.linkUnica;
        if (link) resultado.innerHTML = '<a class="btn btn-primario" style="width:100%" href="' + esc(link) + '" target="_blank" rel="noopener">' + T.irPagamento + '</a><p class="pequeno texto-suave mt-1">' + T.redirecionado + '</p>';
        else resultado.innerHTML = '<div class="bloco-provisorio">' + T.cartaoConfig(estado.tipo === 'mensal') + '</div>';
      }
    });
    atualizar();
  }

  /* ---------- Loja ---------- */
  function renderLoja() {
    var el = $('#lista-produtos');
    if (!el) return;
    var zap = soDigitos(CFG.whatsappLoja);
    el.innerHTML = (DADOS.produtos || []).map(function (p) {
      var opcoes = Object.keys(p.opcoes || {}).map(function (nome) {
        return '<div class="opcoes-rotulo">' + esc(nome) + '</div><div class="opcoes" data-opcao="' + esc(nome) + '">' +
          p.opcoes[nome].map(function (o, i) { return '<button type="button" aria-pressed="' + (i === 0) + '">' + esc(o) + '</button>'; }).join('') + '</div>';
      }).join('');
      var pode = zap && p.preco != null && p.disponivel;
      return '<article class="card produto" data-produto="' + esc(p.id) + '">' +
        '<div class="card-img">' + (p.imagem ? '<img src="' + asset(p.imagem) + '" alt="' + esc(p.nome) + '">' : PRODUTO_SVG[p.icone] || '') + '</div>' +
        '<div class="card-corpo">' +
          '<div class="card-meta">' + (p.disponivel ? '<span class="etiqueta etiqueta-andamento">' + T.disponivel + '</span>' : '<span class="etiqueta etiqueta-concluido">' + T.esgotado + '</span>') + (p.imagem ? '' : ' <span class="provisorio">' + T.fotoIlustrativa + '</span>') + '</div>' +
          '<h3>' + esc(p.nome) + '</h3><p>' + esc(p.descricao) + '</p>' +
          '<div class="preco">' + (p.preco != null ? moeda(p.preco) : '<span class="provisorio">' + T.precoDefinir + '</span>') + '</div>' +
          opcoes +
          '<button type="button" class="btn ' + (pode ? 'btn-primario' : 'btn-contorno') + ' pedir" style="width:100%"' + (pode ? '' : ' disabled') + '>' + I.whatsapp.replace('<svg', '<svg width="18" height="18"') + ' ' + T.pedirWhats + '</button>' +
        '</div></article>';
    }).join('');
    $$('.opcoes', el).forEach(function (g) {
      $$('button', g).forEach(function (b) {
        b.addEventListener('click', function () { $$('button', g).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); b.setAttribute('aria-pressed', 'true'); });
      });
    });
    $$('.pedir', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var card = b.closest('.produto');
        var p = (DADOS.produtos || []).filter(function (x) { return x.id === card.getAttribute('data-produto'); })[0];
        var escolhas = $$('.opcoes', card).map(function (g) { return g.getAttribute('data-opcao') + ': ' + $('[aria-pressed="true"]', g).textContent; }).join(', ');
        var msg = T.msgPedido(p.nome, escolhas, moeda(p.preco));
        window.open('https://wa.me/' + zap + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    });
    var aviso = $('#loja-aviso');
    if (aviso) aviso.hidden = !!zap;
  }

  /* ---------- Parceiros e apoiadores (página inicial) ---------- */
  function renderParceiros() {
    [['#logos-parceiros', CFG.parceiros, 5], ['#logos-apoiadores', CFG.apoiadores, 6]].forEach(function (g) {
      var el = $(g[0]);
      if (!el) return;
      var lista = g[1] || [];
      if (!lista.length) {
        el.innerHTML = new Array(g[2] + 1).join('<div class="logo-item logo-vazio"><span>' + T.logoParceiro + '</span></div>');
        return;
      }
      el.innerHTML = lista.map(function (p) {
        var img = '<img src="' + asset(p.logo) + '" alt="' + esc(p.nome) + '" loading="lazy">';
        return p.link ? '<a class="logo-item" href="' + esc(p.link) + '" target="_blank" rel="noopener" title="' + esc(T.parceiroLink(p.nome)) + '">' + img + '</a>' : '<div class="logo-item">' + img + '</div>';
      }).join('');
    });
  }

  /* ---------- Novidades por e-mail (rodapé) ---------- */
  function configurarNovidades() {
    var form = $('#form-novidades');
    if (!form) return;
    var inicio = Date.now(), aviso = $('.novidades-aviso', form), email = $('#novidades-email'), ok = $('#novidades-consentimento');
    function mostrar(tipo, txt) { aviso.textContent = txt; aviso.className = 'novidades-aviso ' + tipo; aviso.hidden = false; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!email.checkValidity() || !email.value.trim() || !ok.checked) { mostrar('erro', T.newsInvalido); (ok.checked ? email : ok).focus(); return; }
      if (location.protocol === 'file:') { mostrar('info', T.newsPrevia); return; }
      var dados = new FormData(form);
      dados.append('tempo', String(Math.round((Date.now() - inicio) / 1000)));
      var botao = $('button', form);
      botao.disabled = true;
      fetch(BASE + (CFG.formularioNovidades || 'newsletter.php'), { method: 'POST', body: dados, headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (r) { if (r.ok) { form.reset(); mostrar('sucesso', T.newsOk); } else mostrar('erro', T.newsErro); })
        .catch(function () { mostrar('erro', T.newsErro); })
        .then(function () { botao.disabled = false; });
    });
  }

  /* ---------- Movimento (desligado com "reduzir movimento") ---------- */
  var semMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Separa o título em palavras para a animação de entrada (preserva <em>, <strong> etc.)
  function dividirPalavras(el) {
    var i = 0;
    (function percorrer(no) {
      Array.prototype.slice.call(no.childNodes).forEach(function (filho) {
        if (filho.nodeType === 3) {
          var frag = document.createDocumentFragment();
          filho.textContent.split(/(\s+)/).forEach(function (parte) {
            if (!parte) return;
            if (/^\s+$/.test(parte)) { frag.appendChild(document.createTextNode(' ')); return; }
            var p = document.createElement('span'); p.className = 'palavra';
            var s = document.createElement('span'); s.style.setProperty('--i', i++); s.textContent = parte;
            p.appendChild(s); frag.appendChild(p);
          });
          no.replaceChild(frag, filho);
        } else if (filho.nodeType === 1) percorrer(filho);
      });
    })(el);
    el.classList.add('titulo-animado');
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
  }

  function iniciarMovimento() {
    var raiz = document.documentElement;
    raiz.classList.add('js');

    // Motivo da logo nos topos das páginas internas
    $$('.pagina-topo').forEach(function (t) {
      t.insertAdjacentHTML('beforeend', '<div class="motivo" aria-hidden="true"><i class="m-anel"></i><i class="m-verde"></i><i class="m-sol"></i><i class="m-agua"></i></div>');
    });

    // Setas nos botões-link
    $$('a.btn').forEach(function (b) { if (!$('svg', b) && !$('.seta', b)) b.insertAdjacentHTML('beforeend', '<span class="seta" aria-hidden="true">→</span>'); });

    // Barra de leitura e cabeçalho
    document.body.insertAdjacentHTML('afterbegin', '<div class="progresso-leitura" aria-hidden="true"></div>');
    var barra = $('.progresso-leitura'), cab = $('#cabecalho'), heroImg = $('.hero-img'), agendado = false;
    function aoRolar() {
      agendado = false;
      var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
      barra.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
      if (cab) cab.classList.toggle('rolou', y > 40);
      if (heroImg && !semMovimento && y < innerHeight) heroImg.style.setProperty('--py', (y * 0.22).toFixed(1) + 'px');
    }
    window.addEventListener('scroll', function () { if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); } }, { passive: true });
    aoRolar();

    if (semMovimento) { document.body.classList.add('carregado'); return; }

    // Títulos
    $$('.hero h1, .pagina-topo h1, .cabeca-secao h2, .eca h2, .rodape-chamada h2, .texto > .bloco-institucional > h2, .duas-colunas h2').forEach(dividirPalavras);
    var heroH1 = $('.hero h1'); if (heroH1) heroH1.style.setProperty('--base', '250ms');

    // Elementos que aparecem ao rolar (atraso escalonado entre irmãos)
    var seletores = '.numero, .pilar, .card, .chamada, .faixa-transparencia, .eca, .membro, .faq-item, .doc-lista li, .lista-editorial li, .lista-noticias li, .noticia-ano, .mvv > div, .linha-tempo li, .lista-check li, .eixos > div, .direitos > div, .impacto li, .passos li, .doacao, .cartao-contato, .bloco-provisorio, .cabeca-secao p, .lead, .sobretitulo, .rodape-grade > div, .citacao-lei, .vazio, .ficha-lateral, .filtros, .logo-item, .selo';
    var itens = $$(seletores).filter(function (el) { return !el.closest('.hero') && !el.closest('.menu-mobile'); });
    itens.forEach(function (el) {
      el.classList.add('revelar');
      var irmaos = Array.prototype.filter.call(el.parentNode.children, function (x) { return x.matches(seletores); });
      el.style.setProperty('--atraso', (Math.min(irmaos.indexOf(el), 5) * 0.08) + 's');
    });
    $$('.foto-moldura img, .destaque-projeto > img, .ficha .texto figure img').forEach(function (el) { el.classList.add('revelar-img'); });

    var observador = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visivel');
        if (e.target.hasAttribute('data-contar')) contar(e.target);
        observador.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.revelar, .revelar-img, .titulo-animado').forEach(function (el) { if (!el.closest('.hero')) observador.observe(el); });

    // Contadores nos números ("20+ anos", "40 biofossas"...)
    function contar(el) {
      var m = el.textContent.match(/^(\d+)(.*)$/);
      if (!m) return;
      var alvo = +m[1], resto = m[2], t0 = performance.now(), dur = 1600;
      (function passo(t) {
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
        el.textContent = Math.round(alvo * e) + resto;
        if (k < 1) requestAnimationFrame(passo);
      })(t0);
    }
    $$('.numero strong').forEach(function (s) { if (/^\d/.test(s.textContent)) { s.setAttribute('data-contar', ''); observador.observe(s); } });

    // Entrada do banner
    setTimeout(function () {
      document.body.classList.add('carregado');
      if (heroH1) heroH1.classList.add('visivel');
      // depois da entrada, o parallax responde sem atraso
      if (heroImg) setTimeout(function () { heroImg.style.transition = 'none'; }, 2500);
    }, 60);
  }

  /* ---------- Início ---------- */
  montarCabecalho();
  montarRodape();
  renderInicio();
  renderProgramas();
  renderEventos();
  renderArtigos();
  renderNoticias();
  configurarComites();
  configurarIndice();
  configurarContato();
  configurarDoacao();
  renderLoja();
  renderParceiros();
  configurarNovidades();
  $$('[data-ano]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
  iniciarMovimento();
})();
