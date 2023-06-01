import { Component } from '@angular/core';
import { Message, Thread, User } from '../model';
import { Observable } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { ThreadsService } from '../services/threads.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

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
  inputValue: string = '123';

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

  sendMsg() {
    this.defaultMessage.thread = this.currentThread;
    this.defaultMessage.isRead = true;
    this.defaultMessage.author = this.currentUser;
    this.defaultMessage.text = this.inputValue;
    this.messageService.addMessage(this.defaultMessage);
    this.defaultMessage = new Message();
  }
}
