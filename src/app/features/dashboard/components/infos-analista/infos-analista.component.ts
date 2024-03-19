import { Component } from '@angular/core';
import { TableColumn } from '../../models/tableGrid/camposTable.model';
import { MatTableDataSource } from '@angular/material/table';
import { ColunasTabelaAnalistas } from './../../models/tableInfosAnalistas/camposTableAnalista.model';
import { InfosProject } from '../../models/infosProject/infosProject.model';

@Component({
  selector: 'app-infos-analista',
  templateUrl: './infos-analista.component.html',
  styleUrls: ['./infos-analista.component.css']
})
export class InfosAnalistaComponent {

  dataSource = new MatTableDataSource<InfosProject>();
  displayedColumns: string[] = ['cd_solicitacao','ds_solicitacao_titulo','ds_grupo_cliente','ds_login'];
  displayedTableColumns: TableColumn[] = ColunasTabelaAnalistas;
  infosProjects: InfosProject[] = [];

}
