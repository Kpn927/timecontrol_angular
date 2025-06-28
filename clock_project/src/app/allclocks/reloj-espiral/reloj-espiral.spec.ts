import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojEspiral } from './reloj-espiral';

describe('RelojEspiral', () => {
  let component: RelojEspiral;
  let fixture: ComponentFixture<RelojEspiral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojEspiral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojEspiral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
