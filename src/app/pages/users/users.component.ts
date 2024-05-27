import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { of, switchMap } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { User } from '../../interfaces/users.interface';
import { PasswordPipe } from '../../pipes/password.pipe';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    PasswordPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export default class UsersComponent implements OnInit {
  #userService = inject(UserService);
  #dialog = inject(MatDialog);
  public displayedColumns: string[] = ['email', 'name', 'password', 'actions'];
  public users = signal<User[]>([]);
  
  /**
   * Retrieves users from the UserService and sets them to the users signal.
   */
  ngOnInit(): void {
    this.#userService.getUsers().subscribe(users => this.users.set(users));
  }
  
  /**
   * Opens a dialog box for adding a new user. Upon closure of the dialog,
   * adds the new user to the user list.
   */
  addUser(): void {
    const dialogRef = this.#dialog.open(UserDialogComponent, {
      data: null,
      width: '400px',
    });
    
    dialogRef.afterClosed()
    .pipe(
      switchMap((result: User) => {
        return result ? this.#userService.addUser(result) : of(null);
      })
    ).subscribe(users => {
      if (users) this.users.set([...users]);
    });
  }
  
  /**
   * Opens a dialog box for editing an existing user. Upon closure of the dialog,
   * updates the user in the user list.
   */
  editUser(user: User): void {
    const dialogRef = this.#dialog.open(UserDialogComponent, {
      data: user,
      width: '400px',
    });
    
    dialogRef.afterClosed()
    .pipe(
      switchMap((result: User) => {
        return result ? this.#userService.editUser(result) : of(null);
      })
    ).subscribe(users => {
      if (users) this.users.set([...users]);
    });
  }
  
  /**
   * Opens a confirmation dialog for deleting a user. Upon confirmation,
   * deletes the user from the user list.
   */
  deleteUser(user: User): void {
    const dialogRef = this.#dialog.open(ConfirmationDialogComponent, {
      data: { name: user.name, isUser: true },
    });
    
    dialogRef.afterClosed()
      .pipe(
        switchMap((result: boolean) => {
          return result ? this.#userService.deleteUser(user.id) : of(null);
        })
      ).subscribe(users => {
        if (users) this.users.set([...users]);
      });
  }
}
