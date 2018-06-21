package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class loginDaoImpl implements loginDao {
    @Override
    public ResultSet getPasswd(Connection conn, String user) throws SQLException {
        PreparedStatement ps = conn.
                prepareCall("SELECT name,password FROM tb_login t where t.name=?");
        ps.setString(1,user);
        ResultSet result = ps.executeQuery();
        return  result;
    }
}
