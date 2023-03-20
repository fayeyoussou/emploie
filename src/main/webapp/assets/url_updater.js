
export class UrlUpdater {

    constructor(button, notification) {
        this.button = button;
        this.notification = notification;
        console.log(this.button);
        this.update()
    }

    update(element =null) {
        const links = element == null ? document.getElementsByTagName("a") : element.getElementsByTagName("a");
        if(links !=null){
        for (const element of links) {
            element.addEventListener("click", this.handleClick.bind(this));
        }
        }
    }

    handleClick(event) {
        console.log("handleClick", event);
        event.preventDefault();
        let targetLink = event.target;
        while (targetLink.tagName !== "A") {
            targetLink = targetLink.parentElement;
        }
        const href = targetLink.getAttribute("href");
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
            let contentId= isSwitch ? "page-container" : "content"
            const content = document.getElementById(contentId);
            
            content.classList.remove("fadeInLeft");
            content.classList.add("js-animation-object", "animated", "fadeOutRight");
            setTimeout(() => {
                content.classList.remove("fadeOutRight");
                content.classList.add("fadeInLeft");
                const modalElement = document.getElementById("block-content");
                if(modalElement !=null )modalElement.innerHTML = responseHtml.getElementById("block-content").innerHTML;
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