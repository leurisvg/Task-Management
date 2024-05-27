import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { User } from '../../interfaces/users.interface';
import { generateId } from '../../utils/utils';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    MatButton,
    MatCheckbox,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent implements OnInit {
  #fb = inject(FormBuilder);
  #dialogRef = inject(MatDialogRef<UserDialogComponent>);
  
  public form = this.#fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    name: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
  });
  
  /**
   * Constructor for UserDialogComponent
   * @param user - The user data injected into the dialog (null if creating a new user).
   */
  constructor(@Inject(MAT_DIALOG_DATA) public user: User | null) {}
  
  /**
   * OnInit lifecycle hook
   * Initializes the form with user data if available.
   */
  ngOnInit(): void {
    if (!this.user) return;
    
    this.form.patchValue({
      email: this.user.email,
      name: this.user.name,
      password: this.user.password,
    });
  }
  
  /**
   * Closes the dialog without saving.
   */
  close(): void {
    this.#dialogRef.close();
  }
  
  /**
   * Saves the user data and closes the dialog.
   * If the user already exists, updates it; otherwise, creates a new user.
   */
  save(): void {
    if (this.user) {
      this.#dialogRef.close({
        id: this.user.id,
        ...this.form.value,
      });
      return;
    }
    
    this.#dialogRef.close({
      id: generateId(),
      ...this.form.value,
    });
  }
}
