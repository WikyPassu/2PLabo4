import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmailComponent } from './card-email.component';

describe('CardEmailComponent', () => {
  let component: CardEmailComponent;
  let fixture: ComponentFixture<CardEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
