import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNavbar } from './custom-navbar';

describe('CustomNavbar', () => {
  let component: CustomNavbar;
  let fixture: ComponentFixture<CustomNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
