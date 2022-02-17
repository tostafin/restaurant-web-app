import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDishDialogComponent } from './update-dish-dialog.component';

describe('UpdateDishDialogComponent', () => {
  let component: UpdateDishDialogComponent;
  let fixture: ComponentFixture<UpdateDishDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDishDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
