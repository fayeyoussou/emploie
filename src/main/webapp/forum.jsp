<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="discussions" value="${requestScope.discussions}" />
<%@ page import="java.time.OffsetDateTime" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ page import="java.util.Locale" %>

<nav class="breadcrumb bg-white push">
                        <a class="breadcrumb-item" href="be_pages_forum_categories.html">Forum</a>
                        <span class="breadcrumb-item active">Sujets</span>
                    </nav>
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Sujets</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option" data-toggle="modal" data-target="#modal-fromright">
                                    <i class="fa fa-plus"></i> Nouveau sujet
                                </button>
                                <button type="button" class="btn-block-option" data-toggle="block-option" data-action="fullscreen_toggle"></button>
                                <button type="button" class="btn-block-option" data-toggle="block-option" data-action="state_toggle" data-action-mode="demo">
                                    <i class="si si-refresh"></i>
                                </button>
                            </div>
                        </div>
                        <div class="block-content">
                        	<c:if test="${discussions != null }">
                        	
                            <!-- Topics -->
                            <table class="table table-striped table-borderless table-vcenter">
                                <thead class="thead-light">
                                    <tr>
                                        <th colspan="2">Sujets De discusions</th>
                                        <th class="d-none d-md-table-cell text-center" style="width: 100px;">Reponses</th>
                                        <th class="d-none d-md-table-cell text-center" style="width: 100px;">Vues</th>
                                        <th class="d-none d-md-table-cell" style="width: 200px;">Dernier Post</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach items="${discussions }" var="element">
                                    
                                    <tr>
                                        <td colspan="2">
                                            <a class="font-w600" href="/emploie/forum/${element.id}">
                                            ${element.sujet}</a>
                                            <div class="font-size-sm text-muted mt-5">
                                                <a href="be_pages_generic_profile.html">${element.createur}</a> on <em>${element.dateMessage}</em>
                                            </div>
                                        </td>
                                        <td class="d-none d-md-table-cell text-center">
                                            <a class="font-w600" href="javascript:void(0)">${element.nombreMessages}</a>
                                        </td>
                                        <td class="d-none d-md-table-cell text-center">
                                            <a class="font-w600" href="javascript:void(0)">${element.vue}</a>
                                        </td>
                                        <td class="d-none d-md-table-cell">
                                            <span class="font-size-sm">Par <a href="">${element.dernierMessageUser}</a><br>le <em>${element.dernierMessageDate}</em></span>
                                        </td>
                                    </tr>
                                    </c:forEach>
                                    
                                </tbody>
                            </table>
                            </c:if>
                            <!-- END Topics -->

                            <!-- Pagination -->
                            <nav aria-label="Page navigation">
                                <ul class="pagination justify-content-end mr-20">
                                    <li class="page-item">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Previous">
                                            <span aria-hidden="true">
                                                <i class="fa fa-angle-left"></i>
                                            </span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li class="page-item active">
                                        <a class="page-link" href="javascript:void(0)">1</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="javascript:void(0)">2</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="javascript:void(0)">3</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="javascript:void(0)">4</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="javascript:void(0)" aria-label="Next">
                                            <span aria-hidden="true">
                                                <i class="fa fa-angle-right"></i>
                                            </span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <!-- END Pagination -->
                        </div>
                    </div>