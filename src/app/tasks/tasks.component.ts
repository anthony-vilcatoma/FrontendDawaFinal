// tasks.component.ts

import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask?: Task;
  isNewTask: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAllTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
    this.isNewTask = false;
  }

  addNewTask(section: string): void {
    this.selectedTask = {
      id: undefined, // Ajusta cómo manejas los IDs según tu implementación
      title: '',
      description: '',
      dueDate: new Date(),
      taskType: section,
      completed: false,
      enable: true
    };
    this.isNewTask = true;
  }

  saveTask(): void {
    if (this.selectedTask?.id) {
      this.taskService.updateTask(this.selectedTask)
        .subscribe(() => {
          this.getAllTasks();
          this.selectedTask = undefined;
          this.isNewTask = false;
        });
    } else {
      this.taskService.createTask(this.selectedTask!)
        .subscribe(() => {
          this.getAllTasks();
          this.selectedTask = undefined;
          this.isNewTask = false;
        });
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.selectedTask = undefined;
      });
  }

  cancel(): void {
    this.selectedTask = undefined;
    this.isNewTask = false;
  }
}
