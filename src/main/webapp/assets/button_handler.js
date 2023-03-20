import { Notification } from "./notification.js";
import { Constante } from "./constante.js";
import { FieldHandler } from "./field_handler.js";
export class ButtonHandler {
    action = "create";
    id = 0
    fieldHandler = new FieldHandler();
    
    entity = "";
    constructor(notification) {
        this.notification = notification
        this.action = "create";
    }
    getEntityName() {
        let value = document.getElementById("entity");
        if(value != null) value = value.value
        if (value != null && value.trim().length > 0) {
            this.entity = value;
        }
    }
    handleCreateButton(newEnt) {
        if (newEnt != null) {
            newEnt.addEventListener('click', _ => {
                this.action = 'create'
                const titleName = document.getElementById("modal_title");
                titleName.innerText = ("Create new" + this.entity).toUpperCase()
                let form = document.getElementById('form-field');
                const inputs = form.querySelectorAll('input');
                inputs.forEach(x => {
                    x.value = "";
                })

            })
        }
    }

    handleEditButtons(editButtons) {
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.action = "edit"
                const tabindex = button.getAttribute('tabindex');
                this.id = tabindex
                const title = button.getAttribute('title');
                const element = document.getElementById(tabindex);
                const titleName = document.getElementById("modal_title");
                titleName.innerText = ("edit " + title + " " + tabindex).toUpperCase()
                fetch(Constante.pathfull + title + "/" + tabindex)
                    .then(response => response.json())
                    .then(data => {
                        this.fieldHandler.setFormValues(data)
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        });
    }

    handleDeleteButtons(deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', this.ondelete.bind(this,button));
        });
    }
    ondelete(button){
        
            const tabindex = button.getAttribute('tabindex');
            const title = button.getAttribute('title');
            this.id = tabindex

            let value = `
                <p>Voulez vous vraiment supprimmer ${title}  ${tabindex}</p>
                <div id="notification-buttons">
                    <button id="delete-notif" class="confirm">Confirm</button>
                    <button class="cancel">Cancel</button>
                </div>
            `
            this.notification.showNotification(value, true, 10000)
            document.getElementById('delete-notif').addEventListener('click', this.handleDeleteConfirm.bind(this))
            document.querySelector('.cancel').addEventListener('click', this.hideNotification.bind(this))
        
    }
    hideNotification() {
        this.notification.hideNotification();
    }
    async handleDeleteConfirm(){
        this.notification.hideNotification()
        try {
            let myUrl = Constante.pathfull + this.entity+"/"+this.id;
            const response = await fetch(myUrl, {
                method: 'DELETE',
            });
            if (response.ok) {
                let body = document.getElementsByTagName('tbody')[0]
                let row = body.querySelector(`#tr-${this.entity}-${this.id}`);
                row.classList.add("js-animation-object", "animated", "rollOut");
                setTimeout(function () {
                    row.remove()
                }, 2000)
                this.notification.showNotification('Suppresion reussit', true, 4000);
            } else {
                this.notification.showNotification('Echec suppression ! veuillez reessayer', false, 6000);
            }
        } catch (error) {
            this.notification.showNotification('Echec creation ! veuillez reessayer', false)
            console.error('Create error:', error);
        }
    }
    async handleSubmit() {
        let form = document.getElementById('form-field');
        const inputs = form.querySelectorAll('input');
        let map = new Map()
        inputs.forEach(x => {
            map.set(x.name, x.value)
        })
        let myUrl = Constante.pathfull + this.entity;
        if(this.action == "edit")  myUrl = myUrl+"/"+this.id
        console.log(myUrl)
        console.log(this.id)
        try {
            const response = await fetch(myUrl, {
                method: this.action == 'create' ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(map))
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                if(this.action == "create"){
                    let trow= document.createElement('tr');
                    let ident = responseData['id'];
                    trow.id = `tr-${this.entity}-${ident}`;
                    trow.classList.add("js-animation-object", "animated", "rollIn")
                    let inner = `<th class="text-center" id="${this.entity}-id-${ident}" scope="row" >${ident}</th>`;
                    
                    for (let x in responseData){
						 if(x!='id') inner+= `<td id="${this.entity}-${x}-${ident}">${responseData[x]}</td>`
					}
                    //<tr id="tr-role-${element.id}">
                    trow.innerHTML = `
					${inner}
					<td class="text-center"  id="${this.entity}-action-${ident}">
						<div class="btn-group">
							<button type="button" class="btn btn-sm btn-secondary text-primary edit"
								data-toggle="modal" tabindex="${ident}" data-target="#modal-fromright" title="${this.entity}">
								<i class="fa fa-pencil"></i>
							</button>
							<button type="button" class="btn btn-sm btn-secondary text-danger delete"
								data-toggle="tooltip" data-toggle="modal" tabindex="${ident}" title="${this.entity}" data-target="#modal-fromright" title="Delete">
								<i class="fa fa-times"></i>
							</button>
						</div>
					</td>`   
                    let body = document.getElementsByTagName('tbody')[0]
                    body.appendChild(trow)
                    this.handleButton(body)
                }else{
                    let body = document.getElementsByTagName('tbody')[0]
                    let ident = responseData['id'];

                    for (let x in responseData){
                        body.querySelector(`#${this.entity}-${x}-${ident}`).innerText = responseData[x]
                   }
                }
                this.notification.showNotification('Create success', true, 4000);
            } else {
                this.notification.showNotification('Echec creation ! veuillez reessayer', false, 6000);
            }
        } catch (error) {
            this.notification.showNotification('Echec creation ! veuillez reessayer', false)
            console.error('Create error:', error);
        }

    }

    handleButton(element) {
        const newEnt = element == null ? document.querySelector('#create') : element.querySelector('#create');
        this.handleCreateButton(newEnt);

        const editButtons = element == null ? document.querySelectorAll('.edit') : element.querySelectorAll('.edit');
        this.handleEditButtons(editButtons);
        let submitButtons = element == null ? document.querySelector('#modal-submit') : element.querySelector('#modal-submit');
        if (submitButtons != null) submitButtons.addEventListener("click", this.handleSubmit.bind(this));

        const deleteButtons = element == null ? document.querySelectorAll('.delete') : element.querySelectorAll('.delete');
        this.handleDeleteButtons(deleteButtons);
        this.getEntityName();
    }
}