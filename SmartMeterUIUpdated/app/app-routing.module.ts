import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormalModeComponent } from './normal-mode/normal-mode.component';


const routes: Routes = [
  { path: '', component: NormalModeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
