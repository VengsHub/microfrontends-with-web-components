import { InvocationParam } from './invocation-param.model';

export interface NavigationItem {
  name: string;
  label: string;
  icon?: string;
  urlPattern: string;
  targetUrl?: string;
  brpPermission: string;
  tabTitle: string;
  invocationParams?: InvocationParam[];
}

