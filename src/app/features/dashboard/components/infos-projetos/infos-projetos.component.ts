import { Component,OnInit  } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-infos-projetos',
  templateUrl: './infos-projetos.component.html',
  styleUrls: ['./infos-projetos.component.css']
})
export class InfosProjetosComponent implements OnInit  {
  formEntradas!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}


  criarFormulario() {
    this.formEntradas = this.formBuilder.group({
      desc_projetos: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.criarFormulario();
  }

}
