import { evidenceBaseRoute } from './../../constants';
import { evidenceRoute, questionRoute2 } from './../../constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evidence } from '@shared/models/evidence';

@Injectable({
  providedIn: 'root',
})
export class EvidenceApiService {
  constructor(private httpClient: HttpClient) {}

  public async get(id: number, qid: number): Promise<Evidence[]> {
    const result = await this.httpClient
      .get(evidenceRoute + '/' + id + '/questions/' + qid + '/evidence')
      .toPromise();
    return result as Evidence[];
  }

  async updateStatus(id: number, status: any, eid: number): Promise<boolean> {
    const url = evidenceBaseRoute + '/' + id + '/evidence/' + eid;
    const result = await this.httpClient.put(url, status).toPromise();
    return result as boolean;
  }

  async post(id: number, data: Evidence): Promise<boolean> {
    const result = await this.httpClient
      .post(questionRoute2 + '/' + id + '/evidence', data)
      .toPromise();
    return result as boolean;
  }
}
