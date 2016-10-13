import { HomePage } from "../pages/home/home";
import { UserPage } from "../pages/user/user";

export class Routes {

    appBody:any;
    routes:Object               = {}
    HOME: string                = "home"
    USER: string                = "user"

    constructor(){
      this.appBody = document.getElementsByTagName("app")[0];
      this.routes[this.HOME]    = HomePage
      this.routes[this.USER]    = UserPage
    }

    getPage(id:string){
      console.info('load ', id, 'Page')
      let page = this.routes[id];
      return new page();
    }

    getRootPage(){
      let     root = this.getPage(this.HOME)
      return  root
    }

    initUI(pageSkeleton:any){
        // remove all section before display UI
        if(document.getElementsByTagName("section")[0]){
          document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
        }
        // add page skeleton in app body
        this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    }
}
