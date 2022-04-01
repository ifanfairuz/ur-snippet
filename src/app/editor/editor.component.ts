import { Component, OnInit } from '@angular/core';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {

  elementId: string = '';

  constructor(private service: EditorService) {
    const unique = parseInt(`${Date.now().valueOf()}${Math.floor(Math.random() * 100)}`).toString(16);
    this.elementId = `editor-${unique}`;
  }

  ngOnInit(): void {
    this.service.initEditor(this.elementId);
  }

}
