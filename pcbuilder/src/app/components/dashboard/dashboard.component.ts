import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ShopItemService } from '../../services/shop-item.service';
import { ShopItem } from '../../models/shop-item.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required]),
    imageUrl: new FormControl(''),
    vendorUrl: new FormControl('', [Validators.required])
  });

  constructor(private shopItemService: ShopItemService) {}

  onSubmit() {
    if (this.itemForm.valid) {
      // this.shopItemService.addShopItem(this.itemForm.value).subscribe({
      const itemData: ShopItem = this.itemForm.value as ShopItem;
      this.shopItemService.addShopItem(itemData).subscribe({
        next: (res) => console.log('Item added:', res),
        error: (err) => console.error('Error adding item:', err)
      });
    }
  }
}
