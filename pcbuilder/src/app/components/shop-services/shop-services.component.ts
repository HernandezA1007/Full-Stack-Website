import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ShopItemService } from '../../services/shop-item.service';
import { ShopItem } from '../../models/shop-item.model';

@Component({
  selector: 'app-shop-services',
  standalone: true,
  imports: [CommonModule], // ShopItemService, HttpClientModule
  templateUrl: './shop-services.component.html',
  styleUrl: './shop-services.component.css'
})
export class ShopServicesComponent implements OnInit {
  // items = [];
  items: ShopItem[] = [];

  constructor(private shopItemService: ShopItemService) {} // , private http: HttpClient

  ngOnInit() {
    this.shopItemService.getShopItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log(data);
      },
      error: (error) => {
        console.log("Failed to get shop items", error);
      }
    });
  }
  
}
