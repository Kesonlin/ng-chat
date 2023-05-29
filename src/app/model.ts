function uuid() {
  var i, random;
  var result = '';

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      result += '-';
    }
    result += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
      16
    );
  }

  return result;
}

export class User {
  id: string;

  constructor(public name: string, public avatarSrc: string) {
    this.id = uuid();
  }
}

export class Thread {
  id: string;
  lastMessage!: Message;
  name: string;
  avatarSrc: string;

  // 必须先声明所有必填参数再声明可选参数
  constructor(name: string, avatarSrc: string, id?: string) {
    this.id = id || uuid();
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}

export class Message {
  id: string;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
  thread: Thread;

  constructor(obj?: any) {
    this.id = (obj && obj.id) || uuid();
    this.isRead = (obj && obj.isRead) || false;
    this.sentAt = (obj && obj.sentAt) || new Date();
    this.author = (obj && obj.author) || null;
    this.text = (obj && obj.text) || null;
    this.thread = (obj && obj.thread) || null;
  }
}
