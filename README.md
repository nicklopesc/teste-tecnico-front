# Teste técnico para desenvolvedor(a) frond-end (Vue js)

Este projeto é uma mini-aplicação desenvolvida para gerenciamento de usuários. A aplicação oferece uma visão detalhada dos usuários por meio de um dashboard, permitindo criar, editar, excluir e buscar usuários com facilidade. Além disso, o dashboard fornece gráficos e indicadores para uma análise mais profunda das informações dos usuários.

## Tecnologias Utilizadas

- Vue.js 3: Framework JavaScript para construção de interfaces de usuário.
- Vuetify: Biblioteca de componentes para Vue.js, utilizada para a interface.
- Vite: Ferramenta de build rápida para Vue.js.
- ECharts: Biblioteca para criação de gráficos e dashboards.
- Axios: Cliente HTTP para chamadas à API.

## Instalação e Configuração

1 - Abra o vs code
2 - No canto esquerdo superior clique em Terminal

Em seguida, no terminal digite:

3 - Clone o repositório com o comando
git clone https://github.com/nicklopesc/teste-tecnico-front.git

4 - Navegue até o diretório do projeto com:
cd teste-tecnico-front

5 - Instale as dependências executando:
npm install

6 - Execute o projeto com:
npm run dev.

7 - Abra o projeto no navegador acessando http://localhost:3000

## Acesso ao login

Usuário : user
Senha: password

## Estrutura do Projeto:

- src/: Código-fonte da aplicação.
  components/: Componentes reutilizáveis.
  views/: Páginas da aplicação.
  views/components: Componentes referentes as páginas principais da aplicação
  store/: Gerenciamento de estado (utilizando o vuex).
  router/: Configuração de rotas.

## Funcionalidades

- CRUD de Usuários: Permite a criação, edição, exclusão e busca de usuários.
- Autenticação: Simulação de autenticação para acessar as funcionalidades.
- Validação de Formulários: Validação de dados dos formulários de criação e edição de usuários.
- Paginação e Filtro: Paginação e filtros disponíveis na lista de usuários.
- Dashboard: Inclui gráficos e indicadores para visualização de dados dos usuários.

## Como Usar

1 - Criar um Novo Usuário:
Navegue até o menu Usuários.
Clique no botão “Adicionar Usuário”.
Preencha o formulário com as informações necessárias e clique em “Confirmar”.

2 - Editar um Usuário:
Localize o usuário desejado na tabela e clique no ícone de edição (icone em formato de lápis).
Atualize as informações e salve as alterações.
Observação: Para verificar a funcionalidade de erro, mantenha as informações do usuário e altere apenas o email.

2 - Excluir um Usuário:
Na tabela de usuários, clique no ícone de exclusão (Icone em formato de lixeira) ao lado do usuário que deseja remover.
Confirme a exclusão na caixa de diálogo que aparece.

4 - Buscar e Filtrar Usuários:
Utilize o campo de busca e os filtros disponíveis para encontrar usuários específicos rapidamente.
