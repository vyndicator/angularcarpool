import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradddialogComponent } from './useradddialog.component';

describe('UseradddialogComponent', () => {
  let component: UseradddialogComponent;
  let fixture: ComponentFixture<UseradddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseradddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
