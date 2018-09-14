package dao;

import model.User;
import org.springframework.stereotype.Service;


public interface UserDao {

    public User selectUser(long id);

}