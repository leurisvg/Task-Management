import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

// Interface to define the structure of data passed to the dialog
interface Data {
  name: string;
  isUser: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {}
}
