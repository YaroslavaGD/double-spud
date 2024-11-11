import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsStatusComponent } from './cards-status.component';

describe('CardsStatusComponent', () => {
  let component: CardsStatusComponent;
  let fixture: ComponentFixture<CardsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
