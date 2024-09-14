import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRestaurantDialogComponent } from './modify-restaurant-dialog.component';

describe('ModifyRestaurantDialogComponent', () => {
  let component: ModifyRestaurantDialogComponent;
  let fixture: ComponentFixture<ModifyRestaurantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyRestaurantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRestaurantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
