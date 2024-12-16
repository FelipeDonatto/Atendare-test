# **Documentação da Aplicação**

## **Introdução**

## Esta aplicação é um sistema de gerenciamento de contatos, desenvolvido em React e TypeScript. Ela permite que os usuários criem, editem e excluam contatos, além de realizar buscas e filtragens.

---

## ![fluxo](/public/site-usage.gif)

---

## **Funcionalidades**

- **Criar Contato**: permite que os usuários criem novos contatos, fornecendo informações como nome, e-mail, telefone, etc.
- **Editar Contato**: permite que os usuários editem contatos existentes, alterando informações como nome, e-mail, telefone, etc.
- **Excluir Contato**: permite que os usuários excluam contatos existentes.
- **Buscar Contato**: permite que os usuários realizem buscas por contatos, utilizando filtros como nome, e-mail, telefone, etc.
- **Filtrar Contato**: permite que os usuários filtrem contatos, utilizando critérios como nome, e-mail, telefone, etc.

## **Componentes**

- **Formulário de Contato**: componente responsável por criar e editar contatos.
- **Lista de Contatos**: componente responsável por exibir a lista de contatos.
- **Barra de Busca**: componente responsável por realizar buscas por contatos.
- **Filtro de Contatos**: componente responsável por filtrar contatos.

## **Tecnologias Utilizadas**

- **React**: biblioteca JavaScript para criar interfaces de usuário.
- **NextJS**: utilizado em conjunto com o react.
- **TypeScript**: linguagem de programação para criar aplicações escaláveis e seguras.
- **Formik**: biblioteca para agilizar a criação e controle de formulários.
- **Yup**: biblioteca para validação de formulários.
- **TailwindCSS**: biblioteca para simplificar a construção das páginas fornecendo CSS.

## **Instalação**

1. Clone o repositório da aplicação.
2. Instale as dependências utilizando o comando `npm install`.
3. Inicie a aplicação utilizando o comando `npm run dev`.

## **Configuração**

- **Arquivo de Configuração**: o arquivo `.env` precisará ser criado e populado por uma chave `NEXT_PUBLIC_API_TOKEN`
- **Variáveis de Ambiente**: as variáveis de ambiente são utilizadas para armazenar as configurações da aplicação.

## **Segurança**

- **Validação de Formulários**: a aplicação utiliza validação de formulários para garantir que os dados sejam válidos e seguros.

## **Desenvolvimento**

- **Atualizações**: a aplicação poderia ser melhorada com:
  - Design responsivo para dispositivos móveis
    - Devido ao tempo não foi possível deixar completamente responsivo.
  - Rotas e verificações de login
  - Testes unitários
  - Existe um erro ao usar o Formik e campos numéricos em formulários.
