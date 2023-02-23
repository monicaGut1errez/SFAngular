import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienciasSalaComponent } from './audiencias-sala.component';

describe('AudienciasSalaComponent', () => {
  let component: AudienciasSalaComponent;
  let fixture: ComponentFixture<AudienciasSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudienciasSalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienciasSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
