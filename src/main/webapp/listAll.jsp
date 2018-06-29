<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>所有用户所有信息</title>
</head>
<body>
<h3><center>所有用户所有信息</center></h3>
<table width="300px" border="1" cellpadding="0" cellspacing="0" align="center">
    <tr>
        <td>编号</td>
        <td>用户名</td>
        <td>密码</td>
        <td>操作</td>
    </tr>
    <c:forEach var="list"  items="${addLists}">
        <tr>
            <td>${list.id}</td>
            <td>${list.username}</td>
            <td>${list.password}</td>
            <td><a href="modify.do?id=${list.id}">更新</a>    <a href="del.do?id=${list.id}">删除</a></td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
