import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  private readonly mime = 'image/jpg';

  constructor() { }

  export(el: HTMLElement) {
    try {
      return new Promise((resolve, reject) => {
        const oldTransform = el.style.transform;
        el.style.transform = 'scale(2)';
        html2canvas(el, {
          width: 1080,
          height: 1080,
          windowWidth: 1080,
          windowHeight: 1080
        })
        .then(canvas => {
          el.style.transform = oldTransform;
          this.download(canvas.toDataURL(this.mime), 'ur-snipper-post.jpg');
          resolve(canvas);
        })
        .catch(err => reject(err));
      })
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
