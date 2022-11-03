import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirReporteComponent } from './imprimir-reporte.component';

describe('ImprimirReporteComponent', () => {
  let component: ImprimirReporteComponent;
  let fixture: ComponentFixture<ImprimirReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
