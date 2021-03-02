import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserDataComponent } from './all-user-data.component';

describe('AllUserDataComponent', () => {
  let component: AllUserDataComponent;
  let fixture: ComponentFixture<AllUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
