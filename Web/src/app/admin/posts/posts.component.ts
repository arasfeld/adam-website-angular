import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../admin.service';

@Component({
  selector: 'admin-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postForm: FormGroup;
  isRequesting: boolean;
  imgSrc: string;
  submitted: boolean = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      file: ['']
    });
    this.onChanges();
  }

  onChanges(): void {
    this.postForm.controls['file'].valueChanges.subscribe(val => {
      if (val && val.files && val.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = () => this.imgSrc = fileReader.result;
        fileReader.readAsDataURL(val.files[0]);
      }
      else {
        this.imgSrc = null;
      }
    });
  }

  submit(): void {
    this.submitted = true;
    this.isRequesting = true;
    
  }
}