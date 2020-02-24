import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { productRoute } from '../../constants';


@Injectable({
    providedIn: 'root',
})
export class ProductApiService {
    constructor(private httpClient: HttpClient) { }

    public async get(id: string): Promise<Product[]> {
        const result = await this.httpClient.get(productRoute + '/user/' + id).toPromise();
        return JSON.parse(result['body']) as Product[];
    }

    public async getById(id: number): Promise<Product[]> {
        const result = await this.httpClient.get(productRoute + '/' + id).toPromise();
        return JSON.parse(result['body']) as Product[];
    }

    public async getAllProducts(): Promise<Product[]> {
        const result = await this.httpClient.get(productRoute + '/').toPromise();
        return JSON.parse(result['body']) as Product[];
    }
}
