// ========================
// SALC-NOTES v1.01 (template)
// Desenvolvido por Júlio Cezar de Moura - 2024
// ========================

/********************************************************************************************************************************************
 * 0. Variáveis globais para Unidade Gestora (UG)
 *******************************************************************************************************************************************/
let unidadeGestoraAtual = "padrao"; // Controla UG ativa ("padrao" ou "167368")

/********************************************************************************************************************************************
 * 1. Evento de DOM Loaded (inicialização do sistema)
 *******************************************************************************************************************************************/
window.addEventListener('DOMContentLoaded', () => {
  // Busca parâmetros da URL (?nota=...)
  const params = new URLSearchParams(window.location.search);
  const notaBuscada = params.get('nota');
  // Destaca nota buscada se parâmetro na URL
  if (notaBuscada) {
    const destacarNota = () => {
      const listaCards = [...document.querySelectorAll('.note-card')];
      const card = listaCards.find(el => el.getAttribute('data-nome') === notaBuscada.toLowerCase());
      if (card) {
        card.scrollIntoView({behavior:"smooth", block:"center"});
        card.style.boxShadow = "0 0 0 4px #00c896";
        setTimeout(()=> card.style.boxShadow = "", 2200);
      }
    };
    setTimeout(destacarNota, 1200);
  }
  // Mantém login após reload usando localStorage
  const userSalvo = localStorage.getItem('dropnotes_user');
  const tipoSalvo = localStorage.getItem('dropnotes_type');
  if (userSalvo && tipoSalvo) {
    usuarioAtual = userSalvo;
    userType = tipoSalvo;
    loginScreen.style.display = "none";
    mainContainer.style.display = "flex";
    if (userType === "comum") {
      addNCBtn.style.display = "none";
      addNEBtn.style.display = "none";
    }
    atualizarLabelUG();
    loadNotasUG();
  }
  // Inicializa mostrando NC por padrão
  ncList.style.display = 'grid';
  neList.style.display = 'none';
  consultarNCBtn.classList.add('active');
  consultarNEBtn.classList.remove('active');
  tituloNC.style.display = '';
  tituloNE.style.display = 'none'; // <- já esconde o letreiro NE ao iniciar!
  atualizarLabelUG();
  loadNotasUG();
});

/********************************************************************************************************************************************
 * 2. Usuários e permissões
 * Usuários de exemplo (admin e comuns)
 *******************************************************************************************************************************************/
const USERS = {
  USERADMIN: { senha: "2121212121", tipo: "admin" },
  USER:      { senha: "0101010101", tipo: "comum" }
};
let userType = null, usuarioAtual = null; // Para guardar tipo e nome do usuário logado

/********************************************************************************************************************************************
 * 3. Elementos HTML principais
 * Captura todos os elementos para manipulação via JS
 *******************************************************************************************************************************************/
const loginScreen    = document.getElementById('loginScreen');
const loginForm      = document.getElementById('loginForm');
const mainContainer  = document.getElementById('mainContainer');
const addNCBtn       = document.getElementById('addNCBtn');
const addNEBtn       = document.getElementById('addNEBtn');
const pdfNCInput     = document.getElementById('pdfNCInput');
const pdfNEInput     = document.getElementById('pdfNEInput');
const ncList         = document.getElementById('ncList');
const neList         = document.getElementById('neList');
const uploadProgress = document.getElementById('uploadProgress');
const uploadBar      = document.getElementById('uploadBar');
const searchInput    = document.getElementById('searchInput');
const buscarBtnAction= document.getElementById('buscarBtnAction');
const modalExcluir   = document.getElementById('modalExcluir');
const confirmExcluirBtn = document.getElementById('confirmExcluirBtn');
const cancelExcluirBtn  = document.getElementById('cancelExcluirBtn');
const loginError     = document.getElementById('loginError');
const consultarNCBtn = document.getElementById('consultarNCBtn');
const consultarNEBtn = document.getElementById('consultarNEBtn');
const tituloNC = document.getElementById('tituloNC');
const tituloNE = document.getElementById('tituloNE');
const mudarUGBtnAction = document.getElementById('mudarUGBtnAction');
const ugAtivaLabel = document.getElementById('ugAtivaLabel');
const logoutBtnAction = document.getElementById('logoutBtnAction');
const logoutBtn = document.getElementById('logoutBtn');

/********************************************************************************************************************************************
 * 4. Troca visualização entre Notas de Crédito (NC) e Empenho (NE)
 *******************************************************************************************************************************************/
consultarNCBtn.onclick = () => {
  ncList.style.display = 'grid'; // Exibe NC
  neList.style.display = 'none'; // Oculta NE
  consultarNCBtn.classList.add('active');
  consultarNEBtn.classList.remove('active');
  tituloNC.style.display = '';      // Mostra o letreiro de NC
  tituloNE.style.display = 'none';  // Esconde o letreiro de NE
};
consultarNEBtn.onclick = () => {
  ncList.style.display = 'none';
  neList.style.display = 'grid';
  consultarNEBtn.classList.add('active');
  consultarNCBtn.classList.remove('active');
  tituloNC.style.display = 'none';  // Esconde o letreiro de NC
  tituloNE.style.display = '';      // Mostra o letreiro de NE
};

/********************************************************************************************************************************************
 * 5. Supabase config
 * Conexão com Supabase Storage - EXEMPLO, coloque suas credenciais reais aqui!
 *******************************************************************************************************************************************/
const SUPABASE_URL = "COLOQUE_AQUI_SUA_SUPABASE_URL"; // Exemplo: "https://xxxx.supabase.co"
const SUPABASE_KEY = "COLOQUE_AQUI_SUA_CHAVE_SUPABASE"; // Exemplo: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
const STORAGE_BUCKET = "COLOQUE_AQUI_SEU_BUCKET"; // Exemplo: "notas-drop"
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/********************************************************************************************************************************************
 * 6. Login: valida usuário/senha e permissões
 * Salva login no localStorage para manter login após reload
 *******************************************************************************************************************************************/
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  if (USERS[username] && USERS[username].senha === password) {
    userType = USERS[username].tipo;
    usuarioAtual = username;
    localStorage.setItem('dropnotes_user', username);
    localStorage.setItem('dropnotes_type', userType);
    loginScreen.style.display = "none";
    mainContainer.style.display = "flex";
    if (userType === "comum") {
      addNCBtn.style.display = "none";
      addNEBtn.style.display = "none";
    }
    atualizarLabelUG();
    loadNotasUG();
  } else {
    loginError.textContent = "Usuário ou senha inválidos.";
  }
});

/********************************************************************************************************************************************
 * 7. Upload de NC/NE
 * Botões disparam input de arquivo (escondido)
 *******************************************************************************************************************************************/
addNCBtn.onclick = ()=> pdfNCInput.click();
addNEBtn.onclick = ()=> pdfNEInput.click();

pdfNCInput.onchange = e => {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  uploadMultiplasNotas(files, "NOTA-CREDITO");
  pdfNCInput.value = "";
};
pdfNEInput.onchange = e => {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  uploadMultiplasNotas(files, "NOTA-EMPENHO");
  pdfNEInput.value = "";
};

/********************************************************************************************************************************************
 * 8. Botão MUDAR UG (desktop/mobile)
 * Alterna UG e recarrega listas
 *******************************************************************************************************************************************/
if (mudarUGBtnAction) {
  mudarUGBtnAction.onclick = () => {
    unidadeGestoraAtual = unidadeGestoraAtual === "padrao" ? "167368" : "padrao";
    atualizarLabelUG();
    loadNotasUG();
  };
}

/********************************************************************************************************************************************
 * 9. Atualiza label UG ativa no menu lateral
 *******************************************************************************************************************************************/
function atualizarLabelUG() {
  ugAtivaLabel.textContent =
    unidadeGestoraAtual === "padrao" ? "UG Ativa: Principal" : "UG Ativa: 167368";
}

/********************************************************************************************************************************************
 * 10. Upload múltiplo com barra de progresso
 *******************************************************************************************************************************************/
async function uploadMultiplasNotas(files, tipoNota) {
  if (userType !== "admin") return;
  let total = files.length;
  let concluido = 0;
  uploadProgress.style.display = "block";
  uploadBar.style.width = "0%";
  let pasta = "";
  if (tipoNota === "NOTA-CREDITO") {
    pasta = unidadeGestoraAtual === "padrao" ? "NOTA-CREDITO" : "NOTA-CREDITO-167368";
  } else {
    pasta = unidadeGestoraAtual === "padrao" ? "NOTA-EMPENHO" : "NOTA-EMPENHO-167368";
  }
  let progressoVisual = 0;
  const fakeProgress = setInterval(() => {
    const visualPercent = Math.min(90, Math.floor((concluido / total) * 100));
    if (progressoVisual < visualPercent) {
      progressoVisual += 10;
      uploadBar.style.width = `${progressoVisual}%`;
    }
  }, 100);
  for (const file of files) {
    const fileName = `${Date.now()}_${file.name}`;
    try {
      let { error } = await supabase.storage.from(STORAGE_BUCKET).upload(`${pasta}/${fileName}`, file);
      if (error) {
        alert("Erro ao enviar nota: " + error.message);
        continue;
      }
    } catch (err) {
      alert("Erro inesperado: " + err.message);
      continue;
    }
    concluido++;
    uploadBar.style.width = `${Math.floor((concluido / total) * 100)}%`;
  }
  clearInterval(fakeProgress);
  uploadBar.style.width = "100%";
  setTimeout(() => uploadProgress.style.display = "none", 600);
  await loadNotasUG();
}

/********************************************************************************************************************************************
 * 11. Carregar e agrupar notas conforme UG ativa
 *******************************************************************************************************************************************/
async function loadNotasUG() {
  ncList.innerHTML = "";
  neList.innerHTML = "";
  let pastaNC = unidadeGestoraAtual === "padrao" ? "NOTA-CREDITO" : "NOTA-CREDITO-167368";
  let pastaNE = unidadeGestoraAtual === "padrao" ? "NOTA-EMPENHO" : "NOTA-EMPENHO-167368";
  const [nc, ne] = await Promise.all([
    supabase.storage.from(STORAGE_BUCKET).list(pastaNC, {limit:800}),
    supabase.storage.from(STORAGE_BUCKET).list(pastaNE, {limit:800}),
  ]);
  if (nc.data) nc.data.forEach(nota => renderCard(nota, pastaNC));
  if (ne.data) ne.data.forEach(nota => renderCard(nota, pastaNE));
}

/********************************************************************************************************************************************
 * 12. Renderizar card: visual, miniatura, meta, download, excluir
 ******************************************************************************************************************************************/
function renderCard(nota, pasta) {
  const card = document.createElement("div");
  card.className = "note-card";
  card.setAttribute("data-nome", nota.name.toLowerCase());
  const thumb = document.createElement("canvas");
  thumb.className = "note-thumb";
  const contentDiv = document.createElement("div");
  contentDiv.className = "note-card-content";
  function nomeSemPrefixo(nomeArquivo) {
    const partes = nomeArquivo.split('_');
    return partes.length > 1 ? partes[1] : nomeArquivo;
  }
  const nameDiv = document.createElement("div");
  nameDiv.innerText = nomeSemPrefixo(nota.name).replace('.pdf', '');
  nameDiv.className = "note-name";
  const metaDiv = document.createElement("div");
  metaDiv.className = "note-meta";
  metaDiv.innerText = `${formatBytes(nota.metadata.size)} · ${formatDate(nota.created_at)} · ${usuarioAtual?.toUpperCase()}`;
  // Botão engrenagem/excluir (SVG engrenagem)
  const gearBtn = document.createElement("button");
  gearBtn.className = "gear-btn";
  gearBtn.title = "Opções";
  gearBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="#888" stroke-width="2"/>
    <path d="M9 4v2M9 12v2M4 9h2M12 9h2M6.22 6.22l1.42 1.42M10.36 10.36l1.42 1.42M6.22 11.78l1.42-1.42M10.36 7.64l1.42-1.42"
      stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;
  gearBtn.onclick = (e) => {
    e.stopPropagation();
    abrirModalExcluir(`${pasta}/${nota.name}`, card);
  };
  // Botão download (SVG seta para baixo)
  const downBtn = document.createElement("button");
  downBtn.className = "download-btn";
  downBtn.title = "Baixar PDF";
  downBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="#fff" stroke-width="2"/>
    <path d="M9 5v6M9 11l3-3M9 11l-3-3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
  // Download e visualização
  downBtn.onclick = async (e) => {
    e.stopPropagation();
    const { data } = await supabase.storage.from(STORAGE_BUCKET)
      .createSignedUrl(`${pasta}/${nota.name}`, 120);
    if (data?.signedUrl) {
      const nomeArquivo = nomeSemPrefixo(nota.name);
      // DOWNLOAD na aba principal
      const a = document.createElement('a');
      a.href = data.signedUrl;
      a.download = nomeArquivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // VISUALIZAÇÃO em nova aba
      window.open(data.signedUrl, '_blank');
    }
  };
  contentDiv.appendChild(nameDiv);
  contentDiv.appendChild(metaDiv);
  card.appendChild(thumb);
  card.appendChild(contentDiv);
  card.appendChild(downBtn);
  card.appendChild(gearBtn);
  gerarMiniatura(`${pasta}/${nota.name}`, thumb);
  if (pasta.includes("CREDITO")) ncList.appendChild(card);
  else neList.appendChild(card);
}

/*******************************************************************************************************************************************
 * 13. Miniatura PDF funcional com pdf.js
 ******************************************************************************************************************************************/
async function gerarMiniatura(path, canvasEl) {
  try {
    const { data } = await supabase.storage.from(STORAGE_BUCKET)
      .createSignedUrl(path, 60);
    if (!data?.signedUrl) return;
    const loadingTask = window.pdfjsLib.getDocument(data.signedUrl);
    loadingTask.promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 0.5 });
        canvasEl.width = viewport.width;
        canvasEl.height = viewport.height;
        page.render({ canvasContext: canvasEl.getContext('2d'), viewport });
      });
    }).catch(()=>{});
  } catch (err) { /* Falha na miniatura: ignora */ }
}

/*******************************************************************************************************************************************
 * 14. Pesquisa estilizada e funcional
 * Botão BUSCAR! e Enter acionam pesquisa
 ******************************************************************************************************************************************/
buscarBtnAction.onclick = pesquisarNotas;
searchInput.onkeydown = function(e){
  if (e.key === 'Enter') pesquisarNotas();
};
function pesquisarNotas() {
  const termo = searchInput.value.trim().toLowerCase();
  if (!termo) return;
  let listaVisivel;
  if (ncList.style.display !== 'none') listaVisivel = ncList;
  else listaVisivel = neList;
  const allCards = [...listaVisivel.children];
  let encontrou = false;
  allCards.forEach(card => {
    if (card.getAttribute("data-nome").includes(termo)) {
      card.scrollIntoView({behavior:"smooth", block:"center"});
      card.style.boxShadow = "0 0 0 3px #00c896";
      setTimeout(()=> card.style.boxShadow = "", 1500);
      encontrou = true;
    }
  });
  if (!encontrou) alert("Nenhuma nota encontrada!");
}

/*******************************************************************************************************************************************
 * 15. Modal de exclusão funcional
 ******************************************************************************************************************************************/
let notaParaExcluir = null;
function abrirModalExcluir(path, cardEl) {
  if (userType !== "admin") return;
  modalExcluir.style.display = "flex";
  notaParaExcluir = { path, cardEl };
}
confirmExcluirBtn.onclick = async function() {
  if (!notaParaExcluir) return;
  await supabase.storage.from(STORAGE_BUCKET).remove([notaParaExcluir.path]);
  notaParaExcluir.cardEl.style.animation = "fadeOut 0.5s";
  setTimeout(()=>{
    notaParaExcluir.cardEl.remove();
    modalExcluir.style.display = "none";
    notaParaExcluir = null;
  }, 480);
};
cancelExcluirBtn.onclick = function() {
  modalExcluir.style.display = "none";
  notaParaExcluir = null;
};
const style = document.createElement('style');
style.innerHTML = `@keyframes fadeOut { 0%{opacity:1;} 100%{opacity:0; transform:scale(0.95);} }`;
document.head.appendChild(style);

/*******************************************************************************************************************************************
 * 16. Formatadores para bytes/data
 ******************************************************************************************************************************************/
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
function formatDate(dataStr) {
  if (!dataStr) return "";
  const d = new Date(dataStr);
  return d.toLocaleDateString('pt-BR');
}

/*******************************************************************************************************************************************
 * 17. Logout - Remove login do localStorage (desktop)
 ******************************************************************************************************************************************/
logoutBtn.onclick = function() {
  document.getElementById('mainContainer').style.display = "none";
  document.getElementById('loginScreen').style.display = "flex";
  document.getElementById('username').value = "";
  document.getElementById('password').value = "";
  document.getElementById('loginError').textContent = "";
  if (typeof userType !== "undefined") userType = null;
  if (typeof usuarioAtual !== "undefined") usuarioAtual = null;
  localStorage.removeItem('dropnotes_user');
  localStorage.removeItem('dropnotes_type');
};

/*******************************************************************************************************************************************
 * 18. Logout Botão Moderno - Remove login do localStorage
 ******************************************************************************************************************************************/
logoutBtnAction.onclick = function() {
  mainContainer.style.display = "none";
  loginScreen.style.display = "flex";
  document.getElementById('username').value = "";
  document.getElementById('password').value = "";
  document.getElementById('loginError').textContent = "";
  userType = null;
  usuarioAtual = null;
  localStorage.removeItem('dropnotes_user');
  localStorage.removeItem('dropnotes_type');
};

/*******************************************************************************************************************************************
  * Fim do código 
 *******************************************************************************************************************************************/