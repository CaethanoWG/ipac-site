if (!$consent || $nome === '' || mb_strlen($nome) > 100 || strlen($email) > 160<?php
/**
 * Recebe as inscrições para "Receba as novidades do IPAC" (rodapé do site).
 * Grava cada inscrição (e-mail e nome) em uma planilha CSV FORA da pasta pública (public_html),
 * para que ninguém consiga baixá-la pelo navegador. Abra o arquivo pelo
 * Gerenciador de Arquivos da Hostinger: ../ipac-dados/novidades-inscritos.csv
 *
 * Opcional: AVISAR = true envia um e-mail ao IPAC a cada nova inscrição.
 */
const PASTA_DADOS = __DIR__ . '/../ipac-dados';
const ARQUIVO     = PASTA_DADOS . '/novidades-inscritos.csv';
const AVISAR      = false;
const DESTINO     = 'ipactangara@gmail.com';
const REMETENTE   = 'site@ipac.eco.br';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function responder(bool $ok): void {
    http_response_code($ok ? 200 : 400);
    echo json_encode(['ok' => $ok]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder(false);

// Anti-robô: campo isca preenchido ou envio rápido demais (fingimos sucesso)
if (trim((string)($_POST['site'] ?? '')) !== '' || (int)($_POST['tempo'] ?? 0) < 2) responder(true);

$nome    = trim(preg_replace('/\s+/', ' ', str_replace("\0", '', (string)($_POST['nome'] ?? ''))));
$email   = strtolower(trim(str_replace(["\r", "\n", "\0"], '', (string)($_POST['email'] ?? ''))));
$consent = ($_POST['consentimento'] ?? '') === 'sim';
$idioma  = in_array($_POST['idioma'] ?? '', ['pt', 'en', 'es'], true) ? $_POST['idioma'] : 'pt';

if (!$consent || $nome === '' || mb_strlen($nome) > 100 || strlen($email) > 160 || !filter_var($email, FILTER_VALIDATE_EMAIL)) responder(false);

// Limite por IP (mesma lógica do enviar.php): no máximo 3 cadastros por hora
$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconhecido';
$arqIp = sys_get_temp_dir() . '/ipac_novidades_' . md5($ip);
$agora = time();
$registros = array_filter(
    is_file($arqIp) ? array_map('intval', file($arqIp, FILE_IGNORE_NEW_LINES)) : [],
    fn($t) => $t > $agora - 3600
);
if (count($registros) >= 3) responder(false);
$registros[] = $agora;
@file_put_contents($arqIp, implode("\n", $registros));

// Um nome ou e-mail começando com = + - @ viraria fórmula ao abrir a planilha no Excel
if (preg_match('/^[=+\-@]/', $nome)) $nome = "'" . $nome;
if (preg_match('/^[=+\-@]/', $email)) $email = "'" . $email;

if (!is_dir(PASTA_DADOS) && !@mkdir(PASTA_DADOS, 0750, true)) responder(false);

$fp = @fopen(ARQUIVO, 'c+');
if (!$fp) responder(false);
flock($fp, LOCK_EX);

// Já inscrito? Responde ok sem duplicar.
$existe = false;
rewind($fp);
while (($linha = fgetcsv($fp)) !== false) {
    if (isset($linha[1]) && $linha[1] === $email) { $existe = true; break; }
}
if (!$existe) {
    fseek($fp, 0, SEEK_END);
    if (ftell($fp) === 0) fputcsv($fp, ['data', 'email', 'idioma', 'consentimento_lgpd', 'nome']);
    fputcsv($fp, [date('Y-m-d H:i:s'), $email, $idioma, 'sim', $nome]);
}
flock($fp, LOCK_UN);
fclose($fp);

if (!$existe && AVISAR) {
    @mail(DESTINO, '=?UTF-8?B?' . base64_encode('[Site IPAC] Nova inscrição em novidades') . '?=',
        "Nova inscrição para receber novidades: $nome <$email> ($idioma)",
        "From: Site IPAC <" . REMETENTE . ">\r\nContent-Type: text/plain; charset=UTF-8", '-f' . REMETENTE);
}
responder(true);
