import { Component, OnInit, Input } from '@angular/core';
import { Phase } from '@shared/models/phase';
import { Product } from '@shared/models/product';
import { KnowledgeAreaApiService } from '@shared/services/api/knowledge-area.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-phase-tile',
  templateUrl: './phase-tile.component.html',
  styleUrls: ['./phase-tile.component.scss'],
})
export class PhaseTileComponent implements OnInit {
  @Input() phase: Phase;
  @Input() productId: number;
  knowledgeA: any;

  constructor(
    private knowledgeAreaApiService: KnowledgeAreaApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  async ngOnInit() {
    this.spinner.show();
    this.knowledgeA = await this.knowledgeAreaApiService.get(
      this.phase.phaseId,
    );
    this.spinner.hide();
  }

  navigate() {
    this.spinner.show();
    this.router.navigateByUrl(
      '/audit/products/' +
        this.productId +
        '/phases/' +
        this.phase.productPhaseId +
        '/knowledge-areas/' +
        this.knowledgeA[0].id +
        '/question',
    );
  }
}
