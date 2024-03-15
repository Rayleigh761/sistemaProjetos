import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistemaProjetos';

  menus : any [] = [
    {descricao: 'Dashboard', rota: 'grid'},
    {descricao: 'Novo Projeto', rota: ''},
  ]

}
