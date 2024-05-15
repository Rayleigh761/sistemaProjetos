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
import { MatSnackBar } from '@angular/material/snack-bar';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-infos-analista',
  templateUrl: './infos-analista.component.html',
  styleUrls: ['./infos-analista.component.css']
})
export class InfosAnalistaComponent  implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<InfosProjectResponsavel>();
  displayedColumns: string[] = ['DS_Tipo_Area','DS_Tipo_Tecnologia','qtd_dias','DS_NOME','qtd_dias_real','buttonColumn'];
  displayedTableColumns: TableColumn[] = ColunasTabelaAnalistas;
  infosResponsavel: InfosProjectResponsavel[] = [];
  bibAnalistas: BibAnalistas[] = [];
  bibTecnologia: BibTecnologia[] = [];
  bibAreas: BibAreas[] = [];
  formAnalista!: FormGroup;
  infosResponsavelEdit!: InfosProjectResponsavel;

  id: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private infosAnalista: ServiceAnalista,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
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


  buscarInfosAnalistaId(cdInfo: number ){
    this.infosAnalista.getInfosAnalistaEdit(cdInfo)
    .subscribe((infosResponsavel: InfosProjectResponsavel) => {
      console.log(this.infosResponsavelEdit)
        this.infosResponsavelEdit = infosResponsavel;
        this.formAnalista.controls['cd_tipo_area'].setValue(infosResponsavel.cd_tipo_area)
        this.formAnalista.controls['cd_tipo_tecnologia'].setValue(infosResponsavel.cd_tipo_tecnologia)
        this.formAnalista.controls['cd_analista'].setValue(infosResponsavel.cd_analista)
        this.formAnalista.controls['dt_inicio'].setValue(infosResponsavel.dt_inicio)
        this.formAnalista.controls['dt_inicioReal'].setValue(infosResponsavel.dt_inicio_real)
        this.formAnalista.controls['dt_prazo'].setValue(infosResponsavel.dt_prazo)
        this.formAnalista.controls['dt_prazoReal'].setValue(infosResponsavel.dt_prazo_real)
        this.formAnalista.controls['qtd_dias'].setValue(infosResponsavel.qtd_dias)
        this.formAnalista.controls['qtd_dias_reais'].setValue(infosResponsavel.qtd_dias_real)
    })
  }


  salvarInfos() {

    const payload: InfosProjectResponsavel = {
      cd_projeto: this.id,
      cd_tipo_area: this.formAnalista.controls['cd_tipo_area'].value,
      cd_tipo_tecnologia: this.formAnalista.controls['cd_tipo_tecnologia'].value,
      cd_analista: this.formAnalista.controls['cd_analista'].value,
      qtd_dias: this.formAnalista.controls['qtd_dias'].value,
      qtd_dias_real: this.formAnalista.controls['qtd_dias_reais'].value,
      dt_inicio: dayjs(this.formAnalista.controls['dt_inicio'].value).format('YYYY-MM-DD'),
      dt_prazo: dayjs(this.formAnalista.controls['dt_prazo'].value).format('YYYY-MM-DD'),
      dt_inicio_real: dayjs(this.formAnalista.controls['dt_inicioReal'].value).format('YYYY-MM-DD'),
      dt_prazo_real: dayjs(this.formAnalista.controls['dt_prazoReal'].value).format('YYYY-MM-DD'),
    }

    this.insertEsforco(payload)

  }

  insertEsforco(payload: InfosProjectResponsavel) {
    this.infosAnalista.inserirEsforco(payload).subscribe(() => {
      this.buscarInfosAnalista();
      this.formAnalista.reset();
      this._snackBar.open('Informação inserida!', '', {
        duration: 2000,
        horizontalPosition: 'end'
      })
    })
  }

  deletaInfo(cdInfo: number ) {
    this,this.infosAnalista.delInfosAnalista(cdInfo).subscribe(() => {
      this.buscarInfosAnalista();
      this._snackBar.open('Informação Excluida!','',{
        duration: 2000,
        horizontalPosition: 'end'
      })
    })
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
