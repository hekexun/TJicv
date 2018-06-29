<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>用户登录</title>
</head>
<body>
<form action="<%=request.getContextPath() %>/login.do" method="post">
    用户名：<input type="text" name="username" >
    密码：<input type="password" name="password" >
    <input type="submit" value="登录">
</form>
</body>
</html>
