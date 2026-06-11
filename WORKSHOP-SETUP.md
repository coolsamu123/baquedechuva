# Como ligar o formulário de inscrição ao Google Forms

O formulário de inscrição do workshop já está pronto e no estilo do site.
As respostas vão direto para uma **planilha do Google** que você controla.

Falta só **uma configuração de 5 minutos**: criar o Google Form e colar
os códigos dele no arquivo `content.json`.

---

## Passo 1 — Criar o Google Form

1. Acesse https://forms.google.com e crie um formulário em branco.
2. Dê um título, por exemplo: **Inscrição — Workshop de Maracatu 25.07**.
3. Crie **exatamente estes 5 campos** (todos do tipo "Resposta curta",
   menos o último). A **ordem não importa**, mas os tipos sim:

   | Campo no site        | Pergunta no Google Form | Tipo            |
   |----------------------|-------------------------|-----------------|
   | Nome                 | Nome completo           | Resposta curta  |
   | E-mail               | E-mail                  | Resposta curta  |
   | País / Cidade        | País / Cidade           | Resposta curta  |
   | Telefone / WhatsApp  | Telefone / WhatsApp     | Resposta curta  |
   | Nível de experiência | Nível de experiência    | Resposta curta  |

4. Clique em **Respostas → Vincular a uma planilha** para que tudo caia
   numa planilha do Google automaticamente. (É aí que você controla os inscritos.)

---

## Passo 2 — Pegar os códigos (Form ID + entry IDs)

Precisamos de 2 coisas: o **ID do formulário** e o **ID de cada campo**.

### A) ID do formulário (`googleFormId`)

1. No formulário, clique em **Enviar → ícone de link `< >`**.
2. Você verá uma URL parecida com:
   `https://docs.google.com/forms/d/e/`**`1FAIpQLSxxxxxxxxxxxxxxxxxxxxx`**`/viewform`
3. O pedaço entre `/e/` e `/viewform` é o **Form ID**. Copie-o.

### B) ID de cada campo (`entry.123456789`)

1. Ainda no formulário, clique nos 3 pontinhos (⋮) no topo →
   **Obter link pré-preenchido**.
2. Preencha cada campo com um texto qualquer (ex.: "teste") e clique em
   **Obter link** (botão no rodapé).
3. Vai aparecer um link. Copie-o. Ele tem trechos assim:
   `entry.111111111=teste&entry.222222222=teste...`
4. Cada `entry.XXXXXXXXX` é o código de um campo. Anote qual número
   corresponde a qual pergunta (a ordem no link segue a ordem das perguntas).

---

## Passo 3 — Colar no site

Abra o arquivo **`content.json`** (dá para editar direto no GitHub) e
encontre o bloco `"workshop"`. Substitua os valores:

```json
"workshop": {
  "googleFormId": "1FAIpQLSxxxxxxxxxxxxxxxxxxxxx",
  "entries": {
    "name": "entry.111111111",
    "email": "entry.222222222",
    "location": "entry.333333333",
    "phone": "entry.444444444",
    "level": "entry.555555555"
  }
}
```

- `name` = campo Nome
- `email` = campo E-mail
- `location` = campo País / Cidade
- `phone` = campo Telefone / WhatsApp
- `level` = campo Nível de experiência

Salve (commit). Pronto! A partir daí, cada inscrição cai na sua planilha.

> Enquanto `googleFormId` ainda tiver o texto `COLE_AQUI...`, o formulário
> mostra um aviso ("As inscrições abrem em breve") e **não envia nada** —
> assim ninguém se inscreve "no vazio" antes de você terminar a configuração.

---

## Dica: testar

Depois de configurar, abra o site, preencha o formulário e envie.
Atualize a planilha do Google — a linha deve aparecer lá. 🥁

## Alternativa simples (sem códigos)

Se preferir não mexer com `entry.` IDs, dá para simplesmente **embutir o
Google Form** num iframe (fica com a cara do Google, menos integrado ao site).
Me avise que eu troco para essa versão.
