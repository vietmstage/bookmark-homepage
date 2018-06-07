import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './containers/home/home.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { HttpClientModule }from '@angular/common/http';
import { BasicHomeComponent } from './containers/basic-home/basic-home.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeaderComponent,
    SidebarComponent,
    HeroDetailComponent,
    MessagesComponent,
    ArticleComponent,
    HomeComponent,
    ArticleListComponent,
    BasicHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
