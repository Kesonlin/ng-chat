import { Message, Thread, User } from './model';
import { MessagesService } from './services/messages.service';
import { UserService } from './services/user.service';
import { ThreadsService } from './threads.service';

const me: User = new User('Juliet', 'Juliet-img');
const ladycap: User = new User('Lady Capulet', 'Lady Capulet-img');
const echo: User = new User('Echo Bot', 'Echo Bot-img');
const rev: User = new User('Reverse Bot', 'Reverse Bot-img');
const wait: User = new User('Waiting Bot', 'Waiting Bot-img');

const tLadycap: Thread = new Thread(
  ladycap.name,
  ladycap.avatarSrc,
  'tLadycap'
);
const tEcho: Thread = new Thread(echo.name, echo.avatarSrc, 'tEcho');
const tRev: Thread = new Thread(rev.name, rev.avatarSrc, 'tRev');
const tWait: Thread = new Thread(wait.name, wait.avatarSrc, 'tWait');

const initMessages: Message[] = [
  new Message({
    author: me,
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap,
    sentAt: +new Date(),
  }),
  new Message({
    author: echo,
    sentAt: +new Date() + 100,
    text: `I\'ll echo whatever you send me`,
    thread: tEcho,
  }),
  new Message({
    author: rev,
    sentAt: +new Date() + 1000,
    text: `I\'ll reverse whatever you send me`,
    thread: tRev,
  }),
];

export class ChatDataService {
  static init(
    messageService: MessagesService,
    threadService: ThreadsService,
    userService: UserService
  ): void {
    userService.setCurrentUser(me);

    initMessages.map((message: Message) => {
      // console.log(message);

      messageService.addMessage(message);
    });

    setTimeout(() => {
      messageService.addMessage(
        new Message({
          author: ladycap,
          sentAt: new Date(),
          text: 'So shall you feel the loss, but not the friend which you weep for.',
          thread: tLadycap,
        })
      );
    }, 1000);

    setTimeout(() => {
      messageService.addMessage(
        new Message({
          author: wait,
          sentAt: new Date(),
          text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
          thread: tWait,
        })
      );
    }, 1000);

    messageService.messages.subscribe((m) => {
      console.log('m', m);
    });

    threadService.setCurrentThread(tEcho);

    this.setupBots(messageService);
  }

  static setupBots(messageService: MessagesService): void {
    messageService.messageForThread;
  }
}
