import { Component } from '@angular/core';
import { Message, Thread, User } from '../model';
import { Observable } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { ThreadsService } from '../threads.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  currentUser!: User;
  messages: Observable<any>;
  currentThread!: Thread;
  defaultMessage: Message;

  constructor(
    private messageService: MessagesService,
    private threadService: ThreadsService,
    private userService: UserService
  ) {
    this.messages = threadService.currentThreadMessage;
    this.defaultMessage = new Message();
    threadService.currentThread.subscribe((thread: Thread) => {
      this.currentThread = thread;
    });
    userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
  }
}
