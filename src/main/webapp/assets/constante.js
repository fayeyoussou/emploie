export class Constante {
   static pathfull = "http://localhost:8080/emploie/"
   static registerContent = `<div class="content content-full">
   <!-- Header -->
   <div class="px-30 py-10">
       <a class="link-effect font-w700" href="index.html">
           <i class="si si-fire"></i>
           <span class="font-size-xl text-primary-dark">code</span><span class="font-size-xl">base</span>
       </a>
       <h1 class="h3 font-w700 mt-30 mb-10">Create New Account</h1>
       <h2 class="h5 font-w400 text-muted mb-0">Please add your details</h2>
   </div>
   <!-- END Header -->

   <!-- Sign Up Form -->
   <!-- jQuery Validation functionality is initialized with .js-validation-signup class in js/pages/op_auth_signup.min.js which was auto compiled from _es6/pages/op_auth_signup.js -->
   <!-- For more examples you can check out https://github.com/jzaefferer/jquery-validation -->
   <form class="js-validation-signup px-30" action="be_pages_auth_all.html" method="post">
       <div class="form-group row">
           <div class="col-12">
               <div class="form-material floating">
                   <input type="text" class="form-control" id="signup-username" name="signup-username">
                   <label for="signup-username">Username</label>
               </div>
           </div>
       </div>
       <div class="form-group row">
           <div class="col-12">
               <div class="form-material floating">
                   <input type="email" class="form-control" id="signup-email" name="signup-email">
                   <label for="signup-email">Email</label>
               </div>
           </div>
       </div>
       <div class="form-group row">
           <div class="col-12">
               <div class="form-material floating">
                   <input type="password" class="form-control" id="signup-password" name="signup-password">
                   <label for="signup-password">Password</label>
               </div>
           </div>
       </div>
       <div class="form-group row">
           <div class="col-12">
               <div class="form-material floating">
                   <input type="password" class="form-control" id="signup-password-confirm" name="signup-password-confirm">
                   <label for="signup-password-confirm">Password Confirmation</label>
               </div>
           </div>
       </div>
       <div class="form-group row">
           <div class="col-12">
               <div class="custom-control custom-checkbox">
                   <input type="checkbox" class="custom-control-input" id="signup-terms" name="signup-terms">
                   <label class="custom-control-label" for="signup-terms">I agree to Terms &amp; Conditions</label>
               </div>
           </div>
       </div>
       <div class="form-group">
           <button type="submit" class="btn btn-sm btn-hero btn-alt-success">
               <i class="fa fa-plus mr-10"></i> Create Account
           </button>
           <div class="mt-30">
               <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="#" data-toggle="modal" data-target="#modal-terms">
                   <i class="fa fa-book text-muted mr-5"></i> Read Terms
               </a>
               <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="op_auth_signin2.html">
                   <i class="fa fa-user text-muted mr-5"></i> Sign In
               </a>
           </div>
       </div>
   </form>
   <!-- END Sign Up Form -->
</div>`
   static loginContent = `<div class="content content-full">
   
   <div class="px-30 py-10">
       <a class="link-effect font-w700" href="index.html">
           <i class="si si-fire"></i>
           <span class="font-size-xl text-primary-dark">code</span><span class="font-size-xl">base</span>
       </a>
       <h1 class="h3 font-w700 mt-30 mb-10">Welcome to Your Dashboard</h1>
       <h2 class="h5 font-w400 text-muted mb-0">Please sign in</h2>
   </div>
   
   <form class="js-validation-signin px-30" action="be_pages_auth_all.html" method="post">
       <div class="form-group row">
           <div class="col-12">
               <div class="form-material floating">
                   <input type="text" class="form-control" id="login-username" name="login-username">
                   <label for="login-username">Username</label>
               </div>
           </div>
       </div>
       <div class="form-group row">
           <div class="col-12">
               <div class="form-material floating">
                   <input type="password" class="form-control" id="login-password" name="login-password">
                   <label for="login-password">Password</label>
               </div>
           </div>
       </div>
       <div class="form-group row">
           <div class="col-12">
               <div class="custom-control custom-checkbox">
                   <input type="checkbox" class="custom-control-input" id="login-remember-me" name="login-remember-me">
                   <label class="custom-control-label" for="login-remember-me">Remember Me</label>
               </div>
           </div>
       </div>
       <div class="form-group">
           <button type="submit" class="btn btn-sm btn-hero btn-alt-primary">
               <i class="si si-login mr-10"></i> Sign In
           </button>
           <div class="mt-30">
               <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="op_auth_signup2.html">
                   <i class="fa fa-plus mr-5"></i> Create Account
               </a>
               <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="op_auth_reminder2.html">
                   <i class="fa fa-warning mr-5"></i> Forgot Password
               </a>
           </div>
       </div>
   </form>
   <!-- END Sign In Form -->
</div>`
}