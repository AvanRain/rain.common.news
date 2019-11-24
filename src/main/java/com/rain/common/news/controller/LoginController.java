package com.rain.common.news.controller;

import com.alibaba.fastjson.JSON;
import com.rain.common.news.utils.CommonPropsUtils;
import com.rain.common.news.utils.enc.Aes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Rain
 */
@Controller
public class LoginController {

    /**
     * 配置文件
     */
    @Autowired
    private CommonPropsUtils commonPropsUtils;

    @RequestMapping(value = "/user/login", method = {RequestMethod.POST})
    @ResponseBody
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> map = new HashMap<>();

        try {
            if (StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
                map.put("code",1);
                map.put("msg", "用户名密码为空");

                return "dashboard";
            }

            if (!username.equalsIgnoreCase(commonPropsUtils.getLoginUserName()) || !password.equals(commonPropsUtils.getLoginPassWord())){
                map.put("code",2);
                map.put("msg", "用户名密码错误");
                return JSON.toJSONString(map);
            }

            request.getSession().setAttribute("edname",commonPropsUtils.getLoginUserName());
            Cookie cookie = new Cookie("edname", Aes.aesEncryptString(commonPropsUtils.getLoginUserName()));
            cookie.setDomain(commonPropsUtils.getLoginDomain());
            cookie.setHttpOnly(true);
            cookie.setMaxAge(1800);
            cookie.setPath("/");
            response.addCookie(cookie);

            map.put("code",0);
            map.put("msg", "成功");
        } catch (Exception e) {
            map.put("code",999);
            map.put("msg", "异常");
        }
        return JSON.toJSONString(map);
    }

    @RequestMapping(value = "/auth/index" , method = {RequestMethod.GET, RequestMethod.POST})
    public String downloadIndex(HttpServletRequest request, HttpServletResponse response, Model model){
        return "index";
    }

}
