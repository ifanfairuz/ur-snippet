import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CONSTANT } from '../lib/editor.config';
import { ExporterService } from './exporter.service';
import deps, { hljsLanguages, hljsMainLanguages } from '../lib/deps.list';
import { DepsService } from '../lib/deps.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  public readonly mainLanguages = hljsMainLanguages;
  public readonly languages = hljsLanguages;

  @ViewChild('preview') previewElement!: ElementRef<HTMLDivElement>;
  @Input() value = '';
  backgroundClass = 'gradient-1';
  values: string[] = [''];
  language = '';
  oldLanguage = '';
  transformStyle = `none`;
  loadingGenerate = false;
  readyHlJs = false;
  readyHlJsLang: Record<string, boolean> = {}
  
  get ready () {
    return this.readyHlJs && (
      this.language && this.language != '' ?
      this.readyHlJsLang[this.language] :
      true
    );
  }

  constructor(private deps: DepsService, private exporter: ExporterService) { }

  renderPreview() {
    if (this.ready) {
      const hljs = deps.hljs.resolve<any>();
      const values = this.value.split(CONSTANT.NEW_WINDOW).map(v => v.replace(/^\s+|\s+$/g, '')).filter(v => v);
      this.values = values.map(v => hljs.highlightAuto(v, this.language ? [this.language] : this.mainLanguages).value);
    }
  }

  setBackground(i: number) {
    this.backgroundClass = `gradient-${i}`;
  }

  exportImage() {
    this.loadingGenerate = true;
    this.exporter.export(this.previewElement.nativeElement)
    .finally(() => this.loadingGenerate = false);
  }

  ngOnInit(): void {
    this.deps.load('hljs')
    .then(() => {
      this.readyHlJs = true;
      this.renderPreview();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) this.renderPreview();
  }

  ngDoCheck() {
    if (this.language !== this.oldLanguage) {
      if (this.language != '') {
        this.readyHlJsLang[this.language] = this.deps.highlightJsLangLoaded(this.language);
        this.deps.highlightJsLangLoad(this.language)
        .finally(() => {
          this.readyHlJsLang[this.language] = true;
          this.renderPreview();
        });
      }
      this.oldLanguage = this.language;
    }
  }

}
