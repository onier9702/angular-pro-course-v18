import { TestBed } from '@angular/core/testing';

import { ApxAsideMenuService } from './apx-aside-menu.service';

describe('ApxAsideMenuService', () => {
  let service: ApxAsideMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApxAsideMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
