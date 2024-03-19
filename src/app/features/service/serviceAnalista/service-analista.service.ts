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


}
