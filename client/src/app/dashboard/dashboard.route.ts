import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../common/auth.guard';

export default {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
};
