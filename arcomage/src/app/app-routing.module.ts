import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './ui/game/game.component';
import { MenuComponent } from './ui/menu/menu.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'game/play', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
