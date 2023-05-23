import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  filter,
  publishReplay,
  refCount,
  scan,
  map,
} from 'rxjs';
import { Message, Thread, User } from '../model';

const initialMessages: Message[] = [];

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  newMessages: Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<Message> = new Subject<Message>();

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages),
      publishReplay(1),
      refCount()
    );

    this.create
      .pipe(
        map(function (message: Message): IMessagesOperation {
          return (message: Message[]) => {
            return message.concat(message);
          };
        })
      )
      .subscribe(this.updates);

    this.newMessages.subscribe(this.create);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messageForThread(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return message.thread.id === thread.id && message.author.id !== user.id;
      })
    );
  }
}

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}
