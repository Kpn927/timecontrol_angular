import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojSegmentos } from './reloj-segmentos';

describe('RelojSegmentos', () => {
  let component: RelojSegmentos;
  let fixture: ComponentFixture<RelojSegmentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojSegmentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojSegmentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
