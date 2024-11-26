import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-infos',
  templateUrl: './modal-infos.component.html',
  styleUrls: ['./modal-infos.component.css'],
})

export class ModalInfosComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }) {}

}
