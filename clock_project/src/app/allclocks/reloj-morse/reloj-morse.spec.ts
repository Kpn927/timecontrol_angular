import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojMorse } from './reloj-morse';

describe('RelojMorse', () => {
  let component: RelojMorse;
  let fixture: ComponentFixture<RelojMorse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojMorse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojMorse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
