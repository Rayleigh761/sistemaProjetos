import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalInfosComponent } from './modal-infos.component';

describe('ModalInfosComponent', () => {
  let component: ModalInfosComponent;
  let fixture: ComponentFixture<ModalInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
