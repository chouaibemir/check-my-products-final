import { TestBed } from '@angular/core/testing';

import { TopicValuesService } from './topic-values.service';

describe('TopicValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicValuesService = TestBed.get(TopicValuesService);
    expect(service).toBeTruthy();
  });
});
