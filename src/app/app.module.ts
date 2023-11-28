import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { collaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { Collaborator } from './entities/collaborator';
import { CollaboratorCreateComponent } from 'src/collaborator-create/collaborator-create.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    AboutUsComponent,
    TeacherListComponent,
    TeacherCreateComponent,
    TeacherDetailsComponent,
    collaboratorListComponent,
    CollaboratorCreateComponent,
    CollaboratorDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'teacher-list', component: TeacherListComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'teacher-create', component: TeacherCreateComponent },
      { path: 'teacher-details/:id', component: TeacherDetailsComponent },
      { path: '', component: AboutUsComponent },
      { path: 'collaborator-list', component: collaboratorListComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'collaborator-create', component: CollaboratorCreateComponent },
      { path: 'collaborator-details/:id', component: CollaboratorDetailsComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
