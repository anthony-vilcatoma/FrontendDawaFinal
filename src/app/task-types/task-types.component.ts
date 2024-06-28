// task-type.component.ts

import { Component, OnInit } from '@angular/core';
import { TaskTypeService } from '../task-type.service';
import { TaskType } from '../models/task-type.model';

@Component({
  selector: 'app-task-types',
  templateUrl: './task-types.component.html',
  styleUrls: ['./task-types.component.css'] // Puedes usar estilos aquí si es necesario
})
export class TaskTypesComponent implements OnInit {
  taskTypes: TaskType[] = [];
  selectedTaskType?: TaskType;
  isNewTaskType: boolean = false;

  constructor(private taskTypeService: TaskTypeService) {}

  ngOnInit(): void {
    this.getAllTaskTypes();
  }

  getAllTaskTypes(): void {
    this.taskTypeService.getAllTaskTypes()
      .subscribe(taskTypes => this.taskTypes = taskTypes);
  }

  onSelect(taskType: TaskType): void {
    this.selectedTaskType = taskType;
    this.isNewTaskType = false;
  }

  addNewTaskType(): void {
    this.selectedTaskType = {} as TaskType; // Crear un nuevo tipo de tarea vacío
    this.isNewTaskType = true;
  }

  saveTaskType(): void {
    if (this.selectedTaskType?.id) {
      this.taskTypeService.updateTaskType(this.selectedTaskType)
        .subscribe(() => this.getAllTaskTypes());
    } else {
      this.taskTypeService.createTaskType(this.selectedTaskType!)
        .subscribe(() => {
          this.getAllTaskTypes();
          this.selectedTaskType = undefined;
          this.isNewTaskType = false;
        });
    }
  }

  deleteTaskType(id: number): void {
    this.taskTypeService.deleteTaskType(id)
      .subscribe(() => {
        this.taskTypes = this.taskTypes.filter(taskType => taskType.id !== id);
        this.selectedTaskType = undefined;
      });
  }

  cancel(): void {
    this.selectedTaskType = undefined;
    this.isNewTaskType = false;
  }
}
