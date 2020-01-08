import { Component, OnInit, Input } from '@angular/core';
import { KnowledgeArea } from '@shared/models/knowledge-area';

@Component({
  selector: 'app-knowledge-area-slide',
  templateUrl: './knowledge-area-slide.component.html',
  styleUrls: ['./knowledge-area-slide.component.scss'],
})
export class KnowledgeAreaSlideComponent implements OnInit {
  @Input() knowledgeArea: KnowledgeArea;
  @Input() productId: number;
  @Input() phaseId: number;
  constructor() {}

  ngOnInit() {}
}
