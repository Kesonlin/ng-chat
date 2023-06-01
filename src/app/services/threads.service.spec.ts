import { TestBed } from '@angular/core/testing';

import { ThreadsService } from './threads.service';
import { Message, Thread, User } from '../model';
import { MessagesService } from './messages.service';

describe('ThreadsService', () => {
  let service: ThreadsService;

  it('should collect the Threads from Messages', () => {
    const nate: User = new User('Nate Murray', '');
    const felipe: User = new User('Felipe Coury', '');

    const t1: Thread = new Thread('t1', 'Thread1');
    const t2: Thread = new Thread('t2', 'Thread2');

    const m1: Message = new Message({
      author: nate,
      text: 'Hi!',
      thread: t1,
    });

    const m2: Message = new Message({
      author: felipe,
      text: 'Where did you get that hat?',
      thread: t1,
    });

    const m3: Message = new Message({
      author: nate,
      text: 'Did you bring the briefcase?',
      thread: t2,
    });

    const messageService: MessagesService = new MessagesService();
    const threadService: ThreadsService = new ThreadsService(messageService);

    threadService.threads.subscribe((threadIdx: { [key: string]: Thread }) => {
      const threads: Thread[] = Object.values(threadIdx);
      const threadNames: string = threads
        .map((threads: Thread) => threads.name)
        .join(',');

      console.log(`=> threads (${threads.length}): ${threadNames} `);
    });

    messageService.addMessage(m1);
    messageService.addMessage(m2);
    messageService.addMessage(m3);
  });
});
