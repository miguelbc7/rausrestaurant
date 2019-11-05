import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { TagsHelper } from '../../helpers/tags-helper';
// import { MustMatch } from '../../validators/must-match.validator';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.page.html',
  styleUrls: ['./register1.page.scss'],
})
export class Register1Page implements OnInit {

  public register1: FormGroup;
  form: FormGroup;

  constructor( public formBuilder: FormBuilder, private router: Router) {

    this.register1 = this.formBuilder.group({
      code: [],
      tags: [[]],
    });

    this.register1 = formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      lastname: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      dni: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      birthdate: ['', Validators.compose([
        Validators.required,
      ])],
      responsable: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      code: ['', Validators.compose([
        Validators.required,
      ])],
      tags: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')
      ])],
      confirmpassword: ['', Validators.compose([
        Validators.required,
      ])],
  },
  // {
  //   validator: MustMatch('password', 'confirmPassword')
  // }
);
  }




  validation_messages = {
    'name': [
        { type: 'required', message: 'Debe ingresar un nombre.' },
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      'lastname': [
        { type: 'required', message: 'Debe ingresar un apellido.' },
        { type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      ],
      'dni': [
        { type: 'required', message: 'Debe ingresar un DNI.' },
        { type: 'maxlength', message: 'Debe ser menor de 20 caracteres.' }
      ],
      'birthdate': [
        { type: 'required', message: 'Debe ingresar una fecha de nacimiento.' },
      ]
    }

  onSubmit(values){
    console.log(values);
    this.router.navigate(["/welcome"]);
  }

  ngOnInit() {
  }

  // upload(form) {
  //   console.log(register1.tags);
  //   register1.tags = this.tagArrayToString(register1.tags);
  //   console.log(register1.tags);
  // }

  tagArrayToString(tagArray: string[]): string {
    if (Array.isArray(tagArray) && tagArray.length > 0) {
      const tags = tagArray.map((e: any) => `[${e.value}]`);
      const tagString = tags.join();
      return tagString;
    } else {
      return '';
    }
  }

}