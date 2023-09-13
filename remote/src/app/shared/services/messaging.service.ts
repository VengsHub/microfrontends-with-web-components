import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  receiveMessages(): void {
    window.onmessage = (event) => {
      console.log('message received', event.data);
      this.sendMessage(event.data.toString());
    };
  }

  sendMessage(message: string): void {
    const frames: HTMLCollectionOf<HTMLIFrameElement> = document.getElementsByTagName('iframe');
    for (const frame of frames) {
      frame.contentWindow?.postMessage(message, '*');
    }
  }
}
