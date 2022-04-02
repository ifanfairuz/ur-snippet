import { Injectable } from '@angular/core';
import { DepsService } from '../lib/deps.service';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  private readonly mime = 'image/jpg';

  constructor(private deps: DepsService) { }

  async export(el: HTMLElement) {
    try {
      const html2canvas = await this.deps.load('html2canvas');
      const element = el.cloneNode(true) as HTMLDivElement;
      element.style.transform = 'scale(1)';
      element.style.position = 'absolute';
      element.style.bottom = '100%';
      element.style.right = '100%';
      document.body.appendChild(element);
      return new Promise<HTMLCanvasElement>((resolve, reject) => {
        setTimeout(async () => {
          try {
            const canvas: HTMLCanvasElement = await html2canvas(el, {
              width: 540,
              height: 540,
              scale: 2
            });
            element.remove();
            this.download(canvas.toDataURL(this.mime), 'ur-snipper-post.jpg');
            return resolve(canvas);
          } catch (error) {
            return Promise.reject(error);
          }
        }, 1);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  download(url: string, filename: string) {
    var tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = url;
    tempLink.setAttribute('download', filename);
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    setTimeout(function() {
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
    }, 200)
  }

}
