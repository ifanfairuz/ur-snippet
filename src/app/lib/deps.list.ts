export interface Dependency {
  resolve<T>(): T|undefined|null
  url: string,
  css?: string,
  addons?: string[]
}
export type DepsList = 'ace';
const deps: Record<DepsList, Dependency> = {
  ace: {
    resolve: () => {
      if ((window as any).ace)
      (window as any).ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/');
      return (window as any).ace;
    },
    url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.min.js'
  }
}
export default deps;