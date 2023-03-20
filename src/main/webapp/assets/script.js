import { UrlUpdater } from "./url_updater.js";
import { ButtonHandler } from "./button_handler.js";
import { Notification } from "./notification.js";
var notification = new Notification()
var buttonHandler = new ButtonHandler(notification)
var urlUpdater = new UrlUpdater(buttonHandler,notification);
buttonHandler.handleButton()
function isLoggedIn() {
	const loggedIn = false;
	return loggedIn;
}
