import { Component } from '@angular/core';
import { ThreadsService } from '../threads.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-threads',
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
}
