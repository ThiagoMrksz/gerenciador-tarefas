// MODEL: guarda os dados (array em memória) e aplica as regras de negócio/validação.
// Não conhece req/res nem HTML.

const tarefas = [];
let proximoId = 1; // contador para gerar ids únicos (nunca reaproveita ids excluídos)

function validar({ titulo, descricao, disciplina }) {
  const erros = [];
  const dados = {
    titulo: (titulo || '').trim(),
    descricao: (descricao || '').trim(),
    disciplina: (disciplina || '').trim(),
  };

  if (dados.titulo.length < 3 || dados.titulo.length > 100) {
    erros.push('O título é obrigatório e deve ter entre 3 e 100 caracteres.');
  }
  if (dados.descricao.length > 500) {
    erros.push('A descrição deve ter no máximo 500 caracteres.');
  }
  if (dados.disciplina.length < 2 || dados.disciplina.length > 80) {
    erros.push('A disciplina é obrigatória e deve ter entre 2 e 80 caracteres.');
  }

  return { erros, dados };
}

function listar(status) {
  if (status === 'pendente' || status === 'concluida') {
    return tarefas.filter((t) => t.status === status);
  }
  return [...tarefas]; // cópia, para a View não alterar o array original
}

function buscarPorId(id) {
  return tarefas.find((t) => t.id === Number(id)) || null;
}

function criar(dados) {
  const tarefa = { id: proximoId++, ...dados, status: 'pendente' };
  tarefas.push(tarefa);
  return tarefa;
}

function atualizar(id, dados) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;
  tarefa.titulo = dados.titulo;
  tarefa.descricao = dados.descricao;
  tarefa.disciplina = dados.disciplina;
  return tarefa;
}

function concluir(id) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;
  tarefa.status = 'concluida';
  return tarefa;
}

function excluir(id) {
  const indice = tarefas.findIndex((t) => t.id === Number(id));
  if (indice === -1) return false;
  tarefas.splice(indice, 1);
  return true;
}

module.exports = { validar, listar, buscarPorId, criar, atualizar, concluir, excluir };
