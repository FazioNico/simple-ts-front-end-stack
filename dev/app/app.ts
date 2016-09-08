/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 07-09-2016
*/

import { Routes } from "./providers/routes";

declare var $: any;

class MyApp {
  routes:any;

  constructor(){
  }

  start(){
    this.routes = new Routes()
    // remove Loading... before display UI
    if(document.getElementsByTagName("app")[0].parentNode){
      document.getElementsByTagName("app")[0].innerHTML = '';
    }
    // init HomePage
    this.routes.getRootPage()
    // jQuery intergration
    console.info('jQuery working ->', $('body'))
  }

}

let myApp = new MyApp();
myApp.start();
