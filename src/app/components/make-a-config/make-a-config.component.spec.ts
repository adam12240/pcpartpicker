import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAConfigComponent } from './make-a-config.component';

describe('MakeAConfigComponent', () => {
  let component: MakeAConfigComponent;
  let fixture: ComponentFixture<MakeAConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeAConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeAConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
