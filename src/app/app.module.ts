import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorksComponent } from './pages/works/works.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { WorkDetailsComponent } from './pages/work-details/work-details.component';
import { WorkFormComponent } from './pages/work-form/work-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {MatTooltipModule} from '@angular/material/tooltip';
import { getAuth, provideAuth } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { QuotesComponent } from './pages/admin/quotes/quotes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkOffersComponent } from './pages/admin/work-offers/work-offers.component';
import { ProjectComponent } from './pages/admin/project/project.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ModalComponent } from './pages/admin/modal/modal.component';
import {MatChipsModule} from '@angular/material/chips';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import '@angular/common/locales/global/ru';
import { RevardsComponent } from './pages/admin/revards/revards.component'
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MessagesComponent } from './pages/admin/messages/messages.component';
import { ConfirmComponent } from './pages/admin/confirm/confirm.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { WorkFilterPipe } from './shared/pipe/work-filter.pipe';
import { HomeContentComponent } from './pages/admin/home-content/home-content.component';
import {MatMenuModule} from '@angular/material/menu';
import { ServiceMessagesComponent } from './pages/admin/service-messages/service-messages.component';
import { MatSelectModule } from '@angular/material/select';
import { FormApplyComponent } from './pages/form-apply/form-apply.component';
import { SacrificeComponent } from './pages/sacrifice/sacrifice.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { SamayasServicesComponent } from './pages/samayas-services/samayas-services.component';
import { SamayasServicesFormComponent } from './pages/samayas-services-form/samayas-services-form.component';
import { IframeComponent } from './pages/iframe/iframe.component';
import { SServiceComponent } from './pages/admin/s-service/s-service.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { LoginComponent } from './components//login/login.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { BearerTokenInterceptor } from './interseptor/bearer-token.interceptor';
import { FormCategoryComponent } from './pages/form-category/form-category.component';
import { SamayasServicesCategoryComponent } from './pages/admin/samayas-services-category/samayas-services-category.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangeSelectorComponent } from './pages/date-range-selector/date-range-selector.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FirebaseService } from './services/firebase.service';
import { SamayaComponent } from './pages/samaya/samaya.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WorksComponent,
    DateRangeSelectorComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    WorkDetailsComponent,
    WorkFormComponent,
    QuotesComponent,
    WorkOffersComponent,
    ProjectComponent,
    AdminComponent,
    ModalComponent,
    RevardsComponent,
    MessagesComponent,
    ConfirmComponent,
    SnackbarComponent,
    CategoryComponent,
    ServiceMessagesComponent,
    WorkFilterPipe,
    HomeContentComponent,
    FormApplyComponent,
    SacrificeComponent,
    CurrencyComponent,
    SamayasServicesComponent,
    SamayasServicesFormComponent,
    IframeComponent,
    SServiceComponent,
    LoginComponent,
    FormCategoryComponent,
    SamayasServicesCategoryComponent,
    SamayaComponent,
    SubscriptionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    AppRoutingModule,
    FullCalendarModule,
    MatChipsModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CarouselModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    HttpClientModule,
    AngularEditorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AdminAuthGuard,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerTokenInterceptor,
      multi: true,
    },
    FirebaseService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
