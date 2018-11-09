package model;

import java.util.Date;

public class terminalInfo {
    private String terminalNumber;
    private String Bread;//品牌或者厂商
    private int isBind;//是否绑定，0表示绑定，1表示没有绑定
    private Date recieveTime;//送达时间

    public String getTerminalNumber() {
        return terminalNumber;
    }

    public void setTerminalNumber(String terminalNumber) {
        this.terminalNumber = terminalNumber;
    }

    public String getBread() {
        return Bread;
    }

    public void setBread(String bread) {
        Bread = bread;
    }

    public int getIsBind() {
        return isBind;
    }

    public void setIsBind(int isBind) {
        this.isBind = isBind;
    }

    public Date getRecieveTime() {
        return recieveTime;
    }

    public void setRecieveTime(Date recieveTime) {
        this.recieveTime = recieveTime;
    }
}
