package dao;

import model.CarRealTime;

import java.util.List;

public interface IcarRealTimeDao {
   List<CarRealTime> selectAllCarRealTime();
}
