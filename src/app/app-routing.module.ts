import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'
import { HomeComponent } from './containers/home/home.component';
import { BasicHomeComponent } from './containers/basic-home/basic-home.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: '', component: HomeComponent },
  { path: 'pages/newtab', component: HomeComponent },
  { path: 'basic/:sourceId', component: BasicHomeComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
