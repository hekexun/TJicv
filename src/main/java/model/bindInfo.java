package model;

import java.util.Date;

public class bindInfo {
    public String getBindNumber() {
        return bindNumber;
    }

    public void setBindNumber(String bindNumber) {
        this.bindNumber = bindNumber;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public String getTerminalNumber() {
        return terminalNumber;
    }

    public void setTerminalNumber(String terminalNumber) {
        this.terminalNumber = terminalNumber;
    }

    public Date getBindTime() {
        return bindTime;
    }

    public void setBindTime(Date bindTime) {
        this.bindTime = bindTime;
    }

    public Date getOffTime() {
        return offTime;
    }

    public void setOffTime(Date offTime) {
        this.offTime = offTime;
    }

    public int getIsBind() {
        return isBind;
    }

    public void setIsBind(int isBind) {
        this.isBind = isBind;
    }

    private String bindNumber;
    private String carNumber;//车辆编号
    private String terminalNumber;//终端编号
    private Date bindTime;//绑定日期
    private Date offTime;//解绑日期
    private int isBind;//是否绑定，0表示没有绑定，1表示绑定
}
