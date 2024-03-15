import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData = new BehaviorSubject<any>(null);

  constructor() { }

  setFormData(data: any) {
    this.formData.next(data);
  }

  getFormData() {
    return this.formData.asObservable();
  }
}
