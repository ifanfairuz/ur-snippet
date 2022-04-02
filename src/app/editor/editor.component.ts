import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONSTANT } from '../lib/editor.config';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public readonly CONSTANT = CONSTANT;
  showCopied = false;
  editorId = '';
  @Input()  value = '';
  @Output() valueChange = new EventEmitter<string>();

  static generateId() {
    const unique = parseInt(`${Date.now().valueOf()}${Math.random() * 100}`).toString(16);
    return `editor-${unique}`;
  }

  constructor(private service: EditorService) {
    this.editorId = EditorComponent.generateId();
  }

  ngOnInit(): void {
    this.service
    .initEditor(
      this.editorId,
      this.value,
      value => {
        this.value = value;
        this.valueChange.emit(this.value);
      }
    );
  }

}
