import { Constante } from "./constante.js";

export class UrlUpdater {

    constructor(button, notification) {
        this.button = button;

        this.notification = notification;
        // console.log(this.button);
        button.urlUpdater = this;
        this.checkPath();
    }
    display = null;

    update(element = null) {
        const links = element == null ? document.getElementsByTagName("a") : element.getElementsByTagName("a");
        if (links != null) {
            for (const element of links) {
                element.addEventListener("click", this.handleClick.bind(this));
            }
        }
    }
    async checkPath (pathName = window.location.pathname,recharge =true,isSwitch = true){
		let isLogin = await this.isLogin();
		//console.log("connecte :",isLogin)
		//console.log("pathind :",pathName.indexOf("auth"))
        
		if(!isLogin && pathName.indexOf("auth")==-1){
			if(recharge)this.loadPage("/emploie/auth",true)
            setTimeout(()=>{
                this.notification.showNotification(`Vous ne pouvez pas acceder a ${pathName} car vous n'etes pas connecte.`)
            },4000)
            
		}else if(isLogin && pathName.indexOf("auth")>= 0 ){
			if(recharge)this.loadPage("/emploie",true)
            setTimeout(()=>{
                this.showNotification("Vous ne pouvez pas acceder a auth car vous etes deja connecte.")
            },4000)
            
		} else if (pathName != window.location.pathname){
            this.loadPage(pathName,isSwitch)
        }
		this.update()
	}
    switchLoginRegister(href) {

        let main = document.querySelector(`#auth-win`)


        main.classList.add("js-animation-object", "animated", "fadeOutRight")
        if (href == 'login') {
            main.innerHTML = `<div class="content content-full">
   
            <div class="px-30 py-10">
                <a class="link-effect font-w700" href="index.html">
                    <i class="si si-fire"></i>
                    <span class="font-size-xl text-primary-dark">code</span><span class="font-size-xl">base</span>
                </a>
                <h1 class="h3 font-w700 mt-30 mb-10">Welcome Job Emploie</h1>
                <h2 class="h5 font-w400 text-muted mb-0">Ajouter Votre CV</h2>
            </div>
            
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
        } else {
            main.innerHTML = `<div class="content content-full">
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
                            <input type="text" class="form-control" id="prenom" name="prenom">
                            <label for="prenom">prenom</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="text" class="form-control" id="nom" name="nom">
                            <label for="nom">nom</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="number" class="form-control" id="age" name="age">
                            <label for="age">age</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="text" class="form-control" id="niveau" name="niveau">
                            <label for="niveau">niveau</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="text" class="form-control" id="title" name="title">
                            <label for="title">title</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="text" class="form-control" id="telephone" name="telephone">
                            <label for="telephone">telephone</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material">
                            <textarea class="form-control" id="experiences" name="experiences" rows="8" placeholder="Ajouter l'experience"></textarea>
                            <label for="experiences">Experiences</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="email" class="form-control" id="Email" name="email">
                            <label for="Email">Email</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="email" class="form-control" id="login" name="login">
                            <label for="login">login</label>
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
                <div class="form-group row">
                    <div class="col-12">
                        <div class="form-material floating">
                            <input type="password" class="form-control" id="confirm" name="confirm">
                            <label for="confirm">Password Confirmation</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <button type="submit"  title= "register" class="btn btn-sm btn-hero btn-alt-success">
                        <i class="fa fa-plus mr-10"></i> Create Account
                    </button>
                    <div class="mt-30">
                        <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="#" data-toggle="modal" data-target="#modal-terms">
                            <i class="fa fa-book text-muted mr-5"></i> Read Terms
                        </a>
                        <a class="link-effect text-muted mr-10 mb-5 d-inline-block" href="register" id="register-link">
                            <i class="fa fa-user text-muted mr-5"></i> Sign In
                        </a>
                    </div>
                </div>
            </form>
            <!-- END Sign Up Form -->
         </div>`
        }
        this.update(main)
        this.button.handleButton(main)
        setTimeout(function () {
            main.classList.remove("js-animation-object", "animated", "fadeOutRight")
            main.classList.add("js-animation-object", "animated", "fadeInRight")

            setTimeout(function () {
                main.classList.remove("js-animation-object", "animated", "fadeInRight")
            }, 2000)
        }, 1000)

    }
    async isLogin(){
        const response = await fetch(Constante.pathfull+"auth/islogin");
        const body = await response.json()
        return body["result"]
    }
    async handleClick(event, hrefDirect = false) {
        let href
        this.checkPath(href)
        if (hrefDirect) {
            href = event
        }
        else {
            console.log("handleClick", event);
            event.preventDefault();
            let targetLink = event.target;
            while (targetLink.tagName !== "A") {
                targetLink = targetLink.parentElement;
            }
            href = targetLink.getAttribute("href");
        }
        if (href == "login" || href == "register") {
            this.switchLoginRegister(href);
            console.log("voila", href);
        }
        else if(await this.isLogin()){
            let pathName = window.location.pathname
            let pathnamearr = pathName.replace(/^\/+|\/+$/g, '').split("/");
            let hrefarr = href.replace(/^\/+|\/+$/g, '').split("/");
            let isSwitch = false
            if ((pathnamearr.length > 1 && pathnamearr[1] === 'auth') || (hrefarr.length > 1 && hrefarr[1] === 'auth')) {
                isSwitch = true;
            }
            if (!href || href == "#" || (
                pathnamearr.length === hrefarr.length &&
                pathnamearr.every((value, index) => value === hrefarr[index])
            )) {
                console.log("bad url", href);
                return;
            }
            this.loadPage(href, isSwitch);
        } else{
            this.loadPage("/emploie/auth",true)
        }
    }

    loadPage(href, isSwitch = false) {

        $.ajax({
            url: href,
            method: "GET",
            dataType: "html",
            success: (response) => {
                const responseHtml = new DOMParser().parseFromString(response, 'text/html');
                this.replaceContent(responseHtml, isSwitch);
                this.executeScripts(responseHtml);
                window.history.pushState({}, '', href);
            },
            error: (xhr, error) => {
                this.handleLoadError(xhr, error);
            },
        });
    }

    replaceContent(responseHtml, isSwitch) {
        let contentId = isSwitch ? "page-container" : "content"
        const content = document.getElementById(contentId);

        content.classList.remove("fadeInLeft");
        content.classList.add("js-animation-object", "animated", "fadeOutRight");
        setTimeout(() => {
            content.classList.remove("fadeOutRight");
            content.classList.add("fadeInLeft");
            const modalElement = document.getElementById("block-content");
            if (modalElement != null) modalElement.innerHTML = responseHtml.getElementById("block-content").innerHTML;
            content.innerHTML = responseHtml.querySelector(`#${contentId}`).innerHTML;
            this.button.handleButton(content);
            this.update(content);
        }, 2000);

    }

    executeScripts(responseHtml) {

        const scripts = responseHtml.querySelectorAll("#content script");
        for (const script of scripts) {
            eval(script.innerHTML);
        }
    }

    handleLoadError(xhr, error) {


        if (xhr.status === 404) {
            console.log(error)
            this.notification.showNotification(`404: Page not found ${error}`, false, 5000);
        } else {
            this.notification.showNotification(`An error occurred while loading the page : ${error}`, false, 5000);
        }
    }

}