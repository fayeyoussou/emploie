<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<main id="main-container">

                <!-- Page Content -->
                <div class="bg-image" style="background-image: url('assets/media/photos/photo34@2x.jpg');">
                    <div class="row mx-0 bg-black-op">
                        <div class="hero-static col-md-6 col-xl-8 d-none d-md-flex align-items-md-end">
                            <div class="p-30 invisible" data-toggle="appear">
                                <p class="font-size-h3 font-w600 text-white">
                                    Get Inspired and Create.
                                </p>
                                <p class="font-italic text-white-op">
                                    Copyright &copy; <span class="js-year-copy"></span>
                                </p>
                            </div>
                        </div>
                        <div class="hero-static col-md-6 col-xl-4 d-flex align-items-center bg-white" id="auth-win">
                            <div class="content content-full">
                                <!-- Header -->
                                <div class="px-30 py-10">
                                    <a class="link-effect font-w700" href="index.html">
                                        <i class="si si-fire"></i>
                                        <span class="font-size-xl text-primary-dark">code</span><span class="font-size-xl">base</span>
                                    </a>
                                    <h1 class="h3 font-w700 mt-30 mb-10">Welcome to Your Dashboard</h1>
                                    <h2 class="h5 font-w400 text-muted mb-0">Please sign in</h2>
                                </div>
                                <!-- END Header -->

                                <!-- Sign In Form -->
                                <!-- jQuery Validation functionality is initialized with .js-validation-signin class in js/pages/op_auth_signin.min.js which was auto compiled from _es6/pages/op_auth_signin.js -->
                                <!-- For more examples you can check out https://github.com/jzaefferer/jquery-validation -->
                                <form class="js-validation-signin px-30" action="be_pages_auth_all.html" method="post">
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="text" class="form-control" id="login" name="login">
                            <label for="login">Login</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="password" class="form-control" id="password" name="password">
                            <label for="password">Password</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" title= "login" class="btn btn-sm btn-hero btn-alt-primary">
                        <i class="si si-login mr-10"></i> Sign In
                    </button>
                    <div class="mt-30">
                        <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="register">
                            <i class="fa fa-plus mr-5"></i> Create Account
                        </a>
                        <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="op_auth_reminder2.html">
                            <i class="fa fa-warning mr-5"></i> Forgot Password
                        </a>
                    </div>
                </div>
            </form>
                                <!-- END Sign In Form -->
                            </div>
                        </div>
                    	
                    <!-- END THERE -->
                    </div>
                </div>
                <!-- END Page Content -->

            </main>