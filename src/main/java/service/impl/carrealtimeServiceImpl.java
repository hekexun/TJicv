package service.impl;

import dao.carrealtimeDao;
import model.CarRealTime;
import org.springframework.stereotype.Service;
import service.IcarrealtimeService;

import javax.annotation.Resource;
import java.util.List;
@Service("carrealtimeService")
public class carrealtimeServiceImpl implements IcarrealtimeService {

    @Resource(name="carrealtimeDao")
    private carrealtimeDao Icrt;
    @Override
    public List<CarRealTime> selectCarRealTime() {

        List<CarRealTime> crt = Icrt.selectAllCarRealTime();
        return crt;
    }
}
