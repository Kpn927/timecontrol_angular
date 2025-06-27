import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCustomList } from './boton-custom-list';

describe('BotonCustomList', () => {
  let component: BotonCustomList;
  let fixture: ComponentFixture<BotonCustomList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonCustomList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonCustomList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
