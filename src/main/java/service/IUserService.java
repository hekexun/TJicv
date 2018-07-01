package service;

import java.util.List;
import model.User;

public interface IUserService {

    User selectUser(long userId);
}
