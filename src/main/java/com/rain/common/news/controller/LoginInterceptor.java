package com.rain.common.news.controller;

import com.rain.common.news.utils.CommonPropsUtils;
import com.rain.common.news.utils.enc.Aes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

/**
 * @author Rain
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private CommonPropsUtils commonPropsUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        StringBuffer sb = request.getRequestURL();

        String edName = (String) request.getSession().getAttribute("edname");

        if (edName != null && edName.trim().equals(commonPropsUtils.getLoginUserName())){
            return true;
        }

        if (checkLogin(request)) {
            return true;
        }

        Enumeration<String> enu=request.getParameterNames();
        StringBuffer sp = new StringBuffer();
        while (enu.hasMoreElements()){
            String name = enu.nextElement();
            sp.append(name).append("=").append(request.getParameter(name)).append("&");
        }

        if (sp.length() > 0) {
            sp.substring(0,sp.length()-1);
            sb.append("?").append(sp.toString().substring(0,sp.length()-1));
        }

        String loginUrl = commonPropsUtils.getLoginUrl()+sb.toString();

        response.sendRedirect(loginUrl);

        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    /**
     *
     * @param request
     * @return
     */
    private boolean checkLogin(HttpServletRequest request) throws Exception {
        Cookie[] cookies =request.getCookies();
        if (cookies == null) {
            return false;
        }

        String value = null;

        for (Cookie cookie:cookies){
            if (cookie.getName().equals("edname")){
                value = cookie.getValue();
                break;
            }
        }

        if (value == null || value.trim().equals("")){
            return false;
        }

        String edName = Aes.aesDecryptString(value);
        if (!edName.equals(commonPropsUtils.getLoginUserName())){
            return false;
        }

        return true;
    }


}
