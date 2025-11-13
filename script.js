/* ============================================================
CÓDIGO JAVASCRIPT - SIMULADOR DE BANCO DIDÁTICO
============================================================ */
// Variáveis principais que armazenam a conta e suas movimentações
let conta = null;
let movimentacoes = [];
/* ------------------------------------------------------------
Função auxiliar que gera a data/hora atual formatada
------------------------------------------------------------ */
function obterDataHoraAtual() {
const agora = new Date();
const data = agora.toLocaleDateString('pt-BR');
const hora = agora.toLocaleTimeString('pt-BR');
return {data, hora, complemento: `[${data} ${hora}]`};
}
function exibirDataHoraAtual() {
    const{ data, hora } = obterDataHoraAtual();
    document.getElementById('datahora').innerHTML = `Data: ${data} | Hora: ${hora}`;
}
setInterval(exibirDataHoraAtual, 1000);
exibirDataHoraAtual();
/* ------------------------------------------------------------
Função para abrir uma nova conta bancária
------------------------------------------------------------ */
function abrirConta() {

const nome = document.getElementById("nome").value.trim();
const tipo = document.getElementById("tipoConta").value;
if (nome === "") {
alert("Por favor, informe o nome do cliente!");
return;
}
// Criação do objeto "conta"
conta = {
nomeCliente: nome,
tipoConta: tipo,
saldo: 0,
ativa: true
};
movimentacoes = []; // limpa movimentações anteriores
// Mensagem de sucesso
document.getElementById("resConta").innerHTML =
`✅ Conta <strong>${tipo}</strong> criada com sucesso para
<strong>${nome}</strong>.`;
// Desabilita campos de abertura e habilita operações
document.getElementById("nome").disabled = true;
document.getElementById("tipoConta").disabled = true;
document.getElementById("btnAbrir").disabled = true;
habilitarOperacoes(true);
}
/* ------------------------------------------------------------
Função que habilita ou desabilita os botões de operação
------------------------------------------------------------ */
function habilitarOperacoes(estado) {
document.getElementById("btnDepositar").disabled = !estado;
document.getElementById("btnSacar").disabled = !estado;
document.getElementById("btnSaldo").disabled = !estado;
document.getElementById("btnMov").disabled = !estado;
document.getElementById("btnEncerrar").disabled = !estado;
}
/* ------------------------------------------------------------
Função de depósito
------------------------------------------------------------ */
function depositar() {
if (!contaAtiva()) return;
const valor = parseFloat(prompt("Digite o valor do depósito:"));
if (isNaN(valor) || valor <= 0) {
alert("Valor inválido!");
return;
}
conta.saldo += valor;
// Registra movimentação com data/hora
movimentacoes.push(`${obterDataHoraAtual()} ${conta.nomeCliente} realizou um depósito de R$ ${valor.toFixed(2)}`);
document.getElementById("resOperacoes").innerHTML =
`💰 Depósito realizado! Saldo atual: <strong>R$
${conta.saldo.toFixed(2)}</strong>`;
}
/* ------------------------------------------------------------
Função de saque
------------------------------------------------------------ */

function sacar() {
if (!contaAtiva()) return;
const valor = parseFloat(prompt("Digite o valor do saque:"));
if (isNaN(valor) || valor <= 0) {
alert("Valor inválido!");
return;
}
if (valor > conta.saldo) {
alert("Saldo insuficiente!");
return;
}
conta.saldo -= valor;
// Registra movimentação com data/hora
movimentacoes.push(`${obterDataHoraAtual()} ${conta.nomeCliente}realizou um saque de R$ ${valor.toFixed(2)}`);
document.getElementById("resOperacoes").innerHTML =
`💸 Saque realizado! Saldo atual: <strong>R$
${conta.saldo.toFixed(2)}</strong>`;
}
/* ------------------------------------------------------------
Função para exibir o saldo atual
------------------------------------------------------------ */
function verSaldo() {
if (!contaAtiva()) return;
document.getElementById("resOperacoes").innerHTML =
`📊 Saldo atual: <strong>R$ ${conta.saldo.toFixed(2)}</strong>`;
}
/* ------------------------------------------------------------
Função para listar todas as movimentações registradas
------------------------------------------------------------ */
function listarMovimentos() {
if (!contaAtiva()) return;
if (movimentacoes.length === 0) {
document.getElementById("resOperacoes").innerHTML =
"Nenhuma movimentação registrada.";
return;
}
const lista = movimentacoes.join("<br>");
document.getElementById("resOperacoes").innerHTML =
`<strong>📜 Movimentações:</strong><br>${lista}`;
}
/* ------------------------------------------------------------
Função para encerrar a conta e limpar os dados
------------------------------------------------------------ */
function encerrarConta() {
if (!contaAtiva()) return;
const confirma = confirm("Tem certeza que deseja encerrar a conta?");
if (confirma) {
conta.ativa = false;
document.getElementById("resOperacoes").innerHTML =
`⚠️ Conta de <strong>${conta.nomeCliente}</strong> encerrada com sucesso!`;
// Reseta campos e interface
document.getElementById("nome").value = "";

document.getElementById("tipoConta").value = "corrente";
document.getElementById("nome").disabled = false;
document.getElementById("tipoConta").disabled = false;
document.getElementById("btnAbrir").disabled = false;
habilitarOperacoes(false);
// Limpa dados da conta e movimentações
conta = null;
movimentacoes = [];
document.getElementById("resConta").innerHTML = "";
}
}
/* ------------------------------------------------------------
Função auxiliar que verifica se há conta ativa
------------------------------------------------------------ */
function contaAtiva() {
if (!conta || !conta.ativa) {
alert("Nenhuma conta ativa! Abra uma nova conta primeiro.");
return false;
}
return true;
}