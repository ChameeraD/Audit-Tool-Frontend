import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@shared/models/product';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  faEllipsisV = faEllipsisV;

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
