/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-09-2016
*/

export function userSkeleton(data:any){
      // return page skeleton
      return  `
        <section class="container">
          <h1>${data.pageTitle} ${data.formData.email} !</h1>
        </section>
      `;
  }
