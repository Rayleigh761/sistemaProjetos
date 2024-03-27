import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';

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


}
