import { Component,OnInit,HostListener,Input  } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from '../../../service/serviceForms/form-data.service';
import { InfoProject } from '../../models/infoProject/infoProject.model';
import { BibStatus } from '../../models/bibliotecas/bibStatusAtual.model';


@Component({
  selector: 'app-infos-projetos',
  templateUrl: './infos-projetos.component.html',
  styleUrls: ['./infos-projetos.component.css']
})
export class InfosProjetosComponent  implements OnInit {

  bibStatus: BibStatus[] = [];
  formEntradas!: FormGroup;
  infoProjeto!: InfoProject;
  //id: string = '';
  rota: string = '';
  isButtonVisible: boolean = false;

  @Input('id') idProjeto!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projetoService: FormDataService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
    //this.rota = this.activatedRoute.snapshot.url[0].path;
    //this.id = this.activatedRoute.snapshot.url[1].path;
    this.idProjeto

    this.buscarProjetoPeloId();
  }

  buscarProjetoPeloId() {
    this.projetoService
    .getProjetosId(this.idProjeto)
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

  criarFormulario() {
    this.formEntradas = this.formBuilder.group({
      desc_projetos: { value: '', disabled: true },
      desc_escopo: { value: '', disabled: true },
      ds_status_atual: { value: '', disabled: true }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isButtonVisible = scrollPosition > 300;  // Exibe o botão após 300px de rolagem
  }

  retornarGrid(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
