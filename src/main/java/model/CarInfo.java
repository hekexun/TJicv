package model;

import java.util.Date;

public class CarInfo {
    private String carNumber;
    private String Bread;//品牌或者厂商
    private String Series;//车型
    private String Energy;//能源
    private String Classify;//款式
    private String year;//生成年份
    private Date recieveTime;//送达时间
    private int isBind;//是否绑定，0表示没有绑定，1表示绑定

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public String getBread() {
        return Bread;
    }

    public void setBread(String bread) {
        Bread = bread;
    }

    public String getSeries() {
        return Series;
    }

    public void setSeries(String series) {
        Series = series;
    }

    public String getEnergy() {
        return Energy;
    }

    public void setEnergy(String energy) {
        Energy = energy;
    }

    public String getClassify() {
        return Classify;
    }

    public void setClassify(String aClass) {
        Classify = aClass;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Date getRecieveTime() {
        return recieveTime;
    }

    public void setRecieveTime(Date recieveTime) {
        this.recieveTime = recieveTime;
    }

    public int getIsBind() {
        return isBind;
    }

    public void setIsBind(int isBind) {
        this.isBind = isBind;
    }
}
