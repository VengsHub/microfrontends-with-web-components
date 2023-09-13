import {Routes} from '@angular/router';
import {DashboardTab} from './shared/models/dashboard-widget.model';
import {ErrorComponent, ErrorSite} from './error/error.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TabContentWrapperComponent} from "./tab-content-wrapper/tab-content-wrapper.component";

export const routes: Routes = [
  {path: '', redirectTo: `${DashboardTab.MasterData}`, pathMatch: 'full',},
  {path: DashboardTab.MasterData, component: TabContentWrapperComponent},
  {path: DashboardTab.SecondTab, component: TabContentWrapperComponent},
  {path: DashboardTab.PatientOverview, component: DashboardComponent},
  {path: DashboardTab.MedicalPatientHistory, component: DashboardComponent},
  {path: ErrorSite.Path, component: ErrorComponent},
  {path: '**', redirectTo: ''}
];
