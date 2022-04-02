export interface Dependency {
  resolve<T>(): T|undefined|null
  url: string,
  css?: string[],
  addons?: string[],
  asyncJS?: string[],
  asyncCSS?: string[]
}
export type DepsList = 'ace'|'hljs'|'html2canvas';
export const hljsMainLanguages = [
  'javascript', 'typescript', 'bash', 'json', 'php', 'python', 'css',
  'dart', 'kotlin', 'sql', 'swift', 'markdown', 'ruby', 'go', 'java', 'cpp'
];
export const hljsOptionalLanguages = [
  '1c', 'abnf', 'accesslog', 'actionscript', 'ada', 'angelscript', 'apache',
  'applescript', 'arcade', 'arduino', 'armasm', 'asciidoc', 'aspectj', 'autohotkey',
  'autoit', 'avrasm', 'awk', 'axapta', 'basic', 'bnf', 'brainfuck', 'c', 'cal',
  'capnproto', 'ceylon', 'clean', 'clojure-repl', 'clojure', 'cmake', 'coffeescript',
  'coq', 'cos', 'crmsh', 'crystal', 'csharp', 'csp', 'd', 'delphi', 'diff', 'django',
  'dns', 'dockerfile', 'dos', 'dsconfig', 'dts', 'dust', 'ebnf', 'elixir', 'elm', 'erb',
  'erlang-repl', 'erlang', 'excel', 'fix', 'flix', 'fortran', 'fsharp', 'gams', 'gauss',
  'gcode', 'gherkin', 'glsl', 'gml', 'golo', 'gradle', 'graphql', 'groovy', 'haml',
  'handlebars','haskell', 'haxe', 'hsp', 'http', 'hy', 'inform7', 'ini', 'irpf90', 'isbl',
  'jboss-cli', 'julia-repl', 'julia', 'lasso', 'latex', 'ldif', 'leaf', 'less', 'lisp',
  'livecodeserver', 'livescript', 'llvm', 'lsl', 'lua', 'makefile', 'mathematica', 'matlab',
  'maxima', 'mel', 'mercury', 'mipsasm', 'mizar', 'mojolicious', 'monkey', 'moonscript',
  'n1ql', 'nestedtext', 'nginx', 'nim', 'nix', 'node-repl', 'nsis', 'objectivec', 'ocaml',
  'openscad', 'oxygene', 'parser3', 'perl', 'pf', 'pgsql', 'php-template', 'plaintext',
  'pony', 'powershell', 'processing', 'profile', 'prolog', 'properties', 'protobuf',
  'puppet', 'purebasic', 'python-repl', 'q', 'qml', 'r', 'reasonml', 'rib', 'roboconf',
  'routeros', 'rsl', 'ruleslanguage', 'rust', 'sas', 'scala', 'scheme', 'scilab', 'scss',
  'shell', 'smali', 'smalltalk', 'sml', 'sqf', 'stan', 'stata', 'step21', 'stylus', 'subunit',
  'taggerscript', 'tap', 'tcl', 'thrift', 'tp', 'twig', 'vala', 'vbnet', 'vbscript-html',
  'vbscript', 'verilog', 'vhdl', 'vim', 'wasm', 'wren', 'x86asm', 'xl', 'xml', 'xquery', 'yaml', 'zephir'
];
export const hljsLanguages = [...hljsMainLanguages, ...hljsOptionalLanguages];
export const hljsMainLanguagesUrl = hljsLanguageUrl(hljsMainLanguages);
export const hljsOptionalLanguagesUrl = hljsLanguageUrl(hljsOptionalLanguages);
export function hljsLanguageUrl<P extends (string|string[])>(lang: P) {
  if (typeof lang == 'string') return `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/languages/${lang}.min.js` as P;
  else return lang.map(l => `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/languages/${l}.min.js`) as P;
}

const deps: Record<DepsList, Dependency> = {
  ace: {
    resolve: () => {
      if ((window as any).ace)
      (window as any).ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/');
      return (window as any).ace;
    },
    url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.min.js'
  },
  hljs: {
    resolve: () => (window as any).hljs,
    url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js',
    css: ['https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/base16/material-darker.min.css'],
    addons: hljsMainLanguagesUrl
  },
  html2canvas: {
    resolve: () => (window as any).html2canvas,
    url: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
  }
}
export default deps;