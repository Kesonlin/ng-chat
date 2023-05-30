import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { Message, Thread, User } from '../model';

describe('MessagesService', () => {
  let service: MessagesService = new MessagesService();

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(MessagesService);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('should test', () => {
    const user = new User('lh', '');
    const thread = new Thread('t1', 'lh');
    const m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread,
    });

    const m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread,
    });

    service.newMessages.subscribe((message: Message) => {
      console.log('=> newMessages: ' + message.text);
    });

    service.messages.subscribe((messages: Message[]) => {
      console.log('=> messages length: ' + messages.length);
    });

    // setTimeout(() => {
    //   service.messages.subscribe((messages: Message[]) => {
    //     console.log('settimeut', messages.length);
    //   });
    // });

    service.addMessage(m1);
    service.addMessage(m2);
  });
});
