# Formulário de inscrição do Workshop

O formulário de inscrição é o seu **Google Form embutido** na seção "Workshop"
do site (logo abaixo do banner principal). As respostas caem direto na
**planilha do Google** ligada a esse formulário — é lá que você controla os inscritos.

✅ **Já está configurado e funcionando.** Não precisa fazer mais nada.

---

## Como trocar o formulário (se um dia precisar)

1. No seu Google Form, clique em **Enviar → aba `< >` (Incorporar HTML)**.
2. Copie a URL que aparece dentro de `src="..."` (algo como
   `https://docs.google.com/forms/d/e/SEU_ID/viewform?embedded=true`).
3. Abra o arquivo **`index.html`**, procure por **`docs.google.com/forms`**
   e substitua a URL do `src` do `<iframe class="workshop-iframe" ...>`.
4. Salve (commit). Pronto.

## Onde vejo as inscrições?

No próprio Google Form, aba **Respostas** → ícone de planilha
(**Vincular a uma planilha**, se ainda não tiver vinculado). Cada inscrição
vira uma linha na planilha automaticamente.

## Dica

Confira que o Google Form está com a opção **"Aceitar respostas"** ligada
(aba Respostas). Se estiver desligada, ninguém consegue se inscrever.
