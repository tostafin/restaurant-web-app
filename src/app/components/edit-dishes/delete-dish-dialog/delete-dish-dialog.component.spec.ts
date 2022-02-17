import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDishDialogComponent } from './delete-dish-dialog.component';

describe('DeleteDishDialogComponent', () => {
  let component: DeleteDishDialogComponent;
  let fixture: ComponentFixture<DeleteDishDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDishDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
