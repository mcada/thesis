import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPresenterComponent } from './tasks-presenter.component';

describe('TasksPresenterComponent', () => {
  let component: TasksPresenterComponent;
  let fixture: ComponentFixture<TasksPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
