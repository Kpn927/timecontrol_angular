import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojMetro } from './reloj-metro';

describe('RelojMetro', () => {
  let component: RelojMetro;
  let fixture: ComponentFixture<RelojMetro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojMetro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojMetro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
