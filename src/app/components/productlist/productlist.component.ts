import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {

  POSTS: any;
  token: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  isPopupVisible = false;
  searchTerm: any = '';


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.productsList();
    this.productService.productListUpdate$.subscribe(() => {
      this.productsList();
    });
  }

  productsList(): void {
    this.productService.getAllProductData(this.token).subscribe((Response: any) => {
      this.POSTS = Response;
      console.log(this.POSTS);
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.productsList();
  }
  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
