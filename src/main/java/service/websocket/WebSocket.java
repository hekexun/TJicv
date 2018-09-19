package service.websocket;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

//import com.google.gson.JsonObject;

import dao.carrealtimeDao;
import dao.loginDao;
import net.sf.json.JSONObject;
import org.springframework.web.context.ContextLoader;
import service.IcarrealtimeService;
import service.impl.carrealtimeServiceImpl;

@ServerEndpoint("/webSocket/{username}")
public class WebSocket {
    private carrealtimeDao Icrt=(carrealtimeDao) ContextLoader.getCurrentWebApplicationContext().getBean("carrealtimeDao");
    //这里写的是线程
    myThreadImpl thread1=new myThreadImpl();
    Thread thread=new Thread(thread1);
    //
    private static int onlineCount = 0;
    private static Map<String, WebSocket> clients = new ConcurrentHashMap<String, WebSocket>();
    private Session session;
    private String username;
    @OnOpen
    public void onOpen(@PathParam("username") String username, Session session) throws IOException {

        this.username = username;
        this.session = session;

        addOnlineCount();
        clients.put(username, this);

        System.out.println("已连接");
        //开启一个线程对数据库中的数据进行轮询
        thread.start();
    }

    @OnClose
    public void onClose() throws IOException {
        thread1.stopMe();
        clients.remove(username);
        subOnlineCount();
    }

    @OnMessage
    public void onMessage(String message) throws IOException {
        sendMessageAll(message);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    public void sendMessageTo(String message, String To) throws IOException {
        // session.getBasicRemote().sendText(message);
        //session.getAsyncRemote().sendText(message);
        for (WebSocket item : clients.values()) {
            if (item.username.equals(To) )
                item.session.getAsyncRemote().sendText(message);
        }
    }

    public void sendMessageAll(String message) throws IOException {
        for (WebSocket item : clients.values()) {
            item.session.getAsyncRemote().sendText(message);
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocket.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
         WebSocket.onlineCount--;
    }

    public static synchronized Map<String, WebSocket> getClients() {
        return clients;
    }

}
