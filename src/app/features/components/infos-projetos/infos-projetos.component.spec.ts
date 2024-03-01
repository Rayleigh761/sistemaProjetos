import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosProjetosComponent } from './infos-projetos.component';

describe('InfosProjetosComponent', () => {
  let component: InfosProjetosComponent;
  let fixture: ComponentFixture<InfosProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosProjetosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
