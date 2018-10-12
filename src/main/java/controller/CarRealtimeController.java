package controller;

import dao.carrealtimeDao;
import model.CarRealTime;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.loginService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CarRealtimeController {
    @Resource(name="carrealtimeDao")
    private carrealtimeDao crt;
    @RequestMapping(value="/carRealtimeData.do")
    public @ResponseBody
    String loginVerify(HttpServletRequest request, HttpServletResponse response, String username, String password) {
        System.out.println("123");
        try {
            List<CarRealTime> crtL= crt.selectAllCarRealTime();
            JSONArray JO= new JSONArray();
            System.out.println("change");
                String re=JO.fromObject(crtL).toString();
            request.setCharacterEncoding("utf-8");
            response.setContentType("text/html;charset=utf-8");
            PrintWriter out=response.getWriter();
            out.print(re.toString());
            return null;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }
    }
}
