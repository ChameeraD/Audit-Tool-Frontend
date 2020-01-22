import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeAreaApiService } from '@shared/services/api/knowledge-area.service';
import { KnowledgeArea } from '@shared/models/knowledge-area';
import { ProductApiService } from '@shared/services/api/product.api.service';
import { Product } from '@shared/models/product';
import { Question } from '@shared/models/question';
import { QuestionApiService } from '@shared/services/api/question.api.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss'],
})
export class ViewQuestionsComponent implements OnInit {
  phaseId: number;
  productId: number;
  knowledgeAreaId: number;
  private sub: any;
  lcarouselLength = 5;
  constructor(
    private route: ActivatedRoute,
    private knowledgeAreaApiService: KnowledgeAreaApiService,
    private productApiService: ProductApiService,
    private questionApiService: QuestionApiService,
  ) {}

  items: KnowledgeArea[] = [];
  product: Product[];
  questions: Question[];
  faSpinner = faSpinner;

  async ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      this.productId = +params.productId;
      this.phaseId = +params.productPhaseId;
      this.knowledgeAreaId = +params.knowledgeAreaId;
      await this.getProductDetails(this.productId);
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

  async getQuestionsByKnowledgeArea(id: number) {
    this.questions = await this.questionApiService.get(id);
  }
}
