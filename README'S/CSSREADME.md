# CSS README — Drop-Notes

Bem-vindo ao guia prático e didático do CSS do sistema **Drop-Notes**!  
Aqui você encontrará explicações detalhadas para cada parte do código CSS utilizado no projeto. Este material foi pensado para alunos dos primeiros anos de formação em cursos de CSS, com exemplos, comentários e dicas para fixar a lógica de cada etapa.  
Ao final, há uma "caixinha de texto" sobre a lógica geral e como aplicar os conceitos no seu dia a dia!  

---

## 📑 Sumário
1. [Reset Geral](#reset-geral)
2. [Tela de Login](#tela-de-login)
3. [Layout Principal](#layout-principal)
4. [Sidebar Moderna](#sidebar-moderna)
5. [Barra de Pesquisa](#barra-de-pesquisa)
6. [Botões Modernos](#botoes-modernos)
7. [Barra de Progresso de Upload](#barra-de-progresso-de-upload)
8. [Área Principal das Notas](#area-principal-das-notas)
9. [Lista Agrupada de Notas](#lista-agrupada-de-notas)
10. [Card da Nota](#card-da-nota)
11. [Miniatura do PDF](#miniatura-do-pdf)
12. [Informações do Card](#informacoes-do-card)
13. [Botão Engrenagem/Excluir](#botao-engrenagem-excluir)
14. [Botão Download](#botao-download)
15. [Modal de Exclusão](#modal-de-exclusao)
16. [Responsividade](#responsividade)
17. [Rodapé](#rodape)
18. [Botões de Consulta NC/NE](#botoes-de-consulta-nc-ne)
19. [Caixinha de Texto: Lógica e Aplicação](#caixinha-de-texto-logica-e-aplicacao)

---

## 1. RESET GERAL
Remove margens e preenchimentos padrões do navegador, define fonte e cor de fundo para toda a aplicação.

```css
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #5f5e5e;
  height: 100vh;
}
```
**Funcionalidade:**  
Garante que toda a página comece “limpa”, sem margens extras, e com uma identidade visual única (fonte e cor de fundo).

---

## 2. TELA DE LOGIN
Centraliza e estiliza o formulário de login, cobrindo toda a tela.

```css
.login-screen {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.08);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.login-form {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  padding: 40px 32px;
  display: flex; flex-direction: column; width: 320px; align-items: center;
}
.login-form h2 { 
  margin-bottom: 24px; font-size: 1.8em; letter-spacing: 2px; color: #00c896;
}
.login-form input { 
  width: 100%; padding: 12px; margin-bottom: 16px; border-radius: 5px;
  border: 1px solid #ccc; font-size: 1em;
}
.login-form button { 
  background: #00c896; color: #fff; border: none; border-radius: 4px;
  padding: 12px 0; font-size: 1.1em; cursor: pointer; width: 100%; margin-bottom: 10px;
  transition: background 0.2s;
}
.login-form button:hover { background: #009e73; }
.login-error { 
  color: #d32f2f; font-size: 1em; min-height: 24px; text-align: center;
}
```
**Funcionalidade:**  
Deixa o login bonito, centralizado e fácil de usar em qualquer dispositivo.

---

## 3. LAYOUT PRINCIPAL
Estrutura base com sidebar à esquerda e área de conteúdo principal ao lado.

```css
.container { 
  display: flex;
  height: 100vh;
}
```
**Funcionalidade:**  
Organiza a aplicação em duas áreas principais, facilitando navegação.

---

## 4. SIDEBAR MODERNA
Barra lateral estilizada para menu e botões.

```css
.sidebar {
  width: 250px; background: #111; color: #fff; padding: 36px 24px;
  display: flex; flex-direction: column; align-items: flex-start;
}
.sidebar h2 {
  margin-bottom: 40px; font-size: 1.6em; letter-spacing: 2px; align-self: center;
}
```
**Funcionalidade:**  
Menu lateral moderno, com título destacado e espaçamento confortável.

---

## 5. BARRA DE PESQUISA

```css
.search-box {
  width: 100%; display: flex; margin-bottom: 22px; gap: 8px;
}
.search-box input {
  flex: 1; padding: 10px 12px; border-radius: 5px 0 0 5px;
  border: 1px solid #ccc; font-size: 1em; outline: none;
}
.search-box button {
  border-radius: 0 5px 5px 0;
}
```
**Funcionalidade:**  
Permite pesquisar notas de forma rápida, com input e botão lado a lado.

---

## 6. BOTÕES MODERNOS
Botões estilizados para diferentes ações.

```css
.modern-btn {
  width: 100%; padding: 13px 0; font-size: 1.1em; margin-bottom: 16px;
  border-radius: 6px; border: none; cursor: pointer; transition: background 0.2s, box-shadow 0.2s;
  font-weight: 500; box-shadow: 0 2px 10px rgba(0,0,0,0.12);
  display: flex; align-items: center; justify-content: center; gap: 7px;
}
.modern-btn.green { background: #01c896; color: #fff; }
.modern-btn.green:hover { background: #019d74; }
.modern-btn.blue { background: #0090f7; color: #fff; }
.modern-btn.blue:hover { background: #0070c9; }
.modern-btn.red { background: #ff4848; color: #fff; }
.modern-btn.red:hover { background: #c93030; }
.modern-btn.gray { background: #ddd; color: #222; }
.modern-btn.gray:hover { background: #bbb; }
```
**Funcionalidade:**  
Botões com cores diferentes para cada tipo de ação, com efeito visual ao passar o mouse.

---

## 7. BARRA DE PROGRESSO DE UPLOAD
Exibe progresso do envio de arquivos.

```css
.upload-progress {
  width: 100%; height: 12px; background: #222; border-radius: 5px;
  margin-top: 10px; overflow: hidden;
}
.upload-bar {
  height: 100%; background: linear-gradient(90deg, #00c896 60%, #0090f7 100%);
  transition: width 0.3s; width: 0%;
}
```
**Funcionalidade:**  
Visualiza o upload de arquivos de forma moderna e intuitiva.

---

## 8. ÁREA PRINCIPAL DAS NOTAS
Local onde ficam as listas de notas e cards.

```css
.main-content {
  flex: 1; padding: 36px 40px 36px 36px; overflow-y: auto;
  display: flex; flex-direction: column;
}
.section-title {
  font-size: 1.3em; font-weight: 600; color: #222; margin-bottom: 14px; margin-top: 0; letter-spacing: 1px;
}
```
**Funcionalidade:**  
Espaço confortável para visualizar e navegar pelas notas.

---

## 9. LISTA AGRUPADA DE NOTAS
Organiza cards em grid.

```css
.notes-list {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 22px; width: 100%; padding: 16px 0; box-sizing: border-box;
  margin-bottom: 16px; min-height: 80px;
}
```
**Funcionalidade:**  
Cards se organizam automaticamente, ocupando o espaço de forma inteligente.

---

## 10. CARD DA NOTA
Cada nota aparece como um card compacto e informativo.

```css
.note-card {
  background: #222d3c; border-radius: 8px; padding: 18px 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex; flex-direction: column; align-items: center; min-width: 180px; max-width: 220px;
  position: relative; animation: fadeIn 0.6s; transition: box-shadow 0.25s, transform 0.18s;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: scale(0.95);}
  100% { opacity: 1; transform: scale(1);}
}
.note-card:hover {
  box-shadow: 0 6px 22px rgba(0,200,150,0.14), 0 1.5px 12px rgba(0,144,247,0.11);
  transform: translateY(-2px) scale(1.025);
}
```
**Funcionalidade:**  
Card com sombra, animação ao aparecer e ao passar o mouse.

---

## 11. MINIATURA DO PDF
Mostra uma pequena imagem do PDF.

```css
.note-thumb {
  width: 38px; height: 55px; border-radius: 4px; object-fit: cover; background: #eee;
  margin-bottom: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.09);
}
```
**Funcionalidade:**  
Facilita identificação visual do arquivo.

---

## 12. INFORMAÇÕES DO CARD
Exibe nome, meta-informações (tamanho, data, usuário).

```css
.note-name {
  font-size: 0.73em; font-weight: 500; text-align: center; word-break: break-all;
  margin-bottom: 4px; color: #e4e4e4;
}
.note-meta {
  font-size: 0.7em; color: #bbb; margin-bottom: 5px; text-align: center;
}
```
**Funcionalidade:**  
Informações bem organizadas para consulta rápida.

---

## 13. BOTÃO ENGRENAGEM/EXCLUIR
Botão para acessar opções do card (excluir, etc).

```css
.gear-btn {
  position: absolute; top: 11px; right: 11px; background: #eee; border: none; border-radius: 50%;
  width: 27px; height: 27px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 1.1em; color: #555; box-shadow: 0 2px 6px rgba(0,0,0,0.10);
  transition: background 0.2s; z-index: 2;
}
.gear-btn:hover { background: #ff4848; color: #fff; }
```
**Funcionalidade:**  
Botão destacado, fácil de encontrar e usar.

---

## 14. BOTÃO DOWNLOAD
Para baixar o arquivo PDF.

```css
.download-btn {
  background: #0090f7; color: #fff; border: none; border-radius: 50%;
  width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.75em; position: relative; transition: background 0.2s; margin-bottom: 4px;
}
.download-btn:hover { background: #00c896; }
```
**Funcionalidade:**  
Botão circular e destacado para download rápido.

---

## 15. MODAL DE EXCLUSÃO
Centraliza o modal de confirmação de exclusão.

```css
.modal-excluir {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.18);
  display: flex; align-items: center; justify-content: center; z-index: 2000;
}
.modal-content {
  background: #fff; padding: 36px 28px; border-radius: 10px; box-shadow: 0 2px 18px rgba(0,0,0,0.14);
  min-width: 280px; text-align: center;
}
.modal-content h4 {
  margin-top: 0; margin-bottom: 18px; font-size: 1.1em; color: #d32f2f; font-weight: 600;
}
```
**Funcionalidade:**  
Modal aparece centralizado e destacado, facilitando a escolha.

---

## 16. RESPONSIVIDADE
Adapta layout para diferentes tamanhos de tela (tablet, mobile).

```css
@media (max-width: 900px) {
  .container { flex-direction: column;}
  .sidebar { width: 100%; flex-direction: row; justify-content: space-around; align-items: center; padding: 18px 7px;}
  .main-content { padding: 18px 7px;}
  .notes-list { justify-content: center; gap: 13px;}
  .note-card { width: 95vw; max-width: 330px;}
}
@media (max-width: 600px) {
  body, html {
    height: 100vh; min-height: 100vh; width: 100vw; overflow-x: hidden;
  }
  .container {
    min-height: 100vh; width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0; margin: 0; box-sizing: border-box;
  }
  .sidebar {
    position: static; width: 100vw; min-width: 100vw;
    padding: 10px 4vw 0 4vw; flex-direction: column;
    align-items: stretch; background: #111; box-sizing: border-box;
  }
  .consulta-btns {
    display: flex; flex-direction: row; gap: 7px;
    width: 100%; margin: 0 0 7px 0; justify-content: space-between;
  }
  .consulta-btn {
    flex: 1; min-width: 0; padding: 8px 0; font-size: 0.96em; border-radius: 5px;
  }
  .search-box {
    width: 100%; margin-bottom: 10px; margin-top: 0; display: flex; gap: 0;
  }
  .search-box input {
    flex: 1; padding: 7px 7px; font-size: 0.95em; border-radius: 5px 0 0 5px; border: 1px solid #bbb;
  }
  .search-box button {
    border-radius: 0 5px 5px 0; background: #222d3c; color: #fff; border: none; padding: 0 9px;
    cursor: pointer; font-size: 0.97em;
  }
  .modern-btn {
    font-size: 0.95em; margin-bottom: 7px; padding: 9px 0; border-radius: 5px;
  }
  .notes-list {
    display: flex; flex-direction: column; gap: 6px; width: 100%; padding: 0;
  }
  .note-card {
    min-width: 0; width: 100%; max-width: 92vw; padding: 10px 6vw; height: auto;
    font-size: 0.82em; flex-direction: row; align-items: center; border-radius: 6px;
    position: relative; justify-content: space-between; margin-bottom: 10px; box-sizing: border-box;
  }
  .note-card-content {
    display: flex; flex-direction: column; align-items: flex-start; flex: 1; min-width: 0;
  }
  .note-thumb {
    width: 22px; height: 30px; margin-right: 8px; margin-bottom: 0; flex-shrink: 0;
  }
  .note-name {
    font-size: 0.88em; font-weight: 600; margin: 0 0 2px 0; color: #e4e4e4;
    word-break: break-all; white-space: normal; line-height: 1.15;
  }
  .note-meta {
    font-size: 0.75em; color: #bbb; margin: 0 0 2px 0; word-break: break-all; white-space: normal; line-height: 1.1;
  }
  .download-btn {
    background: #0090f7; color: #fff; border: none; border-radius: 50%;
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1.1em; margin-left: 7px; margin-bottom: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.11); transition: background 0.2s;
  }
  .download-btn:hover { background: #00c896; }
  .gear-btn {
    position: absolute; top: 7px; right: 7px; width: 16px; height: 16px; font-size: 0.88em; border-radius: 50%;
  }
  .main-content {
    width: 100vw; max-width: 98vw; margin: 0 auto; padding: 12vw 3vw 70px 3vw; box-sizing: border-box;
  }
  .section-title {
    font-size: 0.93em; margin: 4px 0 6px 0; text-align: center; letter-spacing: 1px;
  }
}
@media (max-width: 400px) {
  .consulta-btns {
    flex-direction: column; gap: 8px;
  }
  .consulta-btn {
    width: 100%; min-width: 0; padding: 10px 0;
  }
}
```
**Funcionalidade:**  
Garante que o layout fique confortável em todas as telas, principalmente no mobile.

---

## 17. RODAPÉ
Rodapé discreto e fixo na tela.

```css
.footer-app {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  width: 100vw;
  background: #181818cc;
  color: #b5b5b5;
  font-size: 0.78em;
  font-family: 'Segoe UI', Arial, sans-serif;
  padding: 7px 0 6px 0;
  z-index: 9999;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.09);
  letter-spacing: 0.02em;
}
.footer-app .footer-bar {
  color: #888;
  font-size: 1em;
  user-select: none;
}
@media (max-width: 600px) {
  .footer-app { gap: 6px; font-size: 0.68em; padding: 6px 0 5px 0;}
}
```
**Funcionalidade:**  
Informações importantes sempre visíveis para o usuário.

---

## 18. BOTÕES DE CONSULTA NC/NE
Botões para alternar entre Notas de Crédito e Empenho.

```css
.consulta-btns {
  display: flex; flex-direction: row; gap: 8px;
  margin: 18px 0 12px 0; justify-content: flex-start;
  width: 100%; box-sizing: border-box;
}
.consulta-btn {
  flex: 1; min-width: 0; padding: 10px 0; font-size: 1em; border-radius: 5px;
  border: none; background: #222d3c; color: #f2f2f2; font-weight: 500;
  cursor: pointer; transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
}
.consulta-btn:hover {
  background: #0056b3; color: #fff;
}
.consulta-btn.active {
  background: #00c896; color: #191919; box-shadow: 0 0 0 3px #00c89644;
}
```
**Funcionalidade:**  
Alternância fácil e visual entre tipos de notas.

---

## 19. 📦 Caixinha de Texto: Lógica e Aplicação

> ### Como este CSS resolve problemas reais?
> 
> **Lógica do layout:**  
> O CSS está organizado em blocos funcionais, cada um responsável por uma parte da tela ou interação. Isso torna o código fácil de manter, entender e modificar.  
> 
> **Reset e estrutura:**  
> Começamos zerando margens e preenchimentos do navegador, garantindo previsibilidade. Estruturamos a página em áreas claras (sidebar, conteúdo, cards), e usamos Flexbox/Grid para organizá-las.
> 
> **Estilo e usabilidade:**  
> Cores, sombras e fontes foram escolhidas para garantir leitura, conforto visual e modernidade.  
> Botões são grandes e com animações para facilitar o clique em qualquer dispositivo.
> 
> **Responsividade:**  
> Media queries adaptam o layout para cada tela. No mobile, o conteúdo centraliza, ganha mais espaçamento nas bordas, evita scroll lateral e deixa tudo acessível sem esforço.
> 
> **Componentização:**  
> Cada card, botão ou área pode ser entendida como um “componente” visual. Isso facilita a reutilização do código e o entendimento do CSS como uma construção modular.
> 
> **Dica para alunos:**  
> Sempre que for criar um CSS, pense nas funções de cada bloco, use comentários, e teste em diferentes dispositivos.  
> Experimente mudar os valores, ver o efeito e entender como cada propriedade impacta a experiência.
> 
> **Conclusão:**  
> O CSS deste projeto é uma ótima base para construir interfaces modernas, responsivas e fáceis de usar. Comente, experimente e adapte para seus próprios sistemas!

---

**Dúvidas ou sugestões? Comente e participe!**
