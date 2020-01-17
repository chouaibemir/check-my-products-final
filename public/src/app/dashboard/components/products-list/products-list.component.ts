import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from '../product/models/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  providers: [ProductsService],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productList: Product[];
  date_picker: string;
  pipe = new DatePipe('en-US');
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  dateChange(date) {
    this.date_picker = date;
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts(this.date_picker ? this.date_picker : this.pipe.transform(Date.now(), 'yyyy-MM-dd')).subscribe(
      (res)=> {
        this.productList = res;
      }
    );
  }

}
