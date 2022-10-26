import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAudienciaComponent } from './datos-audiencia.component';

describe('DatosAudienciaComponent', () => {
  let component: DatosAudienciaComponent;
  let fixture: ComponentFixture<DatosAudienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosAudienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAudienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
