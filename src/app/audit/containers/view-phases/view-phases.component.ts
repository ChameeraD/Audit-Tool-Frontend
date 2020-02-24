import { Component, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { PhaseApiService } from '@shared/services/api/phase.api.service';
import { Phase } from '@shared/models/phase';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '@shared/services/api/product.api.service';
import { Product } from '@shared/models/product';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-view-phases',
  templateUrl: './view-phases.component.html',
  styleUrls: ['./view-phases.component.scss'],
})
export class ViewPhasesComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  id: number;
  private sub: any;

  constructor(
    private phaseApiService: PhaseApiService,
    private route: ActivatedRoute,
    private productApiService: ProductApiService,
    private spinner: NgxSpinnerService
  ) {}

  phases: Phase[];
  products: Product[];
  ngOnInit() {
    this.spinner.show();
    this.sub = this.route.params.subscribe(async params => {
      this.id = +params['product-id'];
      await this.getProductDetails(this.id);
      await this.getAllPhases(this.id);
    });
  }

  async getAllPhases(id: number) {
    this.phases = await this.phaseApiService.get(id);
  }

  async getProductDetails(id: number) {
    this.products = await this.productApiService.getById(id);
  }
}
