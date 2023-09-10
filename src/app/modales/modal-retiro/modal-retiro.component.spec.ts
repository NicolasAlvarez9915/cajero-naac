import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRetiroComponent } from './modal-retiro.component';

describe('ModalRetiroComponent', () => {
  let component: ModalRetiroComponent;
  let fixture: ComponentFixture<ModalRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRetiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
