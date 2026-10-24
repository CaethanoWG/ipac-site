<?php
/**
 * Recebe o formulário de contato e envia por e-mail para o IPAC.
 * Funciona na hospedagem Hostinger (PHP com a função mail()).
 *
 * CONFIGURE:
 *  - DESTINO: e-mail que recebe as mensagens.
 *  - REMETENTE: um e-mail do PRÓPRIO domínio (ex.: site@ipac.eco.br), criado no
 *    painel da Hostinger. Usar um Gmail aqui faz as mensagens caírem no spam.
 */
const DESTINO   = 'ipactangara@gmail.com';
const REMETENTE = 'site@ipac.eco.br';
const LIMITE_POR_HORA = 5; // envios por endereço IP

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function responder(bool $ok, string $erro = ''): void {
    http_response_code($ok ? 200 : 400);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'erro' => $erro], JSON_UNESCAPED_UNICODE);
    exit;
}
function campo(string $nome, int $max): string {
    $v = trim((string)($_POST[$nome] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder(false, 'Método não permitido.');

// Anti-robô: campo isca preenchido ou envio rápido demais = robô (fingimos sucesso).
if (campo('site', 200) !== '' || (int)($_POST['tempo'] ?? 0) < 3) responder(true);

// Limite simples por IP
$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconhecido';
$arq = sys_get_temp_dir() . '/ipac_contato_' . md5($ip);
$agora = time();
$registros = array_filter(
    is_file($arq) ? array_map('intval', file($arq, FILE_IGNORE_NEW_LINES)) : [],
    fn($t) => $t > $agora - 3600
);
if (count($registros) >= LIMITE_POR_HORA) responder(false, 'Muitas mensagens em pouco tempo. Tente mais tarde.');

$nome     = campo('nome', 120);
$email    = campo('email', 160);
$telefone = campo('telefone', 30);
$assunto  = campo('assunto', 80);
$mensagem = campo('mensagem', 4000);
$consent  = campo('consentimento', 5);
$idioma   = in_array(campo('idioma', 2), ['en', 'es'], true) ? campo('idioma', 2) : 'pt';

if ($nome === '' || $assunto === '' || $mensagem === '') responder(false, 'Preencha os campos obrigatórios.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\n,;]/', $email)) responder(false, 'E-mail inválido.');
if ($consent !== 'sim') responder(false, 'É necessário concordar com a política de privacidade.');

$nomeSeguro = preg_replace('/[^\p{L}\p{N} .\'-]/u', '', $nome);
$titulo = '=?UTF-8?B?' . base64_encode("[Site IPAC] $assunto — $nomeSeguro") . '?=';
$corpo = "Nova mensagem enviada pelo site ipac.eco.br\n\n"
       . "Nome: $nome\nE-mail: $email\nTelefone: " . ($telefone ?: '-') . "\nAssunto: $assunto\nIdioma do site: $idioma\n\n"
       . "Mensagem:\n$mensagem\n\n"
       . "---\nEnviado em " . date('d/m/Y H:i') . " · IP $ip · Consentimento LGPD: sim\n";
$cabecalhos = implode("\r\n", [
    'From: Site IPAC <' . REMETENTE . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail(DESTINO, $titulo, $corpo, $cabecalhos, '-f' . REMETENTE)) {
    responder(false, 'Não foi possível enviar agora.');
}

$registros[] = $agora;
@file_put_contents($arq, implode("\n", $registros));
responder(true);
