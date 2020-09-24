import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  serviceRequestDetails: any
  scheduledDate: any
  calendarDate: any
  formattedDate: any
  serviceRequestform: FormGroup
  isSubmitted: boolean = false;
  showImagePreview: boolean


  Type: any = ['Maintenance', 'Installation', 'Replace']

  SubType: any = ['Plant Regular Checkup', 'Plant Service']

  PaymentStatus: any = ['Paid', 'Unpaid', 'Pending']

  AssignedTo: any = ['Tech11', 'Tech12']

  constructor(private formBuilder: FormBuilder, @Inject(DataService) private _dataService: DataService,
    private cd: ChangeDetectorRef) { }

  public imagePath: any;
  imageUrl: any;
  public message: string;

  preview(imageInput: any) {

    const file: File = imageInput.files[0]

    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = event => {
      this.imageUrl = reader.result;
      this.showImagePreview = true;
    };

  }

  slectImage(e) {
    e.preventDefault();
    document.getElementById("upload").click()
  }

  hideImagePreview(e) {
    e.preventDefault();
    this.showImagePreview = false;
  }

  ngOnInit(): void {
    this._dataService.getServiceRequestDetails().subscribe(
      (response: any) => {
        this.serviceRequestDetails = response.serviceRequestDetails
        this.scheduledDate = this.serviceRequestDetails.scheduledDate
        const date = new Date(this.scheduledDate)
        this.calendarDate = new FormControl(date)
        const month = date.toLocaleString('default', { month: 'short' })
        this.formattedDate = date.getDate() + ' ' + month + ' ' + date.getFullYear()
        this.setFormControlValues()

      },
      (error: any) => {
        console.log("==error==", error);
      }
    );

    this.serviceRequestform = this.formBuilder.group({
      type: ['', [Validators.required]],
      subType: ['', [Validators.required]],
      paymentStatus: ['', [Validators.required]],
      assignedTo: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })


  }

  setFormControlValues() {
    this.type.setValue(this.serviceRequestDetails.type, {
      onlySelf: true
    })

    this.paymentStatus.setValue(this.serviceRequestDetails.paymentStatus, {
      onlySelf: true
    })

    this.assignedTo.setValue(this.serviceRequestDetails.assignedTo, {
      onlySelf: true
    })

    this.description.setValue(this.serviceRequestDetails.description, {
      onlySelf: true
    })

    this.cd.detectChanges();
  }

  get type() {
    return this.serviceRequestform.get('type');
  }

  get subType() {
    return this.serviceRequestform.get('subType');
  }

  get paymentStatus() {
    return this.serviceRequestform.get('paymentStatus');
  }

  get assignedTo() {
    return this.serviceRequestform.get('assignedTo');
  }

  get description() {
    return this.serviceRequestform.get('description');
  }

  changeType(e) {

    this.type.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeSubType(e) {

    this.subType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changePaymentStatus(e) {
    this.paymentStatus.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeAssignedTo(e) {

    this.assignedTo.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.serviceRequestform.valid) {
      return false;
    }
  }

}
