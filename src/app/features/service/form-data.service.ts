import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class FormDataService extends HttpBaseService {

  private endpointProjeto = 'projetos';
  private endpointBibi = 'bibliotecas';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getProjetosId(id: number):Observable<any>{
    return this.httpGet(`${this.endpointProjeto}/${id}`)
  }

  getBibiStatus(status: number):Observable<any>{
    return this.httpGet(`${this.endpointBibi}/${status}`)
  }

  getBibiAnalista():Observable<any>{
    return this.httpGet(`getAnalistas`)
  }

  getBibiTecnologia():Observable<any>{
    return this.httpGet(`getTiposTecnlogias`)
  }

}
