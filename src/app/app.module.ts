import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';
import { MessagesService } from './services/messages.service';
import { AccountComponent } from './account/account.component';
import { Socket, SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { RegisterComponent } from './register/register.component';
import { ChannelsComponent } from './channels/channels.component';
import { ReactiveFormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    AccountComponent,
    RegisterComponent,
    ChannelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
