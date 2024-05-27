import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password',
  standalone: true
})
export class PasswordPipe implements PipeTransform {
  /**
   * Transforms the input value (password) by replacing each character with an asterisk.
   */
  transform(value: string): string {
    return value.replace(value, '*'.repeat(value.length));
  }
}
