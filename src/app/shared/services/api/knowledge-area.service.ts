import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KnowledgeArea } from '../../models/knowledge-area';
import { knowledgeAreaRoute } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeAreaApiService {
  constructor(private httpClient: HttpClient) {}

  public async get(id: number): Promise<KnowledgeArea[]> {
    const result = await this.httpClient
      .get(knowledgeAreaRoute + '/' + id + '/knowledgeAreas')
      .toPromise();
    return result as KnowledgeArea[];
  }
}
