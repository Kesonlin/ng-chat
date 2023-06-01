import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { Message, Thread } from '../model';
import { MessagesService } from './messages.service';

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
        // console.log('thread messages', messages);

        const threads: { [key: string]: Thread } = {};
        messages.map((message: Message) => {
          threads[message.thread.id] =
            threads[message.thread.id] || message.thread;
          const messageThread: Thread = threads[message.thread.id];
          if (
            !messageThread.lastMessage ||
            +messageThread.lastMessage.sentAt < +message.sentAt
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
        // console.log('lllll', threads);

        threads.sort((a: Thread, b: Thread) => {
          // console.log(+a.lastMessage.sentAt, +b.lastMessage.sentAt);
          return +b.lastMessage.sentAt - +a.lastMessage.sentAt;
        });
        // threads.reverse();
        // console.log('ggggg', threads);
        return threads;
      })
    );

    this.orderedThreads.subscribe((t) => {
      console.log('tttt', t);
    });

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

    // this.currentThread.subscribe((m) => {
    //   console.log(m);
    // });
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}
