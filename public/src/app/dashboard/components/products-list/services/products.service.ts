import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../product/models/product';
import { Api } from '../api';
import { map } from 'rxjs/operators';
import { TopicValuesService } from 'src/app/shared/services/topic-values.service';


@Injectable()
export class ProductsService {
    constructor(private http: HttpClient,
                private topicValues: TopicValuesService
                ) {
    }

    public getProducts(day: string): Observable<any> {
        return this.http.get(Api.products,  {
            params: {
                day
              }
          })
          .pipe(
              map((response: any) => {
                const productsList = response as Product[];
                this.topicValues.setNonDuplicateArray(productsList);
                this.topicValues.sendEvent();
                return productsList;
              })
          );
    }

}


