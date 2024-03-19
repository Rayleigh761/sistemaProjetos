import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosAnalistaComponent } from './infos-analista.component';

describe('InfosAnalistaComponent', () => {
  let component: InfosAnalistaComponent;
  let fixture: ComponentFixture<InfosAnalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosAnalistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
