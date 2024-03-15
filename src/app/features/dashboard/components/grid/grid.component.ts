import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { colunasTabela } from '../../models/tableGrid/table-config';
import { TableColumn } from '../../models/tableGrid/camposTable.model';
import { InfosProject } from '../../models/infosProject/infosProject.model';

import { GridService } from '../../../service/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<InfosProject>();
  infosProjects: InfosProject[] = [];
  displayedTableColumns: TableColumn[] = colunasTabela;
  displayedColumns: string[] = ['cd_solicitacao','ds_solicitacao_titulo','ds_grupo_cliente','ds_login','ds_status','dt_solicitacao'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private gridService: GridService,
    private router: Router
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
    this.router.navigate(['grid','projeto',id]);
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

}
