import { TableColumn } from "./camposTable.model";

export const colunasTabela: TableColumn[] = [
  { header: 'Codigo', field: 'cd_solicitacao' },
  { header: 'Nome Projeto', field: 'ds_solicitacao_titulo' },
  { header: 'Grupo Cliente', field: 'ds_grupo_cliente' },
  { header: 'Usuario Solicitante', field: 'ds_login' },
  { header: 'Status', field: 'ds_status' },
  { header: 'Data da Abertura', field: 'dt_solicitacao' },

];
