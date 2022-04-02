import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownService } from './dropdown.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() options: string[] = [];
  @Input() placeholder = 'options';
  @Input() selected = '';
  @Output() selectedChange = new EventEmitter<string>();
  isOpen = false;
  keyword = '';

  constructor(private service: DropdownService) { }

  open() {
    this.isOpen = true;
    this.service.showBackdrop(() => this.isOpen = false);
  }
  close() {
    this.isOpen = false;
    this.service.closeBackdrop();
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  select(selected: string) {
    this.selected = selected;
    this.selectedChange.emit(this.selected);
    this.close();
  }

  ngOnInit(): void {
  }

}
