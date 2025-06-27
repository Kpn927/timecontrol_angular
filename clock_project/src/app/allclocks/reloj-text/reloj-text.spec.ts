import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojText } from './reloj-text';

describe('RelojText', () => {
  let component: RelojText;
  let fixture: ComponentFixture<RelojText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
