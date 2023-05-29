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
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        // console.log('scan', messages);

        return operation(messages);
      }, initialMessages),
      publishReplay(1),
      refCount()
    );

    this.create
      .pipe(
        map(function (message: Message): IMessagesOperation {
          // console.log('11111111', message);

          return (messages: Message[]) => {
            // console.log('message', 'create', message);

            return messages.concat(message);
          };
        })
      )
      .subscribe(this.updates);

    this.newMessages.subscribe(this.create);

    this.markThreadAsRead
      .pipe(
        map(
          (thread: Thread) => (messages: Message[]) =>
            messages.map((message: Message) => {
              if (message.thread.id === thread.id) {
                message.isRead = true;
              }
              return message;
            })
        )
      )
      .subscribe(this.updates);
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
