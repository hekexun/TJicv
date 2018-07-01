package dao;

import model.User;
import org.springframework.stereotype.Service;


public interface IUserDao {

    User selectUser(long id);

}