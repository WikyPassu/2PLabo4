import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAltaMateriaComponent } from './form-alta-materia.component';

describe('FormAltaMateriaComponent', () => {
  let component: FormAltaMateriaComponent;
  let fixture: ComponentFixture<FormAltaMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAltaMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAltaMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
