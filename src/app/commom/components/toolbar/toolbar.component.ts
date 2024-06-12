import { Component,Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() menus !: any[];
  @Input() drawer !: MatDrawer

  constructor(
    private router: Router
  ){}


  toggleDrawer() {
    this.drawer.toggle();
  }

}
