
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  restaurant = {
    id: null as number | null,
    name: '',
    city: '',
    state: '',
    menu: '',
    contactNumber: '',
    description: '',
    customerFeedback: '',
    availableTiming: ''
  };

  states = ['State1', 'State2']; 
  cities = ['City1', 'City2'];
  errorMessage: string | null = null;

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit() {

    this.states = ['Maharashtra', 'Gujarat', 'Karnataka']; 
    this.cities = ['Mumbai', 'Ahmedabad', 'Begaluru'];
  }

  onStateChange(selectedState: string) {
  
    const stateCityMap: { [key: string]: string[] } = {
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
      'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
      'Karnataka': ['Bangalore', 'Mysore', 'Hubli']
    };

    this.cities = stateCityMap[selectedState] || []; 
    this.restaurant.city = ''; 
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }
    try {
      this.restaurant.id = this.generateUniqueId();
      this.restaurantService.saveRestaurant(this.restaurant);
      this.router.navigate(['/list-restaurants']);
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }
  generateUniqueId(): number {
    const existingRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    const maxId = existingRestaurants.reduce((max: number, r: any) => r.id > max ? r.id : max, 0);
    return maxId + 1;  // Return next ID
  }

  goBack(): void {
    this.router.navigate(['/home']); 
  }
}
