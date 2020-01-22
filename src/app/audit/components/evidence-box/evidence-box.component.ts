import { Component, OnInit, Input } from '@angular/core';
import { Question } from '@shared/models/question';
import { Evidence } from '@shared/models/evidence';
import { ActivatedRoute } from '@angular/router';
import { EvidenceApiService } from '@shared/services/api/evidence.service';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import MediumEditor from 'medium-editor';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const BUTTONS = [
  'bold',
  'italic',
  'underline',
  'subscript',
  'superscript',
  'anchor',
  'quote',
  'orderedlist',
  'unorderedlist',
  'justifyFull',
  'h1',
];
@Component({
  selector: 'app-evidence-box',
  templateUrl: './evidence-box.component.html',
  styleUrls: ['./evidence-box.component.scss'],
})
export class EvidenceBoxComponent implements OnInit, AfterViewInit {

  faSpinner = faSpinner;

  @Input() question: Question;
  @Input() index: number;
  @ViewChild('editable', {
    static: true,
  })
  editable: ElementRef;
  editor: any;
  evidence: Evidence[];
  productId: number;
  isAddButtonClicked = false;
  selectedStatus = null;
  isStatusUpdated = false;

  statusDropDowns = [
    { id: 1, value: 'Fully Complied' },
    { id: 2, value: 'Partialy Complied' },
    { id: 3, value: 'Not Complied' },
    { id: 4, value: 'Not Applicable' },
  ];

  constructor(
    private route: ActivatedRoute,
    private evidenceService: EvidenceApiService,
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.productId = +params.productId;
    });
    await this.getEvidenceByQuestionId(this.productId, this.question.id);
  }

  async getEvidenceByQuestionId(id: number, qid: number) {
    try {
      this.evidence = await this.evidenceService.get(id, qid);
    } catch (error) {
      console.log(error);
    }
    this.selectedStatus =
      this.evidence.length > 0 &&
      (
        this.statusDropDowns.find(item => {
          return item.value.includes(this.evidence[0].status);
        }) || { id: null, value: '' }
      ).id;
    this.editor.setContent(this.evidence[0] ? this.evidence[0].content : '');
  }

  async postEvidenceByQuestionId(qid: number, status: number) {
    this.isAddButtonClicked = true;
    const evidence = new Evidence();
    evidence.productId = this.productId;
    evidence.userId = 1;
    evidence.content = this.editor.getContent();
    evidence.version = '1';
    evidence.status = this.statusDropDowns.find(i => i.id === status).value;
    try {
      await this.evidenceService.post(qid, evidence);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.isAddButtonClicked = true;
      }, 1000);
    }
  }

  ngAfterViewInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement, {
      paste: {
        /* This example includes the default options for paste,
           if nothing is passed this is what it used */
        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir', 'name'],
        cleanTags: ['meta'],
        unwrapTags: [],
      },
      toolbar: {
        /* These are the default options for the toolbar,
             if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: BUTTONS,
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        /* options which only apply when static is true */
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false,
      },
    });
  }

  async updateStatus(status: any) {
    this.isAddButtonClicked = true;
    this.isStatusUpdated = true;
    console.log(this.evidence);
    const id = this.evidence[0].id;
    try {
      await this.evidenceService.updateStatus(
        this.question.id,
        status.value,
        Number(id),
      );
    } catch (error) {
      console.log(error);
    } finally {
      this.isAddButtonClicked = false;
      this.isStatusUpdated = false;
    }
  }
}
