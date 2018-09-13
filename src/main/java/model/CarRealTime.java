package model;

import java.util.Date;

public class CarRealTime {
    private String devPhone;
    private Double gpsPosY;//经度
    private Double gpsPosX;//纬度
    private Double gpsSpeed;//GPS速度
    private Double CanSpeed;//can速度
    private int driveMode;//驾驶模式0自动驾驶，1人工干预
    private int engine;//发动机转速

    public Date getSendDatetime() {
        return sendDatetime;
    }

    public void setSendDatetime(Date sendDatetime) {
        this.sendDatetime = sendDatetime;
    }

    private Date sendDatetime;//定位时间

    public String getDevPhone() {
        return devPhone;
    }

    public void setDevPhone(String devPhone) {
        this.devPhone = devPhone;
    }

    public Double getGpsPosY() {
        return gpsPosY;
    }

    public void setGpsPosY(Double gpsPosY) {
        this.gpsPosY = gpsPosY;
    }

    public Double getGpsPosX() {
        return gpsPosX;
    }

    public void setGpsPosX(Double gpsPosX) {
        this.gpsPosX = gpsPosX;
    }

    public Double getGpsSpeed() {
        return gpsSpeed;
    }

    public void setGpsSpeed(Double gpsSpeed) {
        this.gpsSpeed = gpsSpeed;
    }

    public Double getCanSpeed() {
        return CanSpeed;
    }

    public void setCanSpeed(Double canSpeed) {
        CanSpeed = canSpeed;
    }

    public int getDriveMode() {
        return driveMode;
    }

    public void setDriveMode(int driveMode) {
        this.driveMode = driveMode;
    }

    public int getEngine() {
        return engine;
    }

    public void setEngine(int engine) {
        this.engine = engine;
    }

    public int getAcceleratorPedal() {
        return acceleratorPedal;
    }

    public void setAcceleratorPedal(int acceleratorPedal) {
        this.acceleratorPedal = acceleratorPedal;
    }

    public int getBrakePedal() {
        return brakePedal;
    }

    public void setBrakePedal(int brakePedal) {
        this.brakePedal = brakePedal;
    }

    public int getSteeringwheelAngle() {
        return steeringwheelAngle;
    }

    public void setSteeringwheelAngle(int steeringwheelAngle) {
        this.steeringwheelAngle = steeringwheelAngle;
    }

    public int getVideostate() {
        return videostate;
    }

    public void setVideostate(int videostate) {
        this.videostate = videostate;
    }

    private int acceleratorPedal;//加速踏板开度
    private int brakePedal;//刹车踏板开度
    private int steeringwheelAngle;//方向盘转角
    private int videostate;//1可用，0不可用
}
