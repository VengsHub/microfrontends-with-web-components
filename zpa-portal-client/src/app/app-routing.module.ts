import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardTab } from './shared/models/dashboard-widget.model';
import { ErrorComponent, ErrorSite } from './error/error.component';

const routes: Routes = [
  {path: '', redirectTo: `${DashboardTab.PatientOverview}`, pathMatch: 'full'},
  {
    path: DashboardTab.PatientOverview, component: AppComponent
  },
  {
    path: DashboardTab.MedicalPatientHistory, component: AppComponent
  },
  {
    path: ErrorSite.Path, component: ErrorComponent
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
