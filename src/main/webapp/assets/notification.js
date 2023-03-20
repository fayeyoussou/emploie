
export class Notification {
    notificationTimer = null;
    showNotification(value, success, time) {
        let animated = document.getElementById("notification");
        animated.classList.remove("fadeOutRight")
        animated.classList.add("js-animation-object", "animated", "fadeInLeft")
        if (success) animated.classList.add("n-success")
        else animated.classList.add("n-fail")
        animated.innerHTML = value;
        this.notificationTimer = setTimeout(function () {
            animated.classList.remove("fadeInLeft")
            animated.classList.add("fadeOutRight")
            this.notificationTimer = null;
            setTimeout(function () {
                animated.classList.add("fade")

            }, 2000)
        }, time);
    }
    hideNotification() {
        let animated = document.getElementById("notification");
        if (this.notificationTimer != null) clearTimeout(this.notificationTimer);
        this.notificationTimer = null;
        animated.classList.remove("fadeInLeft")
        animated.classList.add("fadeOutRight")
        setTimeout(function () {
            animated.classList.add("fade")

        }, 2000)
    }
}