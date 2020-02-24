import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeAreaApiService } from '@shared/services/api/knowledge-area.service';
import { KnowledgeArea } from '@shared/models/knowledge-area';
import { ProductApiService } from '@shared/services/api/product.api.service';
import { Product } from '@shared/models/product';
import { Question } from '@shared/models/question';
import { QuestionApiService } from '@shared/services/api/question.api.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhaseApiService } from '@shared/services/api/phase.api.service';
import { Phase } from '@shared/models/phase';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss'],
})
export class ViewQuestionsComponent implements OnInit {
  phaseId: number;
  productId: number;
  phase: Phase;
  knowledgeAreaId: number;
  private sub: any;
  lcarouselLength = 5;
  constructor(
    private route: ActivatedRoute,
    private knowledgeAreaApiService: KnowledgeAreaApiService,
    private productApiService: ProductApiService,
    private questionApiService: QuestionApiService,
    private phaseApiService: PhaseApiService,
    private spinner: NgxSpinnerService,
  ) {}

  items: KnowledgeArea[] = [];
  product: Product[];
  questions: Question[];
  faSpinner = faSpinner;

  async ngOnInit() {
    this.spinner.show();
    this.sub = this.route.params.subscribe(async params => {
      this.productId = +params['product-id'];
      this.phaseId = +params['product-phase-id'];
      this.knowledgeAreaId = +params['knowledge-area-id'];
      await this.getProductDetails(this.productId);
      await this.getPhaseDetailsByProductPhaseId(this.phaseId);
      await this.getKnowledgeAreasByPhaseId(this.phaseId);
      await this.getQuestionsByKnowledgeArea(this.knowledgeAreaId);
    });
  }

  async getKnowledgeAreasByPhaseId(id: number) {
    this.items = await this.knowledgeAreaApiService.get(id);
    if (this.items.length < 5) {
      this.lcarouselLength = this.items.length;
    }
  }

  async getProductDetails(id: number) {
    this.product = await this.productApiService.getById(id);
  }

  async getPhaseDetailsByProductPhaseId(id: number) {
    this.phase = await this.phaseApiService.getPhaseByProductPhaseId(id);
  }

  async getQuestionsByKnowledgeArea(id: number) {
    this.questions = await this.questionApiService.get(id);
  }
}
