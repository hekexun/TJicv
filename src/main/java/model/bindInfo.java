package model;

import java.util.Date;

public class bindInfo {
    private String bindNumber;
    private String carNumber;//车辆编号
    private String termailNumber;//终端编号
    private Date bindTime;//绑定日期
    private Date offTime;//解绑日期
    private int isBind;//是否绑定，0表示没有绑定，1表示绑定
}
