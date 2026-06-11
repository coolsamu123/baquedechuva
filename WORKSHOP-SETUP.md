# Formulário de inscrição do Workshop

O formulário fica na seção **"Workshop"** do site (logo abaixo do banner principal).
Ele é **customizado** (no estilo azul/dourado do site) e **envia as respostas para
o seu Google Form** — ou seja, cada inscrição cai na **planilha do Google** ligada
a esse formulário.

✅ **Já está configurado e funcionando.**

## Onde vejo as inscrições?

No seu Google Form → aba **Respostas** → ícone da planilha verde
(**Vincular a uma planilha**). Cada inscrição vira uma linha automaticamente.

> Confira que o Google Form está com **"Aceitar respostas"** ligado (aba Respostas).

---

## Como funciona (para referência técnica)

O formulário do site envia os dados direto para o endpoint do Google Form.
A ligação fica no arquivo **`content.json`**, no bloco `"workshop"`:

```json
"workshop": {
  "googleFormId": "ID_DO_SEU_FORMULARIO",
  "entries": {
    "name":     "entry.XXXX",
    "email":    "entry.XXXX",
    "location": "entry.XXXX",
    "phone":    "entry.XXXX",
    "level":    "entry.XXXX"
  }
}
```

(`name` = Nome, `email` = E-mail, `location` = País/Cidade,
`phone` = Telefone/WhatsApp, `level` = Nível de experiência)

### Se um dia precisar trocar o formulário / pegar os códigos de novo

1. **ID do formulário:** está na URL do form, entre `/e/` e `/viewform`.
2. **Códigos dos campos (`entry.123...`):** no Google Form, clique nos
   **3 pontinhos (⋮) → "Obter link pré-preenchido"**, preencha qualquer coisa
   nos campos, clique em **"Obter link"** e copie. Cada `entry.XXXX` do link
   corresponde a uma pergunta.
3. Cole os valores no bloco `"workshop"` do `content.json` e salve (commit).

> **Importante:** a pergunta do nível de experiência no Google Form deve ser do
> tipo **"Resposta curta"** — o site envia o texto `beginner` / `intermediate`
> / `advanced`.
