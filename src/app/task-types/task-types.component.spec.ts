import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypesComponent } from './task-types.component';

describe('TaskTypesComponent', () => {
  let component: TaskTypesComponent;
  let fixture: ComponentFixture<TaskTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
