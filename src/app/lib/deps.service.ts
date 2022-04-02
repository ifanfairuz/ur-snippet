import { Injectable } from '@angular/core';
import deps, { Dependency, DepsList, hljsLanguageUrl } from './deps.list';

let loader: Partial<Record<DepsList, Promise<any>>> = {}
let loader_deps: Record<string, Promise<any>> = {}
let loaded_deps: Record<string, boolean> = {}

@Injectable({
  providedIn: 'root'
})
export class DepsService {

  constructor() { }

  private createLoaderJS(dep: Dependency|string) {
    let p = loader_deps[typeof dep === 'string' ? dep : dep.url];
    p = p ?? new Promise((resolve, reject) => {
      let element = document.createElement('script');
      element.src = typeof dep === 'string' ? dep : dep.url;
      element.type = 'text/javascript';
      element.crossOrigin = 'anonymous'
      element.referrerPolicy = 'no-referrer'
      if (typeof dep != 'string') {
        element.onload = () => {
          loaded_deps[dep.url] = true;
          if (dep.addons) {
            Promise.all(dep.addons.map(url => this.createLoaderJS(url)))
            .finally(() => resolve(typeof dep === 'string' ? dep : dep.resolve()));
            if (dep.asyncJS) for (const add of dep.asyncJS) {
              this.createLoaderJS(add);
            }
          } else {
            if (dep.asyncJS) for (const add of dep.asyncJS) {
              this.createLoaderJS(add);
            }
            resolve(typeof dep === 'string' ? dep : dep.resolve());
          }
        }
      } else {
        element.onload = () => {
          loaded_deps[dep] = true;
          resolve(dep);
        }
      }
      
      element.onabort = () => reject();
      element.onerror = (e) => reject(e);
      document.getElementsByTagName("body")[0].appendChild(element);
    });
    loader_deps[typeof dep === 'string' ? dep : dep.url] = p;
    return p;
  }

  private createLoaderCSS(dep: Dependency) {
    if (!dep.css) return Promise.resolve();
    return Promise.all(dep.css.map(url => {
      let p = loader_deps[url];
      p = p ?? new Promise<void>((resolve, reject) => {
        let element = document.createElement('link');
        element.href = url;
        element.rel = 'stylesheet';
        element.type = 'text/css';
        element.onload = async () => {
          loaded_deps[url] = true;
          resolve();
        };
        element.onabort = () => reject();
        element.onerror = (e) => reject(e);
        document.getElementsByTagName("body")[0].appendChild(element);
      });
      loader_deps[url] = p;
      return p;
    }))
  }

  private createLoader(dep: Dependency) {
    return Promise.all([this.createLoaderJS(dep), this.createLoaderCSS(dep)])
    .then(res => res[0]);
  }

  load(name: DepsList) {
    const dep = deps[name];
    loader[name] = loader[name] ?? this.createLoader(dep);
    return loader[name]!;
  }

  loaded(url: string) {
    return loader_deps[url];
  }

  async highlightJsLangLoad(lang: string) {
    await this.load('hljs');
    await this.createLoaderJS(hljsLanguageUrl(lang));
    return;
  }
  
  highlightJsLangLoaded(lang: string) {
    return !!loaded_deps[hljsLanguageUrl(lang)];
  }

}
