import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './ui/game/game.component';
import { MenuComponent } from './ui/menu/menu.component';
import { InitGameComponent } from './ui/init-game/init-game.component';
import { HowToPlayComponent } from './ui/how-to-play/how-to-play.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'howtoplay', component: HowToPlayComponent },
  { path: 'game/init', component: InitGameComponent },
  { path: 'game/play/:resource-state/:resource-growth/:tower/:wall/:tower-to-win', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
