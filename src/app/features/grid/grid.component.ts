import { AfterViewInit,Component,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  position: number;
  numberProject: string;
  nameProject: string;
  dateOpen: string;
  statusProject: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, numberProject: '3555', nameProject: 'SI CADASTRO – INTEGRAÇÃO DE SISTEMAS COM O PRESTADOR DWRPA PARA O RECEBIMENTO DE NOVAS AÇÕES', dateOpen: '10/02/2020', statusProject: 'To Do'},
  {position: 2, numberProject: '3558', nameProject: 'TELEFÔNICA TRABALHISTA - CRIAÇÃO DE UM MODELO PREDITIVO DE ADVOCACIA PREDATÓRIA COM APRENDIZADO DE MÁQUINA SUPERVISIONADO', dateOpen: '10/02/2020', statusProject: 'Doing'},
  {position: 3, numberProject: '3855', nameProject: 'SI PUBLICAÇÃO – INTEGRAÇÃO DE SISTEMAS COM O PRESTADOR DWRPA PARA O RECEBIMENTO DE INTIMAÇÕES', dateOpen: '10/02/2020', statusProject: 'Adjust'},
  {position: 4, numberProject: '3525', nameProject: 'GESTÃO HOLDING (PROJETOS ESPECIAIS) – CRIAÇÃO DE ABA', dateOpen: '10/02/2020', statusProject: 'Test'},
  {position: 5, numberProject: '3325', nameProject: 'TELEFÔNICA (GESTÃO DE CONTRATOS) – CRIAÇÃO DE ABA', dateOpen: '10/02/2020', statusProject: 'Validade'},
  {position: 6, numberProject: '3552', nameProject: 'SODEXO TRABALHISTA – CRIAÇÃO DE UM NOVO RELATÓRIO DE PAUTA DE AUDIÊNCIAS', dateOpen: '10/02/2020', statusProject: 'Validate'},
  {position: 7, numberProject: '4554', nameProject: 'CANE AGROBOX - AJUSTES NA ABA E INTEGRAÇÃO DE SISTEMAS PARA O ENVIO DOS CONTRATOS A SEREM REGISTRADOS', dateOpen: '10/02/2020', statusProject: 'Done'},
  {position: 8, numberProject: '2055', nameProject: 'AMIL (CÍVEL) – CRIAÇÃO DA FLAG PROCESSO ENCONTRADO E INCLUSÃO EM RELATÓRIO CUSTOMIZADO', dateOpen: '10/02/2020', statusProject: 'Doing'},
  {position: 9, numberProject: '2452', nameProject: 'SEA GROUP (CONTENCIOSO) – CRIAÇÃO DO MÓDULO DATA DA PUBLICAÇÃO, RESULTADO SENTENÇA, ACÓRDÃO E RELATÓRIO CUSTOMIZADO', dateOpen: '10/02/2020', statusProject: 'Test'},
  {position: 10, numberProject: '1502', nameProject: 'TAM TRABALHISTA – INCLUSÃO DE CAMPOS NO MÓDULO TESTEMUNHA E RELATÓRIO CUSTOMIZADO', dateOpen: '10/02/2020', statusProject: 'Done'},
];


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})


export class GridComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'numberProject', 'name','date', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
