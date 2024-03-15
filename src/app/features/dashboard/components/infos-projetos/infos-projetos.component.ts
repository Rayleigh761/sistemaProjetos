import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridService } from 'src/app/features/service/grid.service';
import { InfosProjectModal } from '../../models/infoProject/infoProject.model';

@Component({
  selector: 'app-infos-projetos',
  templateUrl: './infos-projetos.component.html',
  styleUrls: ['./infos-projetos.component.css']
})
export class InfosProjetosComponent  implements OnInit {

  formEntradas!: FormGroup;
  infosProjeto!: InfosProjectModal;
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projetoService: GridService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    this.id = this.activatedRoute.snapshot.url[1].path;
    this.buscarProjetoPeloId();

    //console.log(this.formEntradas)
    //debugger
  }

  buscarProjetoPeloId() {
    this.projetoService
    .getProjetosId(parseInt(this.id))
    .subscribe((infosProjeto: InfosProjectModal) => {
      this.infosProjeto =  infosProjeto;
      this.formEntradas.controls['desc_projetos'].setValue(infosProjeto.DS_Descricao);
      this.formEntradas.controls['desc_escopo'].setValue(infosProjeto.DS_Escopo);
        console.log(infosProjeto)
    })

  }


  criarFormulario() {
    this.formEntradas = this.formBuilder.group({
      desc_projetos: { value: '', disabled: true },
      desc_escopo: { value: '', disabled: true }
    });

  }


}
