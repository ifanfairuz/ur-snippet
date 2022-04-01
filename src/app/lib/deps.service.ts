import { Injectable } from '@angular/core';
import deps, { Dependency, DepsList } from './deps.list';

let loader: Partial<Record<DepsList, Promise<any>>> = {}

@Injectable({
  providedIn: 'root'
})
export class DepsService {

  constructor() { }

  private createLoader(dep: Dependency) {
    return new Promise((resolve, reject) => {
      let element = document.createElement('script');
      element.src = dep.url;
      element.type = 'text/javascript';
      element.onload = () => resolve(dep.resolve());
      element.onabort = () => reject();
      element.onerror = (e) => reject(e);
      document.getElementsByTagName("body")[0].appendChild(element);
    });
  }

  load(name: DepsList) {
    const dep = deps[name];
    loader[name] = loader[name] ?? this.createLoader(dep);
    return loader[name]!;
  }
}
