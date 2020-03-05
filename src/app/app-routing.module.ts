import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserviewComponent } from './userview/userview.component';
import { CalendarviewComponent } from './calendarview/calendarview.component';


const routes: Routes = [

  { path: '', redirectTo: 'userview', pathMatch: 'full' },
  { path: 'userview', component: UserviewComponent },
  { path: 'calendarview', component: CalendarviewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
