import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryPipe',
  pure: false
})
export class SalaryPipe implements PipeTransform {

  transform(value: number): any {     
    switch(value){
      case 1  :return "Primero";
      
    }    
  }
}
