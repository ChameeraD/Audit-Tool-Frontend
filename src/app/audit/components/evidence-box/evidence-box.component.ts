import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Question } from '@shared/models/question';
import MediumEditor from '../../../../../node_modules/medium-editor';
const BUTTONS = [
  'bold',
  'italic',
  'underline',

  'subscript',
  'superscript',
  'anchor',
  'quote',
  'pre',
  'orderedlist',
  'unorderedlist',
  'indent',
  'justifyLeft',
  'justifyCenter',
  'justifyRight',
  'justifyFull',
  'h1',
];
@Component({
  selector: 'app-evidence-box',
  templateUrl: './evidence-box.component.html',
  styleUrls: ['./evidence-box.component.scss'],
})
export class EvidenceBoxComponent implements OnInit, AfterViewInit {
  @Input() question: Question;
  @Input() index: number;

  @ViewChild('editable', {
    static: true,
  })
  editable: ElementRef;
  editor: any;

  constructor() {}
  ngOnInit() {}

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
}
