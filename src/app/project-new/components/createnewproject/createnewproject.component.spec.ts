import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewprojectComponent } from './createnewproject.component';

describe('CreatenewprojectComponent', () => {
  let component: CreatenewprojectComponent;
  let fixture: ComponentFixture<CreatenewprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenewprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
