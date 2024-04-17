import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopItem } from '../models/shop-item.model'; // added for admin

@Injectable({
    providedIn: 'root'
})

export class ShopItemService {
    private apiUrl = 'http://localhost:3000/api/shop-items';

    constructor(private http: HttpClient) { }

    getShopItems(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    // add shop items for admin
    addShopItem(item: ShopItem): Observable<ShopItem> {
        return this.http.post<ShopItem>(this.apiUrl, item);
    }
}