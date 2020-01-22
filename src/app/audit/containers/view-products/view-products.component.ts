import { Component, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ProductApiService } from '@shared/services/api/product.api.service';
import { Product } from '@shared/models/product';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  faEllipsisV = faEllipsisV;

  products: Product[];

  constructor(private productApi: ProductApiService,
              private authService: AuthService) { }

  async ngOnInit() {
    this.products = await this.productApi.get();
  }
}
