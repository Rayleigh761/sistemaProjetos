import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfosProjetosComponent } from './components/infos-projetos/infos-projetos.component';
import { GridComponent } from './components/grid/grid.component';

const routes: Routes = [
  {path: '', component: GridComponent},
  {path: 'projeto/:id', component: InfosProjetosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
