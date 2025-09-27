# README do JavaScript - DROP-NOTES

Este documento explica **detalhadamente** cada função, lógica, método e palavra do código JavaScript do sistema DROP-NOTES.  
O objetivo é ser didático e ideal para quem está começando a aprender programação web.

---

## 1. **Cabeçalho e comentário inicial**

```js
// ========================
// DROP-NOTES v1.00
// Sistema de upload, visualização, download e exclusão de Notas de Crédito e Notas de Empenho em PDF
// Com login, permissões, barra de progresso, miniaturas, pesquisa e animações
// Desenvolvido por Júlio Cezar de Moura - 2024
// ========================
```
**Explicação:**  
Este bloco serve para identificar o projeto, versão, funcionalidades principais e o autor.  
Comentários com barras `//` não são executados pelo navegador, servem apenas para leitura do programador.

---

## 2. **Variáveis Globais**

### Unidade Gestora (UG)
```js
let unidadeGestoraAtual = "padrao";
```
- `let` é usado para criar uma variável que pode mudar de valor.
- `unidadeGestoraAtual` controla **em qual "UG" (Unidade Gestora)** você está navegando. Isso muda as pastas e arquivos exibidos.
- `"padrao"` indica a UG principal. `"167368"` indica a UG alternativa.

---

## 3. **Evento de Carregamento da Página**

```js
window.addEventListener('DOMContentLoaded', () => { ... });
```
- `window.addEventListener` permite que você execute código **quando a página for carregada**.
- `'DOMContentLoaded'` garante que o código só roda **após todos os elementos HTML estarem disponíveis**.

### O que acontece neste bloco?

1. **Verifica se existe parâmetro de busca de nota na URL**:
   - Usa `URLSearchParams` para ler a URL.
   - Se existir (`?nota=XXXX`), destaca o card correspondente após renderizar os cards.

2. **Mantém login após reload**:
   - Pega usuário/senha do navegador usando `localStorage`.
   - Se encontrou login salvo, pula a tela de login e mostra o sistema principal.

3. **Configura exibição inicial**:
   - Mostra a lista de Notas de Crédito (NC) por padrão.
   - Esconde a lista de Notas de Empenho (NE).

---

## 4. **Usuários e Permissões**

```js
const USERS = {
  DEMOURA: { senha: "240606", tipo: "admin" },
  ALMOX:   { senha: "123456", tipo: "comum" },
  SALC:    { senha: "123", tipo: "comum" }
};
let userType = null, usuarioAtual = null;
```
- `USERS` é um objeto que **guarda usuários permitidos** e seus tipos (admin ou comum).
- `userType` e `usuarioAtual` guardam informações do usuário logado.

---

## 5. **Captura dos Elementos HTML**

```js
const loginScreen = document.getElementById('loginScreen');
const loginForm = document.getElementById('loginForm');
```
- `document.getElementById` busca elementos HTML pelo atributo `id`.
- Assim, podemos **manipular esses elementos via JavaScript** (mostrar, esconder, trocar valores, etc).

---

## 6. **Botões e Labels Dinâmicos**

```js
const consultarNCBtn = document.getElementById('consultarNCBtn');
const consultarNEBtn = document.getElementById('consultarNEBtn');
const tituloNC = document.getElementById('tituloNC');
const tituloNE = document.getElementById('tituloNE');
const mudarUGBtn = document.getElementById('mudarUGBtn');
const ugAtivaLabel = document.getElementById('ugAtivaLabel');
```
- Esses elementos controlam a exibição de listas, a troca de UG, e os títulos visíveis.

---

## 7. **Eventos de Clique (onclick)**

### Consultar NC/NE

```js
consultarNCBtn.onclick = () => { ... }
consultarNEBtn.onclick = () => { ... }
```
- Quando o usuário clica em um botão, a função associada é executada.
- **Muda a lista de notas exibida** e destaca o botão ativo.

---

## 8. **Configuração do Supabase**

```js
const SUPABASE_URL = "https://..."; // Endereço do seu projeto Supabase
const SUPABASE_KEY = "eyJ..."; // Chave pública do Supabase
const STORAGE_BUCKET = "notas-drop"; // Nome do bucket
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```
- Supabase é um serviço que armazena os arquivos (PDFs) das notas.
- `createClient` conecta o JS ao seu banco de dados Supabase.

---

## 9. **Login**

```js
loginForm.addEventListener('submit', function(event) { ... });
```
- Executa quando o usuário tenta fazer login.
- Impede reload da página com `event.preventDefault()`.
- Verifica se o usuário existe e se a senha bate. Se sim, salva login no navegador e mostra sistema principal.

---

## 10. **Upload de Arquivos**

### Abrir input de arquivo

```js
addNCBtn.onclick = ()=> pdfNCInput.click();
addNEBtn.onclick = ()=> pdfNEInput.click();
```
- Ao clicar em "INCLUIR NC/NE", **abre a janela para escolher arquivos PDF**.

### Enviar arquivos

```js
pdfNCInput.onchange = e => { ... }
pdfNEInput.onchange = e => { ... }
```
- Quando o usuário escolhe arquivos, chama `uploadMultiplasNotas` para enviar ao supabase.

---

## 11. **Função uploadMultiplasNotas**

```js
async function uploadMultiplasNotas(files, tipoNota) { ... }
```
- Recebe arquivos e tipo de nota.
- Decide a **pasta correta** conforme UG ativa.
- Mostra uma barra de progresso (simulada).
- Envia cada arquivo para o bucket do Supabase.
- Atualiza a barra conforme os arquivos são enviados.
- Ao terminar, recarrega a lista de notas.

---

## 12. **Função loadNotasUG**

```js
async function loadNotasUG() { ... }
```
- Carrega as listas de notas de crédito e empenho **da pasta correspondente à UG ativa**.
- Chama `renderCard` para cada arquivo encontrado.

---

## 13. **Troca de Unidade Gestora**

```js
mudarUGBtn.onclick = () => { ... }
```
- Troca o valor de `unidadeGestoraAtual` entre "padrao" e "167368".
- Atualiza o label e recarrega as listas de notas.

---

## 14. **Renderização dos Cards**

```js
function renderCard(nota, pasta) { ... }
```
- Cria o card visual para cada nota.
- Mostra miniatura, nome, tamanho, data, usuário, botão de download e botão de opções (excluir).
- Chama `gerarMiniatura` para mostrar uma prévia do PDF no card.

---

## 15. **Miniatura do PDF**

```js
async function gerarMiniatura(path, canvasEl) { ... }
```
- Gera um link temporário para o PDF.
- Usa PDF.js para desenhar a primeira página do PDF dentro do canvas.
- Ajuda o usuário a **visualizar rapidamente o conteúdo do arquivo**.

---

## 16. **Pesquisa de Notas**

```js
searchBtn.onclick = pesquisarNotas;
buscarMobileBtn.onclick = pesquisarNotas;
searchInput.onkeydown = function(e){ ... }
```
- Permite pesquisar pelo nome da nota.
- Destaca o card encontrado e rola a tela até ele.

---

## 17. **Modal de Exclusão**

```js
function abrirModalExcluir(path, cardEl) { ... }
```
- Exibe um pop-up para confirmar exclusão.
- Só admins podem excluir notas.

### Confirma e executa exclusão

```js
confirmExcluirBtn.onclick = async function() { ... }
```
- Remove o arquivo do Supabase e do DOM (com animação).
- Fecha o modal.

---

## 18. **Funções Auxiliares**

### Formatadores

```js
function formatBytes(bytes) { ... }
function formatDate(dataStr) { ... }
```
- Deixa os dados de tamanho e data mais fáceis de entender para o usuário.

---

## 19. **Logout (Desktop e Mobile)**

```js
document.getElementById('logoutBtn').onclick = function() { ... }
logoutBtnMobile.onclick = function() { ... }
```
- Apaga os dados do login salvo e volta para a tela de login.

---

## 20. **Animações via CSS**

```js
const style = document.createElement('style');
style.innerHTML = `@keyframes fadeOut { 0%{opacity:1;} 100%{opacity:0; transform:scale(0.95);} }`;
document.head.appendChild(style);
```
- Cria animação visual para quando um card é excluído.

---

# **Resumo Final**

- O JS controla **toda a lógica do sistema**, desde login, troca de UG, upload, visualização, pesquisa, exclusão e animações.
- Cada função tem um propósito claro e está dividida em blocos comentados para facilitar o entendimento.
- O código está organizado de forma lógica, com separação por funcionalidades.

> **Dica:** Se você é iniciante, leia cada bloco, experimente alterar, execute no navegador e veja o resultado.  
> Pratique criar suas próprias funções e componentes para aprender mais!

---