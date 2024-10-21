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
import { ServiceMessagesComponent } from './pages/admin/service-messages/service-messages.component';
import { SacrificeComponent } from './pages/sacrifice/sacrifice.component';
import { SamayasServicesComponent } from './pages/samayas-services/samayas-services.component';
import { SamayasServicesFormComponent } from './pages/samayas-services-form/samayas-services-form.component';
import { IframeComponent } from './pages/iframe/iframe.component';
import { SServiceComponent } from './pages/admin/s-service/s-service.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SamayasServicesCategoryComponent } from './pages/admin/samayas-services-category/samayas-services-category.component';
import { DateRangeSelectorComponent } from './pages/date-range-selector/date-range-selector.component';
import { SamayaComponent } from './pages/samaya/samaya.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'works', component: WorksComponent },
  { path: 'work/:details', component: WorkDetailsComponent },
  { path: 'service/:details', component: SServiceComponent },
  { path: 'sacrifice', component: SacrificeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:details', component: ProjectDetailsComponent },
  { path: 'samayas-services', component: SamayasServicesFormComponent },
  { path: 'frame', component: IframeComponent },
  { path: 'calendar', component: DateRangeSelectorComponent },
  { path: 'login', component: LoginComponent},
  { path: 'samaya', component: SamayaComponent},
  { path: 'subscription', component: SubscriptionComponent},
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard], canActivateChild: [AdminAuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'quotes' },
      { path: 'quotes', component: QuotesComponent },
      { path: 'work-offers', component: WorkOffersComponent },
      { path: 'home-content', component: HomeContentComponent },
      { path: 'projects', component: ProjectComponent },
      { path: 'revards', component: RevardsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'servants', component: ServiceMessagesComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'samayas-services', component: SamayasServicesComponent },
      { path: 'samayas-services-category', component: SamayasServicesCategoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
