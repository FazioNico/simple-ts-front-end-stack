/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-09-2016
*/

import { Routes } from "../../providers/routes";
import {homeSkeleton} from "./home-ui";

export class HomePage  {

  userPage  :any;
  pageTitle :string;
  routes:any;

  constructor(){
    this.pageTitle  = 'Hello world!';
    this.routes    = new Routes();
    this.routes.initUI(this.getPageSkeleton());
    this.loadEventUI()
  }

  loadEventUI(){
    let loginForm = document.getElementsByTagName("form")[0];
    loginForm.addEventListener("submit",  event => this.onLogin(event), false)
  }

  onLogin(event:Event){
    event.preventDefault()
    let validationInput:number = 0
    let formInput:Object = {}
    let form:any = document.forms[0].elements
    for (let i = 0; i < form.length; i++) {
      if(form[i].value){
        formInput[form[i].name] = form[i].value
        validationInput++
      }
    }
    if(validationInput === 2){
      console.info('form validation ok')
      let UserPage = this.routes.getPage('user')
      UserPage.setNavParams(formInput)
    }
  }

  getPageSkeleton(){
      // return page skeleton
      let data:any = {};
      data.pageTitle = this.pageTitle
      return  homeSkeleton(data);
  }
}
