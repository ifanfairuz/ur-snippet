import { Injectable } from '@angular/core';
import deps, { Dependency, DepsList } from './deps.list';

let loader: Partial<Record<DepsList, Promise<any>>> = {}

@Injectable({
  providedIn: 'root'
})
export class DepsService {

  constructor() { }

  private createLoaderJS(dep: Dependency|string) {
    return new Promise((resolve, reject) => {
      let element = document.createElement('script');
      element.src = typeof dep === 'string' ? dep : dep.url;
      element.type = 'text/javascript';
      element.onload = async () => {
        if (typeof dep != 'string' && dep.addons) {
          for await (const add of dep.addons) {
            await this.createLoaderJS(add);
          }
        }
        resolve(typeof dep === 'string' ? dep : dep.resolve());
      }
      element.onabort = () => reject();
      element.onerror = (e) => reject(e);
      document.getElementsByTagName("body")[0].appendChild(element);
    });
  }

  private createLoaderCSS(dep: Dependency) {
    if (!dep.css) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      let element = document.createElement('link');
      element.href = dep.css!;
      element.rel = 'stylesheet';
      element.type = 'text/css';
      element.onload = async () => resolve();
      element.onabort = () => reject();
      element.onerror = (e) => reject(e);
      document.getElementsByTagName("body")[0].appendChild(element);
    });
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
}
