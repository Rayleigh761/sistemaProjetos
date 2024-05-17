import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { InfosProjectResponsavel } from '../../dashboard/models/tableInfosAnalistas/infosProjectResponsavel';

@Injectable({
  providedIn: 'root'
})
export class ServiceAnalista extends HttpBaseService {

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  private endpoint = 'analista';

  getInfosAnalista(id: number):Observable<any>{
    return this.httpGet(`${this.endpoint}/${id}`)
  }

  getBibiAnalista():Observable<any>{
    return this.httpGet(`getAnalistas`)
  }

  getBibiTecnologia():Observable<any>{
    return this.httpGet(`getTiposTecnlogias`)
  }

  getBibiAreas():Observable<any>{
    return this.httpGet(`getTiposAreas`)
  }

  inserirEsforco(payload: InfosProjectResponsavel): Observable<any>{
    return this.httpPost(`${this.endpoint}`,payload)
  }

  delInfosAnalista(id: number):Observable<any>{
    return this.httpDelete(`${this.endpoint}/${id}`)
  }

  getInfosAnalistaEdit(id: number):Observable<any>{
    return this.httpGet(`${this.endpoint}/edit/${id}`)
  }

  putInfosAnalistaEdit(payload: InfosProjectResponsavel):Observable<any>{
    return this.httpEdit(`${this.endpoint}/${payload.cd_info_responsavel_projeto}`,payload)
  }

}
