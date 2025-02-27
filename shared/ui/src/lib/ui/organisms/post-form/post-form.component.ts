import { Component, EventEmitter, Output } from '@angular/core';
import { TextAreaComponent } from '../../atoms/text-area/text-area.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  imports: [TextAreaComponent, ButtonComponent, ReactiveFormsModule],
  selector: 'lib-post-form',
  template: `
    <form [formGroup]="postForm" class="mb-6 px-4" (ngSubmit)="onSubmit()">
      <lib-text-area-field
        id="postBox"
        [rows]="6"
        placeholder="Write a post..."
        [control]="postBoxControl"
        [error]="postBoxControl.invalid ? 'Empty posts are not allowed' : ''"
      />
      <lib-button label="Publish post" />
    </form>
  `,
})
export class PostFormComponent {
  @Output() publishPost = new EventEmitter<{ postBox: string }>();

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      postBox: ['', [Validators.required]],
    });
  }

  get postBoxControl(): FormControl {
    return this.postForm.get('postBox') as FormControl;
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.publishPost.emit(this.postForm.value);
    }
  }
}
