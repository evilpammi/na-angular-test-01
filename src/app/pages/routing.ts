import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'formtax',
    loadChildren: () =>
      import('./formtax/formtax.module').then((m) => m.FormTaxModule),
  },
  {
    path: '',
    redirectTo: '/formtax',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];


export { Routing };
