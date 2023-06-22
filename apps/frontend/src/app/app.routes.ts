import { Route } from "@angular/router";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { FileDashboardComponent } from "./components/file-dashboard/file-dashboard.component";

export const appRoutes: Route[] = [ {
  path: '',
  component: FileUploadComponent,
  pathMatch: 'full',
},{
  path: 'dashboard',
  component: FileDashboardComponent,
  pathMatch: 'full',
}];
