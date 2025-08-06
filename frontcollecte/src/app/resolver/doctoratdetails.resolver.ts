import { ResolveFn } from '@angular/router';
import { Doctorat } from '../composant/doctorat/data-source/doctorat.model';
import { inject } from '@angular/core';
import { DoctoratService } from '../composant/doctorat/data-source/doctorat.service';
import { catchError, of } from 'rxjs';

export const doctoratdetailsResolver: ResolveFn<Doctorat|null> = (route, state) => {
  const doctoratService = inject(DoctoratService);
  // doctoratService.getById(route.params['Id']);
  return doctoratService.getById(route.params['Id']).pipe(
      catchError(() => {
        return of(null);
      })
    );
};
