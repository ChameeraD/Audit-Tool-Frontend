import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../models/question';
import { questionRoute } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  constructor(private httpClient: HttpClient) {}

  public async get(knowledgeAreaId: number): Promise<Question[]> {
    const result = await this.httpClient
      .get(questionRoute + '/' + knowledgeAreaId + '/questions')
      .toPromise();
    return result as Question[];
  }
}
