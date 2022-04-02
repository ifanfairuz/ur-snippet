import { Injectable } from '@angular/core';
import { DepsService } from '../lib/deps.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private deps: DepsService) { }

  initEditor(elementId: string, value: string = "", setValue?: (value: string) => void) {
    return this.deps.load('ace').then(ace => {
      let editor = ace.edit(elementId);
      editor.setOptions({
        autoScrollEditorIntoView: true
      });
      editor.setTheme('ace/theme/merbivore');
      editor.renderer.setShowGutter(false);
      editor.renderer.setPadding(10);
      editor.renderer.setScrollMargin(10, 10);
      editor.session.setTabSize(2);
      editor.session.setMode('ace/mode/javascript');
      editor.session.setValue(value);
      if (setValue) {
        editor.session.on('change', () => {
          setValue(editor.session.getValue());
        });
      }
      return editor;
    });
  }

}
