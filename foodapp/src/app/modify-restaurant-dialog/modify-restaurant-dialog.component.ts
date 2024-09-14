import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-modify-restaurant-dialog',
  templateUrl: './modify-restaurant-dialog.component.html',
  styleUrls: ['./modify-restaurant-dialog.component.css']
})
export class ModifyRestaurantDialogComponent implements OnInit  {

  restaurant: any;
  states = ['Maharashtra', 'Gujarat', 'Karnataka']; 
  cities: string[] = []; 

  constructor(
    public dialogRef: MatDialogRef<ModifyRestaurantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.restaurant = { ...this.data.restaurant };

    this.updateCities(this.restaurant.state);
  }

  onStateChange(selectedState: string) {
    this.updateCities(selectedState);
  }

  updateCities(state: string) {
    const stateCityMap: { [key: string]: string[] } = {
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
      'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
      'Karnataka': ['Bangalore', 'Mysore', 'Hubli']
    };

    this.cities = stateCityMap[state] || [];
    if (!this.cities.includes(this.restaurant.city)) {
      this.restaurant.city = '';
    }
  }


  onSave(): void {
    this.restaurantService.updateRestaurant(this.restaurant);
    this.dialogRef.close(false);

  }

  onCancel(): void {
    this.dialogRef.close(true);
  }

    
}
