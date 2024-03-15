import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForSubmitComponent } from './dialog-for-submit.component';

describe('DialogForSubmitComponent', () => {
  let component: DialogForSubmitComponent;
  let fixture: ComponentFixture<DialogForSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogForSubmitComponent]
    });
    fixture = TestBed.createComponent(DialogForSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
