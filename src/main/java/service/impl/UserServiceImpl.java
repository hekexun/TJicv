package service.impl;

import dao.IUserDao;
import model.User;
import service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
@Service("userService")
public class UserServiceImpl implements IUserService {
   @Resource
   private IUserDao userDao;

    public User selectUser(long userId) {
        return this.userDao.selectUser(userId);
    }

}