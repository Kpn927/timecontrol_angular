import { ComponentFixture, TestBed } from '@angular/core/testing';

import { slider } from './slider';

describe('Slider', () => {
  let component: slider;
  let fixture: ComponentFixture<slider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [slider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(slider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
