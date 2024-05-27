import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { Task } from '../../interfaces/task.interface';
import { UserService } from '../../services/user/user.service';
import { generateId } from '../../utils/utils';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatFormField,
    MatCheckboxModule,
    MatInput,
    MatLabel,
    MatButton,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements OnInit {
  #fb = inject(FormBuilder);
  #userService = inject(UserService);
  #dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  
  // Reactive form group for task form
  public form = this.#fb.group({
    title: ['', [ Validators.required ]],
    description: ['', [ Validators.required ]],
    completed: [false]
  });
  
  constructor(@Inject(MAT_DIALOG_DATA) public task: Task | null) {}
  
  /**
   * Initializes the form with task data if available.
   */
  ngOnInit(): void {
    if (!this.task) return;
    
    this.form.patchValue({
      title: this.task.title,
      description: this.task.description,
      completed: this.task.completed,
    });
  }
  
  /**
   * Closes the dialog without saving.
   */
  close(): void {
    this.#dialogRef.close();
  }
  
  /**
   * Saves the task data and closes the dialog.
   * If the task already exists, updates it; otherwise, creates a new task.
   */
  save(): void {
    if (this.task) {
      this.#dialogRef.close({
        id: this.task.id,
        userId: this.task.userId,
        ...this.form.value,
      });
      return;
    }
    
    this.#dialogRef.close({
      id: generateId(),
      userId: this.#userService.getUser()!.id,
      ...this.form.value,
    });
  }
}
