package controller;

import dao.carrealtimeDao;
import model.CarRealTime;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;

@Controller
public class CarRealTimeController {
    @Resource(name = "carrealtimeDao")
    private carrealtimeDao crt;
    @RequestMapping(value="/Files/car.do")
    public @ResponseBody
    String getcarrealtime(HttpServletRequest request, HttpServletResponse response, String username) {
        System.out.println("123");
        try {
            List<CarRealTime> crtList = crt.selectAllCarRealTime();
            JSONArray JO= new JSONArray();
            System.out.println("change");
            String re=JO.fromObject(crtList).toString();
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
