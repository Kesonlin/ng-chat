import { Component } from '@angular/core';
import { MessagesService } from './services/messages.service';
import { ThreadsService } from './threads.service';
import { UserService } from './services/user.service';
import { ChatDataService } from './ChatDataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private messageService: MessagesService,
    private threadService: ThreadsService,
    private userService: UserService
  ) {
    ChatDataService.init(messageService, threadService, userService);
  }
}
