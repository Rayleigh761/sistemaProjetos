import { Component,OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from '../../models/tableGrid/camposTable.model';
import { MatTableDataSource } from '@angular/material/table';
import { ColunasTabelaAnalistas } from './../../models/tableInfosAnalistas/camposTableAnalista.model';
import { InfosProjectResponsavel } from './../../models/tableInfosAnalistas/infosProjectResponsavel';
import { ServiceAnalista } from 'src/app/features/service/serviceAnalista/service-analista.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-infos-analista',
  templateUrl: './infos-analista.component.html',
  styleUrls: ['./infos-analista.component.css']
})
export class InfosAnalistaComponent  implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<InfosProjectResponsavel>();
  displayedColumns: string[] = ['DS_Tipo_Area','DS_Tipo_Tecnologia','qtd_dias','DS_NOME','qtd_dias_real'];
  displayedTableColumns: TableColumn[] = ColunasTabelaAnalistas;
  infosResponsavel: InfosProjectResponsavel[] = [];

  id: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private infosAnalista: ServiceAnalista,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.buscarInfosAnalista();
  }

  buscarInfosAnalista() {
    this.infosAnalista
    .getInfosAnalista(parseInt(this.id))
    .subscribe((infosResponsavel: InfosProjectResponsavel[]) => {
      this.infosResponsavel = infosResponsavel;
      this.dataSource.data = this.infosResponsavel;
      console.log(infosResponsavel)
    });
  }

  ngAfterViewInit() {
    this.dataSource.data = this.infosResponsavel;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }



}
