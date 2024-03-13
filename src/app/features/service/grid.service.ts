import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
//import { InfosProjectModal } from '../dashboard/models/infosProjetoModal/infosProjetoModal.model';


@Injectable({
  providedIn: 'root'
})
export class GridService extends HttpBaseService {

  private endpoint = 'projetos';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getProjetos(): Observable<any> {
    return this.httpGet(this.endpoint);
  }

  getProjetosId(id: number):Observable<any>{
    return this.httpGet(`${this.endpoint}/${id}`)
  }


}
