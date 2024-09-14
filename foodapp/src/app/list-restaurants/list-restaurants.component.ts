import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ModifyRestaurantDialogComponent } from '../modify-restaurant-dialog/modify-restaurant-dialog.component';
@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})
export class ListRestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  displayedColumns: string[] = ['select','name', 'city', 'state', 'menu',  'contactNumber', 'description', 'customerFeedback','availableTiming']; 
  selectedRestaurants: Set<any> = new Set();
  //states: any;
  states = ['Maharashtra', 'Gujarat', 'Karnataka'];

  constructor(public dialog: MatDialog,private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit() {
    this.restaurants = this.restaurantService.getRestaurants();
  }

  toggleSelection(restaurant: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedRestaurants.add(restaurant);
    } else {
      this.selectedRestaurants.delete(restaurant);
    }
  }

  toggleSelectAll(isChecked: boolean) {
    if (isChecked) {
      this.restaurants.forEach(restaurant => this.selectedRestaurants.add(restaurant));
    } else {
      this.selectedRestaurants.clear();
    }
  }


  modifyRestaurant() {
    if (this.selectedRestaurants.size !== 1) {
      alert('Please select exactly one restaurant to modify.');
      return;
    }

    const restaurantToModify = Array.from(this.selectedRestaurants)[0];
    
    console.log('Modify restaurant:', restaurantToModify);

    const dialogRef = this.dialog.open(ModifyRestaurantDialogComponent, {
      width: '800px',
      data: {
        restaurant: restaurantToModify,
        states: this.states  
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restaurants = this.restaurantService.getRestaurants();
        this.selectedRestaurants.clear(); 
      }
    });
  }

  openDeleteDialog() {
    if (this.selectedRestaurants.size === 0) {
      alert('Please select atleast one restaurant to delete.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete the selected restaurants?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteRestaurant();
      }
    });
  }


  deleteRestaurant() {
  let restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
  const selectedIds = Array.from(this.selectedRestaurants).map((r: any) => r.id);
  restaurants = restaurants.filter((r: any) => !selectedIds.includes(r.id));

  localStorage.setItem('restaurants', JSON.stringify(restaurants));
  
  this.restaurants = restaurants;
  this.selectedRestaurants.clear();
  }

  isSelected(restaurant: any): boolean {
    return this.selectedRestaurants.has(restaurant);
  }

  goBack(): void {
    this.router.navigate(['/home']); 
  }
  }

