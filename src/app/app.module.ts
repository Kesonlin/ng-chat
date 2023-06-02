import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createStore, Store, Action } from 'redux';

import { AppComponent } from './app.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter.component';
import { AppState } from './store/app-state';
import { counterReducer } from './store/counter/counter-reducer';
import { AppStore } from './store/app-store';

const store: Store<AppState> = createStore<AppState, Action, unknown, unknown>(
  counterReducer
);

@NgModule({
  declarations: [
    AppComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    CounterComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [
    {
      provide: AppStore,
      useValue: store,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
