package service.impl;

import dao.loginDao;
//import dao.loginDaoImpl;
import model.login;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import service.loginService;
import until.ConnectionFactory;

import javax.annotation.Resource;
import java.sql.Connection;
import java.sql.ResultSet;
@Service("loginService")
public class loginServiceImpl implements loginService {
    @Resource(name = "loginDao")
   private loginDao lgin;
    public int loginCheck(String username,String passwd)
    {
        int state=0;//用户不存在，1密码错误；2登录成功

        //loginDao login=new loginDaoImpl();
        login lg=lgin.getPasswd(username);
        if (lg.getPassword().equals(passwd))
        {
            state=2;
        }else
        {
            state=0;
        }
        return state;
        /*Connection conn=null;
        try {
            conn = ConnectionFactory.getInstance().makeConn();
            conn.setAutoCommit(false);
            ResultSet re=login.getPasswd(conn,username);
            if (re==null)
            {
               return 0;//
            }else
            { String pass="";
                while(re.next())
                {
                   pass= re.getString("password");
                }
                if (pass.equals(passwd))
                {
                    return 2;
                }else
                {
                    return 1;
                }
            }

        }catch (Exception e) {
            e.printStackTrace();
            try {
                conn.rollback();
            } catch ( Exception e2) {
                e2.printStackTrace();
            }
        }finally
        {
            try {
                conn.close();
            } catch (  Exception e3) {
                e3.printStackTrace();
            }
        }
        return 0;*/
    }
}
