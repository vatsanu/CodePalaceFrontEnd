import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
// import { } from '../../../core/models/'
import { OnDestroy, Input, Output, EventEmitter, ViewChild, wtfStartTimeRange } from '@angular/core';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';
import {HttpService } from '../../services/http.service';
@Component({
  selector: 'app-createnewproject',
  templateUrl: './createnewproject.component.html',
  styleUrls: ['./createnewproject.component.scss']
})
export class CreatenewprojectComponent implements OnInit {
  projectForm: FormGroup;
  formSubmit : boolean ;
  @ViewChild('imageUpload') imageUpload: ImageUploadComponent;
  categories = [{id:1, name: "Global Warming"} , {id:2, name: "Air Purification" }, {id:3, name: "Climate Change" }, {id:4, name: "Non For Profit"}];
  project: any;
  constructor(
    private fb: FormBuilder, private httpService: HttpService 
  ) {
    // this.fetchCategories();
  }
  ngOnInit() {
    this.projectForm = this.fb.group({
      title: ['',  Validators.required],
      pledged_amount: ['',Validators.required],
      category_id: ['',Validators.required] ,
      des: ['',Validators.required]
    });
  }
  submitProject() {
    // this.setStartDate();
     this.formSubmit = true;
     this.httpService.postdata("/api/v1/submit", this.projectForm.value).subscribe((res) => {
        console.log(res);
     });
    
   }
   get title(){
     return this.projectForm.get('title');
   }
   get pledged_amount(){
    return this.projectForm.get('pledged_amount');
  }
  uploadImage() {
    this.imageUpload.showImageBrowseDlg();
  }

  setImageData(image) {
    (<FormArray>this.projectForm.get('images_data')).push(
      this.fb.control(image)
    );
  }
  getPictures() {
    return (<FormArray>this.projectForm.get('pictures_attributes')).value;
  }

  removeImageData(i) {
    (<FormArray>this.projectForm.get('images_data')).removeAt(i);
  }
}
