import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { ModalInfosComponent } from '../modal-infos/modal-infos.component';
import { InfosProjetosComponent } from '../infos-projetos/infos-projetos.component';

import { colunasTabela } from '../../models/tableGrid/table-config';
import { TableColumn } from '../../models/tableGrid/camposTable.model';
import { InfosProject } from '../../models/infosProject/infosProject.model';
import { InfosProjectModal } from '../../models/infosProjetoModal/infosProjetoModal.model';

import { GridService } from '../../../service/grid.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<InfosProject>();
  infosProjects: InfosProject[] = [];
  infosProjectsModal!: InfosProjectModal;
  displayedTableColumns: TableColumn[] = colunasTabela;
  displayedColumns: string[] = [
    'cd_solicitacao',
    'ds_solicitacao_titulo',
    'ds_grupo_cliente',
    'ds_login',
    'ds_status',
    'dt_solicitacao',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(InfosProjetosComponent) infosPro!: InfosProjetosComponent;

  constructor(
    private gridService: GridService,
    public dialog: MatDialog,
  ) {}

  buscarProjetos() {
    this.gridService.getProjetos()
    .subscribe((infos: InfosProject[]) => {
      this.infosProjects = infos;
      this.dataSource.data = this.infosProjects;
    });
  }

  buscarProjetosId(id: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Impede que o modal seja fechado clicando fora dele

    this.dialog.open(ModalInfosComponent, dialogConfig);

    this.gridService
    .getProjetosId(id)
    .subscribe((infosProjectsModal: InfosProjectModal) => {
      this.infosProjectsModal = infosProjectsModal;

      console.log(infosProjectsModal.cd_custo)

      debugger
      this.infosPro.formEntradas.controls['desc_projetos'].setValue(infosProjectsModal.cd_custo)



    })



  }

  ngOnInit(): void {
    this.displayedTableColumns = colunasTabela;
    this.buscarProjetos();
  }

  ngAfterViewInit() {
    this.dataSource.data = this.infosProjects;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  /*
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Impede que o modal seja fechado clicando fora dele

    this.dialog.open(ModalInfosComponent, dialogConfig);
  }
*/
}
