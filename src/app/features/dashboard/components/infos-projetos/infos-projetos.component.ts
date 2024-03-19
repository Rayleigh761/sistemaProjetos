import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from './../../../service/form-data.service';
import { InfoProject } from '../../models/infoProject/infoProject.model';
import { BibStatus } from '../../models/bibliotecas/bibStatusAtual.model';
import { BibAnalistas } from '../../models/bibliotecas/bibAnalistas.model';
import { BibTecnologia } from '../../models/bibliotecas/bibTipoTecnologia';

@Component({
  selector: 'app-infos-projetos',
  templateUrl: './infos-projetos.component.html',
  styleUrls: ['./infos-projetos.component.css']
})
export class InfosProjetosComponent  implements OnInit {

  bibStatus: BibStatus[] = [];
  bibAnalistas: BibAnalistas[] = [];
  bibTecnologia: BibTecnologia[] = [];
  formEntradas!: FormGroup;
  infoProjeto!: InfoProject;
  id: string = '';
  rota: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projetoService: FormDataService
  ) {}


  ngOnInit(): void {
    this.criarFormulario();
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.buscarProjetoPeloId();
    this.bibliotecaAnalista();
    this.bibliotecaTecnologia();
    //console.log(this.formEntradas)
    //debugger
  }

  buscarProjetoPeloId() {
    this.projetoService
    .getProjetosId(parseInt(this.id))
    .subscribe((infoProjeto: InfoProject) => {
      this.infoProjeto =  infoProjeto;
      this.formEntradas.controls['desc_projetos'].setValue(infoProjeto.DS_Descricao);
      this.formEntradas.controls['desc_escopo'].setValue(infoProjeto.DS_Escopo);
      this.formEntradas.controls['ds_status_atual'].setValue(infoProjeto.DS_Status);
      this.bibliotecaStatus();
    })

  }

  bibliotecaStatus() {
    this.projetoService
    .getBibiStatus(this.infoProjeto.CD_Status)
    .subscribe((bibStatus: BibStatus[]) => {
      this.bibStatus = bibStatus
    })

  }

  bibliotecaAnalista() {
    this.projetoService
    .getBibiAnalista()
    .subscribe((bibAnalistas: BibAnalistas[]) => {
      this.bibAnalistas = bibAnalistas
    })

  }

  bibliotecaTecnologia() {
    this.projetoService
    .getBibiTecnologia()
    .subscribe((bibTecnologia: BibTecnologia[]) => {
      this.bibTecnologia = bibTecnologia
    })

  }


  criarFormulario() {
    this.formEntradas = this.formBuilder.group({
      desc_projetos: { value: '', disabled: true },
      desc_escopo: { value: '', disabled: true },
      ds_status_atual: { value: '', disabled: true }
    });

  }

  retornarGrid(){
    this.router.navigate(['grid']);
  }

}
