/* ==========================================================================
   CONFIGURAÇÃO DO SITE — edite aqui os dados oficiais do IPAC.
   Campos vazios ('') desativam a funcionalidade correspondente no site,
   que passa a mostrar "em configuração" em vez de simular algo.
   ========================================================================== */
window.IPAC_CONFIG = {
  // A CONFIRMAR: o site atual anuncia o novo nome abaixo; o prompt da Diretoria
  // cita "Instituto de Proteção Ambiental e Cultural". Defina o nome oficial.
  nome: 'Instituto de Preservação Ambiental e Conservação',
  sigla: 'IPAC',
  fundacao: 2004,
  cidade: 'Tangará da Serra – MT',

  email: 'ipactangara@gmail.com',
  // Telefone que aparece no topo do site atual. O número (65) 99642-0466 que
  // aparece no rodapé do site atual pertence à agência que o criou.
  telefone: '(65) 99987-8717',
  endereco: '', // A CONFIRMAR: endereço institucional completo

  redes: {
    instagram: 'https://www.instagram.com/ipac.mt/',
    facebook: 'https://www.facebook.com/ipac.mt/',
    linkedin: 'https://www.linkedin.com/in/ipac-ipac-tangar%C3%A1-883172321/'
  },

  // WhatsApp para pedidos da Loja, só dígitos com DDI e DDD. Ex.: '5565999999999'
  whatsappLoja: '',

  // Pix (doações e loja). Com a chave preenchida, o site gera o QR Code e o
  // código "copia e cola" com o valor escolhido, sem intermediários.
  pix: {
    chave: '',           // CNPJ, e-mail, telefone (+55...) ou chave aleatória
    recebedor: 'IPAC',   // até 25 caracteres, sem acentos
    cidade: 'TANGARA DA SERRA' // até 15 caracteres, sem acentos
  },

  // Link de pagamento com cartão (Mercado Pago, PagBank, Asaas etc.).
  cartao: { linkUnica: '', linkMensal: '' },

  // Endereço que recebe o formulário de contato (ver enviar.php).
  formularioContato: 'enviar.php',
  // Endereço que recebe as inscrições para novidades por e-mail (ver newsletter.php).
  formularioNovidades: 'newsletter.php',

  // Parceiros/patrocinadores e apoiadores exibidos na página inicial (vale para os 3 idiomas).
  // Coloque as logos em assets/img/parceiros/ (PNG ou SVG com fundo transparente).
  // Exemplo: { nome: 'Empresa X', logo: 'assets/img/parceiros/empresa-x.png', link: 'https://...' }
  // Listas vazias mostram espaços provisórios.
  parceiros: [],
  apoiadores: []
};
