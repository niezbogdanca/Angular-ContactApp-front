import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  // podciągnięta klasa ActivatedRoute ma wł. snapshot która odnosi się do paska adresowego. Wł. ta wyciąga id, dlatego że w app-routing mamy podane że ma to być id: 'contact-add/:id
  protected id = this.route.snapshot.params['id'];

  protected addForm: any=this.fb.group({});

  private sub = new Subscription;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}
  
  ngOnInit(): void {

    if(this.id) {
      this.getContact()
    }

    const surnamePattern = '^[A-ż]{3,20}$';
    const firstNamePattern = '^[A-ż]{3,20}$';
    const phoneNumberPattern = '^[0-9]{9}$';
     this.addForm = this.fb.group({
      surname: ['', [Validators.required, Validators.pattern(surnamePattern)]],
      firstName: ['',[Validators.required, Validators.pattern(firstNamePattern)]],
      // phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneNumberPattern)]],
  
    });
  }

  saveContact(): void {
    const mySub = this.contactsService.addContact(this.addForm.value).subscribe(res => {
      this.router.navigate(['/contacts-list']);
    });
    this.sub.add(mySub);
  }

  getContact(): void{
    const mySub = this.contactsService.getContact(this.id).subscribe(res => {
      console.log(res);
      this.addForm.patchValue({
        surname: res[0].surname,
        firstName: res[0].firstName,
        phoneNumber: res[0].phoneNumber,
      })
    });
    this.sub.add(mySub);
  }

  modContact(): void {
    const mySub = this.contactsService.updateContact(this.id, this.addForm.value).subscribe(res => {
      this.router.navigate(['/contacts-list']);
    });
    this.sub.add(mySub);
  }

  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }

}

