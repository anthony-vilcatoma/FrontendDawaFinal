// task-form.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'] // Puedes usar estilos aquí si es necesario
})
export class TaskFormComponent implements OnInit {
  @Input() selectedTask?: Task;
  isNewTask: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (!this.selectedTask) {
      this.selectedTask = {} as Task; // Inicializa la tarea si no hay ninguna seleccionada
      this.isNewTask = true;
    }
  }

  saveTask(): void {
    if (this.selectedTask?.id) {
      this.taskService.updateTask(this.selectedTask)
        .subscribe(() => {
          // Aquí podrías emitir un evento para notificar al componente padre
          // sobre la actualización exitosa y manejar la lógica necesaria
        });
    } else {
      this.taskService.createTask(this.selectedTask!)
        .subscribe(() => {
          // Aquí podrías emitir un evento para notificar al componente padre
          // sobre la creación exitosa y manejar la lógica necesaria
        });
    }
  }

  cancel(): void {
    // Aquí podrías emitir un evento para notificar al componente padre
    // sobre la cancelación y manejar la lógica necesaria
  }
}
