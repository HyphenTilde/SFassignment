import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { ChannelsComponent } from './channels/channels.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: ':group/:channel/chat', component: ChatComponent },
  { path: 'account', component: AccountComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'account/:group/channels', component: ChannelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
