import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'PipeFilter',
  })

export class PipeFilter implements  PipeTransform {
    transform = (objects: any = []) => {
        return Object.values(objects);
      }
}
