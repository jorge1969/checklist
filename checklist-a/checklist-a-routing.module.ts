import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistAPage } from './checklist-a.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistAPageRoutingModule {}
