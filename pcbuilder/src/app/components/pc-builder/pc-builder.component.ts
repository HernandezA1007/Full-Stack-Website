import { Component, OnInit } from '@angular/core';
import { ShopItemService } from '../../services/shop-item.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShopItem } from '../../models/shop-item.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pc-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pc-builder.component.html',
  styleUrl: './pc-builder.component.css'
})
export class PcBuilderComponent implements OnInit {
  categories: string[] = ['CPU', 'Motherboard', 'GPU', 'RAM', 'Storage', 'Power Supply', 'Case'];
  components: { [key: string]: ShopItem[] } = {};
  selectedItems: { [key: string]: ShopItem | null } = {};
  totalPrice: number = 0;

  constructor(private shopItemService: ShopItemService) {}

  ngOnInit() {
    this.categories.forEach(category => {
      this.shopItemService.getItemsByCategory(category).subscribe(
        items => {
          this.components[category] = items;
        },
        error => console.error(`Error loading ${category} items:`, error)
      );
    });
  }

  // onSelectItem(category: string, item: ShopItem) {
  //   if (item) {
  //     this.selectedItems[category] = item;
  //     this.updateTotalPrice();
  //   }
  // }
  onSelectItem(category: string, event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    const selectedIndex = selectElement.selectedIndex - 1; 
    if (selectedIndex >= 0 && this.components[category] && this.components[category][selectedIndex]) {
        const item = this.components[category][selectedIndex];
        this.selectedItems[category] = item;
        this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    this.totalPrice = Object.values(this.selectedItems)
                            // .filter(item => item) // != null 
                            .filter(item => item !== undefined && item !== null)
                            // .reduce((acc, item) => acc + item.price, 0);
                            .reduce((acc, item) => acc + (item ? item.price : 0), 0);
  }

  // 
  printBuild() {
    window.print();
  }

  downloadPDF() {
    const content: HTMLElement = document.querySelector('#buildModalContent') as HTMLElement;
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save("build.pdf");
    }).catch(err => console.error('Error generating PDF', err));
  }

  prepareEmail() {
    const content: HTMLElement = document.querySelector('#buildModalContent') as HTMLElement;
    const emailBody = encodeURIComponent(content.innerText);
    window.open(`mailto:?subject=Your PC Build&body=${emailBody}`);
  }
}
