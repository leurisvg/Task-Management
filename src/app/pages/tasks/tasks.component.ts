import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of, switchMap } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../interfaces/task.interface';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export default class TasksComponent implements OnInit {
  #taskService = inject(TaskService);
  #dialog = inject(MatDialog);
  public userService = inject(UserService);
  public displayedColumns: string[] = ['title', 'description', 'completed', 'actions'];
  public tasks = signal<Task[]>([]);
  
  /**
   * Retrieves user tasks from the TaskService and sets them to the tasks signal.
   */
  ngOnInit(): void {
    this.#taskService.getUserTasks().subscribe(tasks => this.tasks.set(tasks));
  }
  
  /**
   * Opens a dialog box for adding a new task. Upon closure of the dialog,
   * adds the new task to the task list.
   */
  addTask(): void {
    const dialogRef = this.#dialog.open(TaskDialogComponent, {
      data: null,
      width: '400px',
    });
    
    dialogRef.afterClosed()
      .pipe(
        switchMap((result: Task) => {
          return result ? this.#taskService.addTask(result) : of(null);
        })
      ).subscribe(tasks => {
        if (tasks) this.tasks.set([...tasks]);
    });
  }
  
  /**
   * Opens a dialog box for editing an existing task. Upon closure of the dialog,
   * updates the task in the task list.
   */
  editTask(task: Task): void {
    const dialogRef = this.#dialog.open(TaskDialogComponent, {
      data: task,
      width: '400px',
    });
    
    dialogRef.afterClosed()
      .pipe(
        switchMap((result: Task) => {
          return result ? this.#taskService.editTask(result) : of(null);
        })
      ).subscribe(tasks => {
        if (tasks) this.tasks.set([...tasks]);
    });
  }
  
  /**
   * Opens a confirmation dialog for deleting a task. Upon confirmation,
   * deletes the task from the task list.
   */
  deleteTask(task: Task): void {
    const dialogRef = this.#dialog.open(ConfirmationDialogComponent, {
      data: { name: task.title, isUser: false },
    });
    
    dialogRef.afterClosed()
      .pipe(
        switchMap((result: boolean) => {
          return result ? this.#taskService.deleteTask(task.id) : of(null);
        })
      ).subscribe(tasks => {
        if (tasks) this.tasks.set([...tasks]);
    });
  }
}
