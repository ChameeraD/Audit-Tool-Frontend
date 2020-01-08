import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeAreaSlideComponent } from './knowledge-area-slide.component';

describe('KnowledgeAreaSlideComponent', () => {
  let component: KnowledgeAreaSlideComponent;
  let fixture: ComponentFixture<KnowledgeAreaSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeAreaSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeAreaSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
