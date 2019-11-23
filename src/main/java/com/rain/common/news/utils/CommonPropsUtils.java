package com.rain.common.news.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * @author Rain
 */
@Configuration
@PropertySource("classpath:props/common.properties")
@ConfigurationProperties(value="common")
public class CommonPropsUtils {

    @Value("${general.html.upload.path}")
    private String htmlUploadPath;

    @Value("${general.html.create.path}")
    private String htmlCreatePath;

    @Value("${general.html.download.path}")
    private String htmlDownloadPath;

    @Value("${general.html.image.path}")
    private String htmlImagePath;

    @Value("${general.login.username}")
    private String loginUserName;

    @Value("${general.login.password}")
    private String loginPassWord;

    @Value("{general.login.domain}")
    private String LoginDomain;

    public String getHtmlUploadPath() {
        return htmlUploadPath;
    }

    public void setHtmlUploadPath(String htmlUploadPath) {
        this.htmlUploadPath = htmlUploadPath;
    }

    public String getHtmlCreatePath() {
        return htmlCreatePath;
    }

    public void setHtmlCreatePath(String htmlCreatePath) {
        this.htmlCreatePath = htmlCreatePath;
    }

    public String getHtmlDownloadPath() {
        return htmlDownloadPath;
    }

    public void setHtmlDownloadPath(String htmlDownloadPath) {
        this.htmlDownloadPath = htmlDownloadPath;
    }

    public String getHtmlImagePath() {
        return htmlImagePath;
    }

    public void setHtmlImagePath(String htmlImagePath) {
        this.htmlImagePath = htmlImagePath;
    }

    public String getLoginUserName() {
        return loginUserName;
    }

    public void setLoginUserName(String loginUserName) {
        this.loginUserName = loginUserName;
    }

    public String getLoginPassWord() {
        return loginPassWord;
    }

    public void setLoginPassWord(String loginPassWord) {
        this.loginPassWord = loginPassWord;
    }

    public String getLoginDomain() {
        return LoginDomain;
    }

    public void setLoginDomain(String loginDomain) {
        LoginDomain = loginDomain;
    }
}
