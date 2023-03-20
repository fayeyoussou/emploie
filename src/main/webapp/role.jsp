<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="roles" value="${requestScope.roles}" />

<!-- Default Table Style -->
<h2 class="content-heading">Liste des roles</h2>

<!-- Table -->
<div class="block">
	<div class="block-header block-header-default">
		<h3 class="block-title">${fn:length(roles)} Roles :</h3>
		<div class="block-options">
			<div class="block-options-item">
				<div class="btn-group">
							
							<button type="button" id="create" class="btn btn-lg btn-secondary text-success"
								data-toggle="modal" data-target="#modal-fromright" title="Add New">
								<i class="fa fa-plus-square"></i> add new
							</button>
							
						</div> 
			</div>
		</div>
	</div>
	<div class="block-content">
	<c:if test="${roles != null }">
		<table class="table table-vcenter">
		
			<thead>
				<tr>
					<th class="text-center" style="width: 50px;">#</th>
					<th>Name</th>
					<th class="text-center" style="width: 100px;">Actions</th>
				</tr>
			</thead>
			<tbody>
			<c:forEach items="${roles }" var="element">
				<tr id="tr-role-${element.id}">
					<th class="text-center" id="role-id-${element.id}" scope="row" >${element.id}</th>
					<td id="role-nom-${element.id}">${element.nom}</td>
					<td class="text-center"  id="role-action-${element.id}">
						<div class="btn-group">
							<button type="button" class="btn btn-sm btn-secondary text-primary edit"
								data-toggle="modal" tabindex="${element.id}" data-target="#modal-fromright" title="role">
								<i class="fa fa-pencil"></i>
							</button>
							<button type="button" class="btn btn-sm btn-secondary text-danger delete"
								data-toggle="tooltip" data-toggle="modal" tabindex="${element.id}" title="role" data-target="#modal-fromright" title="Delete">
								<i class="fa fa-times"></i>
							</button>
						</div>
					</td>
				</tr>
				</c:forEach>
			</tbody>
		</table>
		</c:if>
	</div>
</div>
<!-- END Table -->
