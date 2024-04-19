import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShopItemService } from '../../services/shop-item.service';
import { ShopItem } from '../../models/shop-item.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required]),
    imageUrl: new FormControl(''),
    vendorUrl: new FormControl('', [Validators.required]),
    category: new FormControl('') // for pcbuilder and maybe filter for shop page soon
  });

  items: ShopItem[] = [];
  categories = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'Power Supply', 'Case'];

  constructor(private shopItemService: ShopItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.shopItemService.getShopItems().subscribe(
      items => {
        this.items = items;
        console.log('Items loaded:', items);
      },
      error => console.error('Error loading items:', error)
    );
  }

  onSubmit() {
    if (this.itemForm.valid) {
      // this.shopItemService.addShopItem(this.itemForm.value).subscribe({  broken
      // const itemData: ShopItem = this.itemForm.value as ShopItem; works
      this.shopItemService.addShopItem(this.itemForm.value as ShopItem).subscribe({ // (itemData) works with line above
        next: (res) => console.log('Item added:', res),
        error: (err) => console.error('Error adding item:', err)
      });
    }
  }

  updateCategory(item: ShopItem, category: string) {
    this.shopItemService.updateItemCategory(item._id, { category }).subscribe(
      updatedItem => {
        console.log('Category updated:', updatedItem);
        item.category = updatedItem.category;
      },
      error => console.error('Error updating category:', error)
    )
  }
}
