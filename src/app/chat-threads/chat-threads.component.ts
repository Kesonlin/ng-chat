import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Observable } from 'rxjs';
import { Thread } from '../model';

@Component({
  selector: 'app-chat-threads',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.scss'],
})
export class ChatThreadsComponent {
  threads: Observable<any>;

  constructor(private threadService: ThreadsService) {
    this.threads = threadService.orderedThreads;
    console.log(this.threads);

    this.threads.subscribe((t) => {
      console.log(t);
    });
  }

  setCurrentThread(thread: Thread): void {
    this.threadService.setCurrentThread(thread);
  }
}
