// CONTROLLER: recebe a requisição, chama o Model e escolhe a View (ou redireciona).

const Tarefa = require('../models/tarefaModel');

const FILTROS = ['todas', 'pendente', 'concluida'];

function naoEncontrada(res) {
  return res.status(404).render('erro', { mensagem: 'Tarefa não encontrada.' });
}

// GET /?status=todas|pendente|concluida
exports.listar = (req, res) => {
  const filtro = FILTROS.includes(req.query.status) ? req.query.status : 'todas';
  const tarefas = Tarefa.listar(filtro);
  res.render('index', { tarefas, filtro });
};

// GET /tarefas/nova
exports.formNova = (req, res) => {
  res.render('form', {
    titulo: 'Nova tarefa',
    acao: '/tarefas',
    tarefa: { titulo: '', descricao: '', disciplina: '' },
    erros: [],
  });
};

// POST /tarefas
exports.criar = (req, res) => {
  const { erros, dados } = Tarefa.validar(req.body);
  if (erros.length > 0) {
    return res.status(400).render('form', {
      titulo: 'Nova tarefa',
      acao: '/tarefas',
      tarefa: dados,
      erros,
    });
  }
  Tarefa.criar(dados);
  res.redirect('/');
};

// GET /tarefas/:id
exports.detalhes = (req, res) => {
  const tarefa = Tarefa.buscarPorId(req.params.id);
  if (!tarefa) return naoEncontrada(res);
  res.render('detalhes', { tarefa });
};

// GET /tarefas/:id/editar
exports.formEditar = (req, res) => {
  const tarefa = Tarefa.buscarPorId(req.params.id);
  if (!tarefa) return naoEncontrada(res);
  res.render('form', {
    titulo: 'Editar tarefa',
    acao: `/tarefas/${tarefa.id}/editar`,
    tarefa,
    erros: [],
  });
};

// POST /tarefas/:id/editar
exports.editar = (req, res) => {
  const existente = Tarefa.buscarPorId(req.params.id);
  if (!existente) return naoEncontrada(res);

  const { erros, dados } = Tarefa.validar(req.body);
  if (erros.length > 0) {
    return res.status(400).render('form', {
      titulo: 'Editar tarefa',
      acao: `/tarefas/${existente.id}/editar`,
      tarefa: { id: existente.id, ...dados },
      erros,
    });
  }
  Tarefa.atualizar(existente.id, dados);
  res.redirect(`/tarefas/${existente.id}`);
};

// POST /tarefas/:id/concluir
exports.concluir = (req, res) => {
  const tarefa = Tarefa.concluir(req.params.id);
  if (!tarefa) return naoEncontrada(res);
  res.redirect(req.get('Referer') || '/');
};

// GET /tarefas/:id/excluir  (tela de confirmação)
exports.confirmarExclusao = (req, res) => {
  const tarefa = Tarefa.buscarPorId(req.params.id);
  if (!tarefa) return naoEncontrada(res);
  res.render('excluir', { tarefa });
};

// POST /tarefas/:id/excluir  (exclusão efetiva, só após confirmar)
exports.excluir = (req, res) => {
  if (!Tarefa.excluir(req.params.id)) return naoEncontrada(res);
  res.redirect('/');
};
