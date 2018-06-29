package controller;

import service.loginService;
import service.loginServiceImpl;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@Controller
public class loginController {
    @RequestMapping(value="//login.do")
    public @ResponseBody
    String loginVerify(HttpServletRequest request, HttpServletResponse response,String username,String password) {
        System.out.println("123");
        try {
            loginService login= new loginServiceImpl();
            int state=login.loginCheck(username,password);//0用户不存在，1密码错误，2，登录成功
            JSONObject jo = new JSONObject();
            jo.put("state",String.valueOf(state));
            request.setCharacterEncoding("utf-8");
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.print(jo.toString());
            return null;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
    }
}
