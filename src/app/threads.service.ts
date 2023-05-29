import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { Message, Thread } from './model';
import { MessagesService } from './services/messages.service';

@Injectable({
  providedIn: 'root',
})
export class ThreadsService {
  threads: Observable<{ [key: string]: Thread }>;
  orderedThreads: Observable<Thread[]>;
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(
    new Thread('test', 'test')
  );
  currentThreadMessage: Observable<Message[]>;

  constructor(private messagesService: MessagesService) {
    this.threads = messagesService.messages.pipe(
      map((messages: Message[]) => {
        const threads: { [key: string]: Thread } = {};
        messages.map((message: Message) => {
          threads[message.thread.id] =
            threads[message.thread.id] || message.thread;
          const messageThread: Thread = threads[message.thread.id];
          if (
            !messageThread.lastMessage ||
            messageThread.lastMessage.sentAt < message.sentAt
          ) {
            messageThread.lastMessage = message;
          }
        });
        return threads;
      })
    );

    this.orderedThreads = this.threads.pipe(
      map((threadsGroup: { [key: string]: Thread }) => {
        const threads: Thread[] = Object.values(threadsGroup);
        threads.sort(
          (a: Thread, b: Thread) =>
            +a.lastMessage.sentAt - +b.lastMessage.sentAt
        );
        return threads;
      })
    );

    this.currentThreadMessage = combineLatest(
      [this.currentThread, messagesService.messages],
      (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return messages.filter(
            (message: Message) => message.thread.id === currentThread.id
          );
        } else {
          return [];
        }
      }
    );
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}
