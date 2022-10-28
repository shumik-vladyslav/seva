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

import { getAuth, provideAuth } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { QuotesComponent } from './pages/admin/quotes/quotes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkOffersComponent } from './pages/admin/work-offers/work-offers.component';
import { ProjectComponent } from './pages/admin/project/project.component';

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

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CarouselModule,
    MatPaginatorModule,
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
