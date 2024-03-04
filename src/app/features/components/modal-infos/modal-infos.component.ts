import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { InfosProjetosComponent } from '../infos-projetos/infos-projetos.component';

@Component({
  selector: 'app-modal-infos',
  templateUrl: './modal-infos.component.html',
  styleUrls: ['./modal-infos.component.css'],
  standalone: true,
  imports: [MaterialModule,InfosProjetosComponent],
})

export class ModalInfosComponent {


}
