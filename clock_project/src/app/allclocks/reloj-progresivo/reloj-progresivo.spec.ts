import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojProgresivo } from './reloj-progresivo';

describe('RelojProgresivo', () => {
  let component: RelojProgresivo;
  let fixture: ComponentFixture<RelojProgresivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojProgresivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojProgresivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
