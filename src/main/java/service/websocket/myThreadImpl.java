package service.websocket;


import dao.carrealtimeDao;

import model.CarRealTime;

import net.sf.json.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ContextLoader;
import service.IcarrealtimeService;
import service.impl.carrealtimeServiceImpl;
import service.websocket.WebSocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
//@Service("myThread")
public class myThreadImpl implements Runnable{
    private boolean stopMe = true;
    private carrealtimeDao Icrt=(carrealtimeDao) ContextLoader.getCurrentWebApplicationContext().getBean("carrealtimeDao");
    //carrealtimeServiceImpl Icrt=new carrealtimeServiceImpl();
    //注解构造类
    public void stopMe() {
        stopMe = false;
    }

    /* (non-Javadoc)
     * @see java.lang.Runnable#run()
     */
    public void run()  {
        WebSocket wbs=new WebSocket();
       // CarRealTime crt=new CarRealTime();
        List<CarRealTime> crt=new ArrayList<CarRealTime>();
        while(stopMe){
            crt = Icrt.selectAllCarRealTime();
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
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

