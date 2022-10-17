import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipColoresComponent } from './tooltip-colores.component';

describe('TooltipColoresComponent', () => {
  let component: TooltipColoresComponent;
  let fixture: ComponentFixture<TooltipColoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipColoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
