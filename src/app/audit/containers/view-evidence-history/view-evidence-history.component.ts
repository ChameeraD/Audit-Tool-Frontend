import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-evidence-history',
  templateUrl: './view-evidence-history.component.html',
  styleUrls: ['./view-evidence-history.component.scss']
})
export class ViewEvidenceHistoryComponent implements OnInit {

  isCollapsed = false;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService

    ) { }

  sub: any;
  productId: number;
  questionId: number;

  async ngOnInit() {
    this.spinner.show();
    this.sub = this.route.params.subscribe(async params => {
      this.productId = +params['product-id'];
      this.questionId = +params['question-id'];
    });
  }

}
