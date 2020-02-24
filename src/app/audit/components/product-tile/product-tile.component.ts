import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@shared/models/product';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { UserApiService } from '@shared/services/api/user.api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  faEllipsisV = faEllipsisV;

  @Input() product: Product;
  allUsers: any;
  firstUsers: [];
  userCount: number;

  colors = [
    '#8E44AD' ,
    '#AA73C2',
    '#C7A2D6',
  ];
  constructor(private userApiService: UserApiService , private spinner: NgxSpinnerService) {

   }

  ngOnInit() {
    this.getusers();
  }

  async getusers() {
    this.spinner.show();
    const data = await this.userApiService.getusersByProduct(this.product.id);
    this.allUsers = JSON.parse(data);
    this.firstUsers = this.allUsers.splice(0, 3);
    this.userCount = this.allUsers.length;
    this.spinner.hide();
  }

}
