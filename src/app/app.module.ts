import { NgModule } from '@angular/core';
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
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { getAnalytics } from "firebase/analytics";
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
import { MatNativeDateModule } from '@angular/material/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import '@angular/common/locales/global/ru';
import { RevardsComponent } from './pages/admin/revards/revards.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MessagesComponent } from './pages/admin/messages/messages.component';
import { ConfirmComponent } from './pages/admin/confirm/confirm.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { WorkFilterPipe } from './shared/pipe/work-filter.pipe';
import { HomeContentComponent } from './pages/admin/home-content/home-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WorksComponent,
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
    WorkFilterPipe,
    HomeContentComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatChipsModule,
    MatTooltipModule,
    CarouselModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatNativeDateModule,
    HttpClientModule,
    AngularEditorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
