/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   07-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-09-2016
*/

export function homeSkeleton(data:any){
      // return page skeleton
      return  `
        <section class="container">
          <h1>${data.pageTitle}</h1>
          <form>
            <p>
              <label for="email">Email:</label> <input type="email" name="email" value="" placeholder="votreemail.ch"  /><br/>
              <label for="password">Password:</label> <input type="password" name="password" value=""  /><br/>
              <button>Login</button>
            </p>
          </form>
        </section>
      `;
  }
