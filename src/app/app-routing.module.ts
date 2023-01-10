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
import { AdminComponent } from './pages/admin/admin.component';
import { RevardsComponent } from './pages/admin/revards/revards.component';
import { MessagesComponent } from './pages/admin/messages/messages.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { HomeContentComponent } from './pages/admin/home-content/home-content.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorksComponent },
  { path: 'work/:details', component: WorkDetailsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:details', component: ProjectDetailsComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'quotes' },
      { path: 'quotes', component: QuotesComponent },
      { path: 'work-offers', component: WorkOffersComponent },
      { path: 'home-content', component: HomeContentComponent },
      { path: 'projects', component: ProjectComponent },
      { path: 'revards', component: RevardsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'category', component: CategoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
