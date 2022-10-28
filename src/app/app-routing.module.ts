import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WorksComponent } from './pages/works/works.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { WorkDetailsComponent } from './pages/work-details/work-details.component';
import { QuotesComponent } from './pages/admin/quotes/quotes.component';
import { WorkOffersComponent } from './pages/admin/work-offers/work-offers.component';
import { ProjectComponent } from './pages/admin/project/project.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorksComponent },
  { path: 'work/:details', component: WorkDetailsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:details', component: ProjectDetailsComponent },
  { path: 'admin/quotes', component: QuotesComponent },
  { path: 'admin/work-offers', component: WorkOffersComponent },
  { path: 'admin/projects', component: ProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
