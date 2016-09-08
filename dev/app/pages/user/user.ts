/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-09-2016
*/

import { Routes }     from "../../providers/routes";
import {userSkeleton} from "./user-ui";

export class UserPage {

  formData  :any;
  pageTitle :string;
  routes    :any;

  constructor(){
    this.pageTitle  = "Hello";
    this.routes     = new Routes();
  }

  setNavParams(formInput:any){
    this.formData = formInput
    this.routes.initUI(this.getPageSkeleton());
  }

  getPageSkeleton(){
      // return page skeleton
      let data:any        = {};
          data.pageTitle  = this.pageTitle;
          data.formData   = this.formData;
      return  userSkeleton(data);
  }
}
