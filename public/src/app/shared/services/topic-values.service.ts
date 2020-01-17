import { Injectable } from '@angular/core';
import { Product } from 'src/app/dashboard/components/product/models/product';
import { Topic } from 'src/app/dashboard/components/product/models/topic';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicValuesService {

  topicNames: string[] = [];
  topicProductsCount: number[] = [];
  constructor() { }

  private subject = new Subject<any>();

  sendEvent() {
        this.subject.next();
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

  setTopicNames(topicNames: string[]) {
    this.topicNames = topicNames;
  }

  getTopicNames() {
    return this.topicNames;
  }

  setTopicProductsCount(topicProductsCount: number[]) {
    this.topicProductsCount = topicProductsCount;
  }

  getTopicProductsCount() {
    return this.topicProductsCount;
  }

  setNonDuplicateArray(productList: Product[]) {
    const topicNames: string[] = [];
    this.setTopicNames([]);
    productList.map((product) => {
      product.topics.map((topic) => {
        topicNames.push(topic.name);
      });
    });
    const set = new Set(topicNames);
    set.forEach((item) => {
      this.topicNames.push(item);
    });
    this.setTopicProductsCount([]);
    this.topicNames.map((topic) => {
      this.topicProductsCount.push(this.getNumberOfProductsByTopic(topic, productList));
    });
  }

  getNumberOfProductsByTopic(topicName: string, productsList: Product[]) {
    let counter = 0;
    productsList.map((product) => {
      product.topics.map((topicInList) => {
        if (topicInList.name === topicName) {
          counter = counter + 1;
        }
      });
    });
    return counter;
  }

}
