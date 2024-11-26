import { Component,OnInit, ViewChild,AfterViewInit, Input } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from '../../models/tableGrid/camposTable.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  displayedColumns: string[] = ['DS_Tipo_Area','DS_Tipo_Tecnologia','qtd_dias','DS_NOME','qtd_dias_real','buttonColumn'];
  displayedTableColumns: TableColumn[] = ColunasTabelaAnalistas;
  infosResponsavel: InfosProjectResponsavel[] = [];
  bibAnalistas: BibAnalistas[] = [];
  bibTecnologia: BibTecnologia[] = [];
  bibAreas: BibAreas[] = [];
  formAnalista!: FormGroup;
  infosResponsavelEdit!: InfosProjectResponsavel;

  mostrarAdicionar: boolean = true;
  mostrarAtualizarCancelar: boolean = false;

  id: string = '';

  @Input('id') idProjeto!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private infosAnalista: ServiceAnalista,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //this.id = this.activatedRoute.snapshot.url[1].path;
    this.idProjeto;
    this.criarFormularioAnalista();
    this.buscarInfosAnalista();
    this.bibliotecaAnalista();
    this.bibliotecaTecnologia();
    this.bibliotecaAreas();
  }

  buscarInfosAnalista() {
    this.infosAnalista
    .getInfosAnalista(this.idProjeto)
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
      this.infosResponsavelEdit = infosResponsavel;

      // Função para converter string de data para objeto de data
      const converterParaData = (dataString: string) => {
        const [dia, mes, ano] = dataString.split('/');
        return new Date(+ano, +mes - 1, +dia);
      };

      this.formAnalista.setValue({
        cd_tipo_area: infosResponsavel.cd_tipo_area,
        cd_tipo_tecnologia: infosResponsavel.cd_tipo_tecnologia,
        cd_analista: infosResponsavel.cd_analista,
        dt_inicio: converterParaData(infosResponsavel.dt_inicio),
        dt_inicioReal: converterParaData(infosResponsavel.dt_inicio_real),
        dt_prazo: converterParaData(infosResponsavel.dt_prazo),
        dt_prazoReal: converterParaData(infosResponsavel.dt_prazo_real),
        qtd_dias: infosResponsavel.qtd_dias,
        qtd_dias_reais: infosResponsavel.qtd_dias_real
      });

      this.mostrarAdicionar = false
      this.mostrarAtualizarCancelar = true

    })
  }

  salvarInfos(dsTipo: string) {

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

    if(dsTipo == 'add'){
      this.insertEsforco(payload)
    }else{
      payload.cd_info_responsavel_projeto = this.infosResponsavelEdit.cd_info_responsavel_projeto
      this.editEsforco(payload)
    }
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

  editEsforco(payload: InfosProjectResponsavel) {
    this.infosAnalista.putInfosAnalistaEdit(payload).subscribe(() => {
      this.buscarInfosAnalista();
      this.formAnalista.reset();
      this.cancelarInfos();
      this._snackBar.open('Informação Editada!', '', {
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

  cancelarInfos(){
    this.formAnalista.reset();
    this.mostrarAdicionar = true;
    this.mostrarAtualizarCancelar = false;
  }

}
