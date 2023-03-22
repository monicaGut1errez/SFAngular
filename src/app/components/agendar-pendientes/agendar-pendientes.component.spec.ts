import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarPendientesComponent } from './agendar-pendientes.component';

describe('AgendarPendientesComponent', () => {
  let component: AgendarPendientesComponent;
  let fixture: ComponentFixture<AgendarPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
