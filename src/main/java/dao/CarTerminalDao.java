package dao;

import model.CarRealTime;

import java.util.List;

public interface CarTerminalDao {
    List<CarRealTime> selectCarInfo();
    int insertCarInfo();
    int updateCarinfo();
    int deleteCarinfo(int id);
    List<CarRealTime>selectTerminalInfo();
    int insertTerminalInfo();
    int updateTerminalinfo();
    int deleteTerminalinfo(int id);

}
