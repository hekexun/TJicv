package service.impl;

import dao.carrealtimeDao;
import model.CarRealTime;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ContextLoader;
import service.IcarrealtimeService;

import javax.annotation.Resource;
import java.util.List;
//@Service("carrealtimeService")
public class carrealtimeServiceImpl implements IcarrealtimeService {
//runable中不能注入bean智能通过
    /*
    此方法用来后去在runable中获取bean
     */
    //
    //@Resource(name="carrealtimeDao")
    private carrealtimeDao Icrt=(carrealtimeDao) ContextLoader.getCurrentWebApplicationContext().getBean("carrealtimeDao");
    @Override
    public List<CarRealTime> selectCarRealTime() {

        List<CarRealTime> crt = Icrt.selectAllCarRealTime();
        return crt;
    }
}
