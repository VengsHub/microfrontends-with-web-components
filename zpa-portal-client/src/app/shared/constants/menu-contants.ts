import {MenuOption} from '@kpark/zpa-components';
import {DashboardTab} from '../models/dashboard-widget.model';

export const MENU_OPTIONS: MenuOption[] = [
  {route: DashboardTab.PatientOverview, label: 'Patientenüberblick', icon: 'assets/images/icn-placeholder.svg'},
  {
    route: DashboardTab.MedicalPatientHistory,
    label: 'Medizinische Patientenhistorie',
    icon: 'assets/images/icn-placeholder.svg'
  }
];
