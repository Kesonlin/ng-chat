import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
