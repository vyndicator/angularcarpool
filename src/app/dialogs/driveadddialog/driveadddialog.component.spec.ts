import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveadddialogComponent } from './driveadddialog.component';

describe('DriveadddialogComponent', () => {
  let component: DriveadddialogComponent;
  let fixture: ComponentFixture<DriveadddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveadddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveadddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
