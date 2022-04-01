import { Injectable } from '@angular/core';
import { DepsService } from '../lib/deps.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private deps: DepsService) { }

  initEditor(elementId: string) {
    return this.deps.load('ace').then(ace => {
      var editor = ace.edit(elementId);
      editor.setTheme('ace/theme/monokai');
      editor.session.setMode('ace/mode/javascript');
    });
  }

}
