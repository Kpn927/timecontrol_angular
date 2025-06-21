import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonNavbar } from './boton-navbar';

describe('BotonNavbar', () => {
  let component: BotonNavbar;
  let fixture: ComponentFixture<BotonNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
