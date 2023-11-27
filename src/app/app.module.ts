import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { CordinatorListComponent } from './cordinator-list/cordinator-list.component';
import { CordinatorCreateComponent } from './cordinator-create/cordinator-create.component';
import { CordinatorDetailsComponent } from './cordinator-details/cordinator-details.component';
import { CordinatorResolver } from './resolver/cordinator.resolver'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    AboutUsComponent,
    TeacherListComponent,
    TeacherCreateComponent,
    TeacherDetailsComponent,
    CordinatorListComponent,
    CordinatorCreateComponent,
    CordinatorDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'teacher-list', component: TeacherListComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'teacher-create', component: TeacherCreateComponent },
      { path: 'teacher-details/:id', component: TeacherDetailsComponent },
      { path: 'cordinator-list', component: CordinatorListComponent },
      { path: 'cordinator-create', component: CordinatorCreateComponent },
      { path: 'cordinator-details/:id', component: CordinatorDetailsComponent, resolve: { cordinator: CordinatorResolver } },
      { path: 'cordinator-edit/:id', component: CordinatorCreateComponent, resolve: { cordinator: CordinatorResolver } },
      { path: '', component: AboutUsComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
