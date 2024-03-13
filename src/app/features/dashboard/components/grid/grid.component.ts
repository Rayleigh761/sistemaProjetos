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
  displayedColumns: string[] = ['cd_solicitacao','ds_solicitacao_titulo','ds_grupo_cliente','ds_login','ds_status','dt_solicitacao'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(InfosProjetosComponent) infosPro!: InfosProjetosComponent;

  constructor(
    private gridService: GridService,
    public dialog: MatDialog,
  ) {}

  buscarProjetos() {
    this.gridService
    .getProjetos()
    .subscribe((infos: InfosProject[]) => {
      this.infosProjects = infos;
      this.dataSource.data = this.infosProjects;
    });
  }

  buscarProjetosId(id: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Impede que o modal seja fechado clicando fora dele

    this.dialog.open(ModalInfosComponent, dialogConfig);

    this.gridService
    .getProjetosId(id)
    .subscribe((infosProjectsModal: InfosProjectModal | InfosProjectModal[]) => {


      if (Array.isArray(infosProjectsModal)) {
        this.infosProjectsModal = infosProjectsModal[0];
      } else {
        this.infosProjectsModal = infosProjectsModal;
      }

      console.log(this.infosProjectsModal);
      console.log(this.infosProjectsModal?.ds_grupo_cliente);

      //debugger
      if (this.infosPro && this.infosPro.formEntradas) {
        this.infosPro.formEntradas.controls['desc_projetos'].setValue(this.infosProjectsModal?.ds_grupo_cliente);
      }


    })
    debugger
  }


  infosTest(){
    console.log('aqui foi')
  }

  ngOnInit(): void {
    this.displayedTableColumns = colunasTabela;
    this.buscarProjetos();
    console.log('aqui ' + this.infosPro)
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
