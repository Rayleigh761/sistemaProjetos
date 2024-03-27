import { Component,OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from '../../models/tableGrid/camposTable.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ColunasTabelaAnalistas } from './../../models/tableInfosAnalistas/camposTableAnalista.model';
import { InfosProjectResponsavel } from './../../models/tableInfosAnalistas/infosProjectResponsavel';
import { BibAnalistas } from '../../models/bibliotecas/bibAnalistas.model';
import { BibTecnologia } from '../../models/bibliotecas/bibTipoTecnologia';
import { BibAreas } from '../../models/bibliotecas/bibAreas';
import { ServiceAnalista } from 'src/app/features/service/serviceAnalista/service-analista.service';
import * as dayjs from 'dayjs';


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
  bibAnalistas: BibAnalistas[] = [];
  bibTecnologia: BibTecnologia[] = [];
  bibAreas: BibAreas[] = [];
  formAnalista!: FormGroup;

  id: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private infosAnalista: ServiceAnalista,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.criarFormularioAnalista();
    this.buscarInfosAnalista();
    this.bibliotecaAnalista();
    this.bibliotecaTecnologia();
    this.bibliotecaAreas();
  }

  buscarInfosAnalista() {
    this.infosAnalista
    .getInfosAnalista(parseInt(this.id))
    .subscribe((infosResponsavel: InfosProjectResponsavel[]) => {
      this.infosResponsavel = infosResponsavel;
      this.dataSource.data = this.infosResponsavel;

    });
  }

  ngAfterViewInit() {
    this.dataSource.data = this.infosResponsavel;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  bibliotecaAnalista() {
    this.infosAnalista
    .getBibiAnalista()
    .subscribe((bibAnalistas: BibAnalistas[]) => {
      this.bibAnalistas = bibAnalistas
    })

  }

  bibliotecaTecnologia() {
    this.infosAnalista
    .getBibiTecnologia()
    .subscribe((bibTecnologia: BibTecnologia[]) => {
      this.bibTecnologia = bibTecnologia
    })

  }

  bibliotecaAreas() {
    this.infosAnalista
    .getBibiAreas()
    .subscribe((bibAreas: BibAreas[]) => {
      this.bibAreas = bibAreas
    })

  }

  salvarInfos() {

    const payload: InfosProjectResponsavel = {
      DS_Tipo_Area: this.formAnalista.controls['cd_tipo_area'].value,
      DS_Tipo_Tecnologia: this.formAnalista.controls['cd_tipo_tecnologia'].value,
      DS_NOME: this.formAnalista.controls['cd_analista'].value,
      qtd_dias: this.formAnalista.controls['qtd_dias'].value,
      qtd_dias_real: this.formAnalista.controls['qtd_dias_reais'].value,
      dt_inicio: dayjs(this.formAnalista.controls['dt_inicio'].value).format('DD/MM/YYYY'),
      dt_prazo: dayjs(this.formAnalista.controls['dt_prazo'].value).format('DD/MM/YYYY'),
      dt_inicioReal: dayjs(this.formAnalista.controls['dt_inicioReal'].value).format('DD/MM/YYYY'),
      dt_prazoReal: dayjs(this.formAnalista.controls['dt_prazoReal'].value).format('DD/MM/YYYY'),
    }

    console.log(payload)

  }


  criarFormularioAnalista() {
    this.formAnalista = this.formBuilder.group({
      cd_tipo_area: ['', Validators.required],
      cd_tipo_tecnologia: ['', Validators.required],
      cd_analista: ['', Validators.required],
      qtd_dias: ['', Validators.required],
      qtd_dias_reais: ['', Validators.required],
      dt_inicio: ['0', Validators.required],
      dt_prazo: ['0', Validators.required],
      dt_inicioReal: ['0', Validators.required],
      dt_prazoReal: ['0', Validators.required],
    });

  }


}
