package dao;

import model.CarInfo;
import model.CarRealTime;
import model.bindInfo;
import model.terminalInfo;

import java.util.List;

public interface carTerminalDao {
    List<CarInfo> selectCarInfo();
    int insertCarInfo(CarInfo carInfo);
    int updateCarinfo(CarInfo car);
    int deleteCarinfo(int id);
    List<terminalInfo>selectTerminalInfo();
    int insertTerminalInfo(terminalInfo ter);
    int updateTerminalinfo(terminalInfo ter);
    int deleteTerminalinfo(int id);
    bindInfo selectBindInfo(String carNumber);
    int insertBindInfo(bindInfo bind);
    int updateBindInfoinfo(bindInfo ter);
    int deleteBindInfoinfo(int id);
}
