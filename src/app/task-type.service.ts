// task-type.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskType } from './models/task-type.model';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {
    private apiUrl = 'http://localhost:3000/tasks'; 
  constructor(private http: HttpClient) {}

  getAllTaskTypes(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(this.apiUrl);
  }

  getTaskTypeById(id: number): Observable<TaskType> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TaskType>(url);
  }

  createTaskType(taskType: TaskType): Observable<TaskType> {
    return this.http.post<TaskType>(this.apiUrl, taskType);
  }

  updateTaskType(taskType: TaskType): Observable<TaskType> {
    const url = `${this.apiUrl}/${taskType.id}`;
    return this.http.put<TaskType>(url, taskType);
  }

  deleteTaskType(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
