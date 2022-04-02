import { Component } from '@angular/core';
import { DropdownService } from './form/dropdown/dropdown.service';
import { CONSTANT } from './lib/editor.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  text: string;
  get backdropShow() {
    return this.dropdownService.backdropShow;
  }

  constructor(private dropdownService: DropdownService) {
    this.text =
    `// initial variable\n`+
    `const user = {\n`+
    `  name: 'tono',\n`+
    `  age: 19,\n`+
    `  ...\n`+
    `}\n`+
    `\n${CONSTANT.NEW_WINDOW}\n\n`+
    `// introduce user\n`+
    `function introduce(user) {\n`+
    `  console.log('Hello, my name is %s', user.name);\n`+
    `}`
  }

  closeBackdrop() {
    if (this.dropdownService.backdropShow) {
      this.dropdownService.closeBackdrop();
    }
  }

}
