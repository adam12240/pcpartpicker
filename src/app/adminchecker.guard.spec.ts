import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admincheckerGuard } from './adminchecker.guard';

describe('appcheckerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admincheckerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
