import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarPendientesSecConciliadorComponent } from './agendar-pendientes-sec-conciliador.component';

describe('AgendarPendientesSecConciliadorComponent', () => {
  let component: AgendarPendientesSecConciliadorComponent;
  let fixture: ComponentFixture<AgendarPendientesSecConciliadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarPendientesSecConciliadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarPendientesSecConciliadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
