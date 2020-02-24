import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { Evidence } from '@shared/models/evidence';
import { EvidenceApiService } from '@shared/services/api/evidence.service';
import { DatePipe } from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-evidence-history-box',
  templateUrl: './evidence-history-box.component.html',
  styleUrls: ['./evidence-history-box.component.scss']
})
export class EvidenceHistoryBoxComponent implements OnInit {
  @Input() productId: number;
  @Input() questionId: number;
  evidenceId: number;
  evidence: Evidence[] = null;
  pipe = new DatePipe('en-US');
  submitEvidence = false;
  faSpinner = faSpinner;
  evidenceReceived = true;
  constructor(
    private authService: AuthService,
    private evidenceService: EvidenceApiService,
    private spinner: NgxSpinnerService,

  ) {
    this.evidenceService.evidenceId.subscribe(id => {
      this.evidenceId = id;
      if (this.evidenceId) {
        this.getEvidence(this.evidenceId);
      }
    });
  }

  async ngOnInit() {
    this.evidence = await this.evidenceService.get(this.productId , this.questionId);
    this.spinner.hide();
  }

  async save() {
    this.submitEvidence = true;
    const evidence = new Evidence();
    evidence.productId = this.productId;
    evidence.userId = await this.authService.getCurrentUserId();
    evidence.content = this.evidence[0].content;
    evidence.version = this.evidence[0].version;
    evidence.status = this.evidence[0].status;
    try {
      this.evidenceService.post(this.questionId, evidence);
    } catch (error) {
    } finally {
      setTimeout(() => {
        this.submitEvidence = false;
      }, 1000);
    }
  }

  async getEvidence(id: number) {
    this.evidenceReceived = false;
    this.evidence = await this.evidenceService.getEvidenceById(id);
    this.evidenceReceived = true;

  }

}
