let i = 0;
function uuid(): number {
  return i++;
}

export class User {
  id: number;

  constructor(public name: string, public avatarSrc: string) {
    this.id = uuid();
  }
}

export class Thread {
  id: number;
  lastMessage!: Message;
  name: string;
  avatarSrc: string;

  // 必须先声明所有必填参数再声明可选参数
  constructor(name: string, avatarSrc: string, id?: number) {
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
