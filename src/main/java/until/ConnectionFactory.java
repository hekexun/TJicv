package until;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class ConnectionFactory {
	private static String driver;
	private static String dbUrl;
	private static String user;
	private static String password;
	
	private static final ConnectionFactory factory=new ConnectionFactory();
	
	private static Connection conn=null;
		
	static{ 
		Properties prop= new Properties();
    	try {
			InputStream in =ConnectionFactory.class.getClassLoader().getResourceAsStream("log4j.properties");
			prop.load(in);
			
		} catch (Exception e) {
			System.out.printf("====配置文件错误=====");
		}
		driver=prop.getProperty("driver");
		dbUrl=prop.getProperty("dbUrl");
		user=prop.getProperty("user");
		password=prop.getProperty("password");
		
	   }
	private ConnectionFactory()
	{
		
	}
	public static ConnectionFactory getInstance()
	{
		return factory;
	}
	public static Connection makeConn()//得到新的连接
	{
		try {
			Class.forName(driver);
			conn=DriverManager.getConnection(dbUrl, user, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	}
