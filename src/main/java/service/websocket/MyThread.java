package service.websocket;

import com.sun.org.apache.bcel.internal.generic.NEW;
import dao.IcarRealTimeDao;
import model.CarRealTime;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

public class MyThread implements Runnable{
    private int sum;
    private int new_sum;
    private boolean stopMe = true;
    @Resource(name = "IcarRealTimeDao")
    private IcarRealTimeDao Icrt;
    public void stopMe() {
        stopMe = false;
    }

    /* (non-Javadoc)
     * @see java.lang.Runnable#run()
     */
    public void run()  {
        WebSocket wbs=new WebSocket();
        while(stopMe){
            List<CarRealTime> crt=Icrt.selectAllCarRealTime();
            JSONArray JO= new JSONArray();
                System.out.println("change");
            try {
                String re=JO.fromObject(crt).toString();
                wbs.onMessage(re);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}
