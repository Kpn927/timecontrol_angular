import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojRomano } from './reloj-romano';

describe('RelojRomano', () => {
  let component: RelojRomano;
  let fixture: ComponentFixture<RelojRomano>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojRomano]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojRomano);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
