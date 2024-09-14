/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly STORAGE_KEY = 'restaurants';

  constructor() { }

  getRestaurants(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveRestaurant(restaurant: any): void {
    const restaurants = this.getRestaurants();
    const existing = restaurants.find((r: any) =>
      r.name === restaurant.name && r.state === restaurant.state && r.city === restaurant.city
    );
    if (existing) {
      throw new Error('Restaurant already added');
    }
    restaurants.push(restaurant);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
    
  }

  updateRestaurant(updatedRestaurant: any): void {
    let restaurants = this.getRestaurants();
    const index = restaurants.findIndex((r: any) =>
      r.name === updatedRestaurant.name && r.state === updatedRestaurant.state && r.city === updatedRestaurant.city
    );

    if (index !== -1) {
      restaurants[index] = updatedRestaurant;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
    }
    else {
      throw new Error('Restaurant not found');
    }
  }

  deleteRestaurant(name: string, state: string, city: string, _menu: any, _contactNumber: any, _description: any, _customerFeedback: any, _availableTiming: any): void {
    let restaurants = this.getRestaurants();
    restaurants = restaurants.filter((r: any) =>
      !(r.name === name && r.state === state && r.city === city)
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
  }
} */


  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly STORAGE_KEY = 'restaurants';

  constructor() { }

  getRestaurants(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveRestaurant(restaurant: any): void {
    const restaurants = this.getRestaurants();
    const existing = restaurants.find((r: any) =>
     // r.id === restaurant.id
      r.name === restaurant.name && r.state === restaurant.state && r.city === restaurant.city
    );
    if (existing) {
      throw new Error('Restaurant already added');
      
    }
    restaurants.push(restaurant);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
  }

  updateRestaurant(updatedRestaurant: any): void {
    let restaurants = this.getRestaurants();
    const index = restaurants.findIndex((r: any) =>
      r.id === updatedRestaurant.id
    );

    if (index !== -1) {
      restaurants[index] = updatedRestaurant;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
    }
    else {
      throw new Error('Restaurant not found');
    }
  }

  deleteRestaurant(id: number): void {
    let restaurants = this.getRestaurants();
    restaurants = restaurants.filter((r: any) => r.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
  }
}
