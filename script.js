/* =============================================================
VARIÁVEIS GLOBAIS
============================================================= */
let conta = null;
let movimentacoes = [];
let ultimaDataDeposito = null; // armazena a data do último depósito (Date)
/* =============================================================
FUNÇÕES DE DATA E HORA
============================================================= */
function atualizarDataHora() {
const agora = new Date();
const data = agora.toLocaleDateString('pt-BR');
const hora = agora.toLocaleTimeString('pt-BR');
document.getElementById('dataHora').innerHTML = `${data}<br>${hora}`;
}
setInterval(atualizarDataHora, 1000);
atualizarDataHora();
function obterDataHoraAtual() {
const agora = new Date();
const data = agora.toLocaleDateString('pt-BR');
const hora = agora.toLocaleTimeString('pt-BR');
return `[${data} ${hora}]`;
}
/* =============================================================
FUNÇÃO: abrirConta()
============================================================= */
function abrirConta() {
const nome = document.getElementById("nome").value.trim();
const tipo = document.getElementById("tipoConta").value;
if (nome === "") {
alert("Por favor, informe o nome do cliente!");
return;
}
conta = {
nomeCliente: nome,
tipoConta: tipo,
saldo: 0,
ativa: true
};
movimentacoes = [];
movimentacoes.push(`${obterDataHoraAtual()} Conta ${tipo} aberta para ${nome}.`);
document.getElementById("resConta").innerHTML =
`✅ Conta <strong>${tipo}</strong> criada com sucesso para
<strong>${nome}</strong>.`;
document.getElementById("nome").disabled = true;
document.getElementById("tipoConta").disabled = true;
document.getElementById("btnAbrir").disabled = true;
habilitarOperacoes(true);
}
/* =============================================================
FUNÇÃO: habilitarOperacoes(estado)
============================================================= */
function habilitarOperacoes(estado) {
document.getElementById("btnDepositar").disabled = !estado;
document.getElementById("btnSacar").disabled = !estado;
document.getElementById("btnSaldo").disabled = !estado;
document.getElementById("btnMov").disabled = !estado;

document.getElementById("btnEncerrar").disabled = !estado;
}
/* =============================================================
FUNÇÃO: depositar()
============================================================= */
function depositar() {
if (!contaAtiva()) return;
const valor = parseFloat(prompt("Digite o valor do depósito:"));
if (isNaN(valor) || valor <= 0) {
alert("Valor inválido!");
return;
}
conta.saldo += valor;
ultimaDataDeposito = new Date();
movimentacoes.push(`${obterDataHoraAtual()} Depósito de R$ ${valor.toFixed(2)}`);
document.getElementById("resOperacoes").innerHTML =
`💰 Depósito realizado! Saldo atual: <strong>R$
${conta.saldo.toFixed(2)}</strong>`;
}
/* =============================================================
FUNÇÃO: sacar()
- Implementa juros da poupança (0,5%) após 30 dias
- Mostra valor potencial com juros se sacar antes do prazo
============================================================= */
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
// Verifica se é conta poupança e se há registro de depósito
if (conta.tipoConta === "poupanca" && ultimaDataDeposito) {
const hoje = new Date();
const diasDecorridos = Math.floor((hoje - ultimaDataDeposito) / (1000 * 60 * 60
* 24));
if (diasDecorridos >= 30) {
// ✅ Após 30 dias → aplica juros de 0,5%
const juros = conta.saldo * 0.005;
conta.saldo += juros;
movimentacoes.push(`${obterDataHoraAtual()} Juros de 0,5% aplicados: R$
${juros.toFixed(2)}`);
document.getElementById("resOperacoes").innerHTML =
`<p class="mensagem-verde">🎉 Parabéns, ${conta.nomeCliente}! Você ganhou
0,5% de juros da poupança!</p>

<p>Saldo atualizado com juros: <strong>R$

${conta.saldo.toFixed(2)}</strong></p>`;
} else {
// ⚠️ Antes dos 30 dias → alerta de perda de juros
const jurosPerdidos = conta.saldo * 0.005;
const saldoComJuros = conta.saldo + jurosPerdidos;

const confirma = confirm(`⚠️ O saque está sendo feito com apenas
${diasDecorridos} dias desde o depósito.\nVocê perderá os juros da poupança. Deseja
continuar?`);
if (!confirma) {
document.getElementById("resOperacoes").innerHTML =
`<p class="mensagem-vermelha">Saque cancelado! Aguarde completar 30 dias

para manter os juros da poupança.</p>

<p>Se aguardasse os 30 dias, seu saldo seria de <strong>R$

${saldoComJuros.toFixed(2)}</strong> (com ganho de R$ ${jurosPerdidos.toFixed(2)} em
juros).</p>`;
return;
} else {
document.getElementById("resOperacoes").innerHTML =
`<p class="mensagem-vermelha">⚠️ O cliente optou por sacar antes dos 30

dias e perdeu os juros da poupança.</p>

<p>Saldo atual: <strong>R$ ${conta.saldo.toFixed(2)}</strong><br>
Valor que seria com juros: <strong>R$
${saldoComJuros.toFixed(2)}</strong></p>`;
}
}
}
// Realiza o saque
conta.saldo -= valor;
movimentacoes.push(`${obterDataHoraAtual()} Saque de R$ ${valor.toFixed(2)}`);
document.getElementById("resOperacoes").innerHTML +=
`<p>💸 Saque realizado! Saldo atual: <strong>R$
${conta.saldo.toFixed(2)}</strong></p>`;
}
/* =============================================================
FUNÇÃO: verSaldo()
============================================================= */
function verSaldo() {
if (!contaAtiva()) return;
document.getElementById("resOperacoes").innerHTML =
`📊 Saldo atual: <strong>R$ ${conta.saldo.toFixed(2)}</strong>`;
}
/* =============================================================
FUNÇÃO: listarMovimentos()
============================================================= */
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
/* =============================================================
FUNÇÃO: encerrarConta()
============================================================= */
function encerrarConta() {
if (!contaAtiva()) return;
const confirma = confirm("Tem certeza que deseja encerrar a conta?");
if (confirma) {

movimentacoes.push(`${obterDataHoraAtual()} Conta de ${conta.nomeCliente}
encerrada.`);
document.getElementById("resOperacoes").innerHTML =
`⚠️ Conta de <strong>${conta.nomeCliente}</strong> encerrada com
sucesso!<br><br>
Últimas movimentações:<br>${movimentacoes.join("<br>")}`;
document.getElementById("nome").value = "";
document.getElementById("tipoConta").value = "corrente";
document.getElementById("nome").disabled = false;
document.getElementById("tipoConta").disabled = false;
document.getElementById("btnAbrir").disabled = false;
habilitarOperacoes(false);
conta = null;
movimentacoes = [];
ultimaDataDeposito = null;
document.getElementById("resConta").innerHTML = "";
}
}
/* =============================================================
FUNÇÃO: contaAtiva()
============================================================= */
function contaAtiva() {
if (!conta || !conta.ativa) {
alert("Nenhuma conta ativa! Abra uma nova conta primeiro.");
return false;
}
return true;
}