import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feedback'
})
export class FeedbackPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
