import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktableComponent } from './tasktable.component';

describe('TasktableComponent', () => {
  let component: TasktableComponent;
  let fixture: ComponentFixture<TasktableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasktableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
