# Gerenciador de Tarefas Acadêmicas (Node.js + MVC)

Aplicação web para cadastrar, listar, consultar, editar, concluir, excluir e filtrar tarefas acadêmicas.
Os dados ficam **em memória** (array de objetos) e são perdidos ao reiniciar o servidor.

## Tecnologias
Node.js, Express e EJS.

## Como executar
```bash
npm install
npm start
```
Acesse http://localhost:3000

## Estrutura (MVC)
```
app.js                          # configuração do servidor
src/models/tarefaModel.js       # MODEL: array em memória + validações
src/controllers/tarefaController.js  # CONTROLLER: processa requisições
src/routes/tarefaRoutes.js      # rotas (URL -> controller)
src/views/*.ejs                 # VIEW: páginas HTML
public/style.css                # estilos
```


## Rotas
| Método | Rota | Ação |
|---|---|---|
| GET | `/?status=todas\|pendente\|concluida` | Listar e filtrar |
| GET | `/tarefas/nova` | Formulário de cadastro |
| POST | `/tarefas` | Cadastrar |
| GET | `/tarefas/:id` | Detalhes |
| GET/POST | `/tarefas/:id/editar` | Formulário / salvar edição |
| POST | `/tarefas/:id/concluir` | Concluir |
| GET | `/tarefas/:id/excluir` | Tela de confirmação |
| POST | `/tarefas/:id/excluir` | Excluir |
