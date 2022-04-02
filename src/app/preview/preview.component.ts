import hljs from 'highlight.js';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CONSTANT } from '../lib/editor.config';
import { ExporterService } from './exporter.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @ViewChild('preview') previewElement!: ElementRef<HTMLDivElement>;
  @Input() value = '';
  backgroundClass = 'gradient-1';
  values: string[] = [''];
  languages: string[] = [];
  language = '';
  transformStyle = `none`;
  loadingGenerate = false;

  constructor(private exporter: ExporterService) {
    this.languages = hljs.listLanguages();
  }

  renderPreview() {
    const values = this.value.split(CONSTANT.NEW_WINDOW).map(v => v.replace(/^\s+|\s+$/g, '')).filter(v => v);
    this.values = values.map(v => hljs.highlightAuto(v, [
      'javascript', 'typescript', 'bash', 'json', 'php',
      'python', 'css', 'html', 'dart', 'kotlin', 'sql',
      'swift', 'markdown', 'ruby', 'go', 'java', 'cpp'
    ]).value);
  }

  setBackground(i: number) {
    this.backgroundClass = `gradient-${i}`;
  }

  exportImage() {
    this.loadingGenerate = true;
    this.exporter.export(this.previewElement.nativeElement)
    .finally(() => this.loadingGenerate = false);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) this.renderPreview();
  }

}
