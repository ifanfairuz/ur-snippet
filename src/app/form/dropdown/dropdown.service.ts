import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  backdropShow = false;
  backdropEmitter = new EventEmitter();

  constructor() { }

  showBackdrop(listener?: () => void) {
    this.backdropShow = true;
    if (listener) {
      this.backdropEmitter.addListener('close', listener);
    }
  }

  closeBackdrop() {
    this.backdropShow = false;
    this.backdropEmitter.emit('close');
    this.backdropEmitter.removeAllListeners('close');
  }

}
