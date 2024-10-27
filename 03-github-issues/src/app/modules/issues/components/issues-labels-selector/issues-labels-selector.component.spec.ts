import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesLabelsSelectorComponent } from './issues-labels-selector.component';

describe('IssuesLabelsSelectorComponent', () => {
  let component: IssuesLabelsSelectorComponent;
  let fixture: ComponentFixture<IssuesLabelsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesLabelsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuesLabelsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
