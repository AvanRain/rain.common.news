package com.rain.common.news.controller;

import com.alibaba.fastjson.JSON;
import com.rain.common.news.utils.CommonPropsUtils;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;
import java.util.stream.Stream;

/**
 * @author Rain
 */
@Controller
public class GeneralContentController {

    /**
     * 配置文件
     */
    @Autowired
    private CommonPropsUtils commonPropsUtils;

    /**
     * SPLIT_SPOT
     */
    private static final String SPLIT_SPOT=".";

    @RequestMapping(value = "general" , method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String general(HttpServletRequest request, HttpServletResponse response, Model model){
        Map<String,Object> result = new HashMap<>(2);
        try {
            String tmpName = request.getParameter("tmpName");
            if (StringUtils.isBlank(tmpName)) {

                return JSON.toJSONString(result);
            }

            if (tmpName.indexOf(SPLIT_SPOT)>0){
                tmpName = tmpName.substring(0,tmpName.indexOf(SPLIT_SPOT));
            }

            Configuration configuration = new Configuration(Configuration.VERSION_2_3_29);
           /* configuration.setClassForTemplateLoading(this.getClass(),"/templates/ftl");
            configuration.setDirectoryForTemplateLoading(ResourceUtils.getFile("classpath:templates/ftl"));*/
            configuration.setDirectoryForTemplateLoading(ResourceUtils.getFile(commonPropsUtils.getHtmlUploadPath()));
            /*configuration.setDefaultEncoding("UTF-8");*/
            configuration.setEncoding(Locale.getDefault(),"UTF-8");

            Template temp = configuration.getTemplate(tmpName+".ftl");

            Map<String,Object> data = new HashMap<>(2);
            data.put("title","测试");
            data.put("hello","hello word!!");
            Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(commonPropsUtils.getHtmlCreatePath()+"/"+tmpName+".html")),"UTF-8"));
//            Writer out = new FileWriter(new File(commonPropsUtils.getHtmlCreatePath()+"/"+tmpName+".html"));
            temp.process(data,out);
            out.close();
            result.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("code",999);
        }
        return JSON.toJSONString(result);
    }

    @RequestMapping(value = "upload" , method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String upload(MultipartFile file, HttpServletRequest request, HttpServletResponse response, Model model){
        Map<String,Object> result = new HashMap<>(2);
        try {
            String fileName = file.getOriginalFilename();
            //获取文件后缀名
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            String filePath = commonPropsUtils.getHtmlUploadPath()+"/"+fileName;
            file.transferTo(new File(filePath));
            result.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("code",999);
        }
        return JSON.toJSONString(result);
    }

    @RequestMapping(value = "download" , method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public void download(HttpServletRequest request, HttpServletResponse response, Model model){
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        try {
            String fileName = request.getParameter("file");
            File file = new File(commonPropsUtils.getHtmlDownloadPath()+"/"+fileName);
            response.setContentType("application/force-download");
            response.addHeader("Content-Disposition",
                    "attachment;fileName=" +  fileName);
            byte[] buffer = new byte[1024];
            fis = new FileInputStream(file);
            bis = new BufferedInputStream(fis);
            OutputStream os = response.getOutputStream();
            int i = bis.read(buffer);
            while (i != -1) {
                os.write(buffer, 0, i);
                i = bis.read(buffer);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                bis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    @RequestMapping(value = "downloadIndex" , method = {RequestMethod.GET, RequestMethod.POST})
    public String downloadIndex(HttpServletRequest request, HttpServletResponse response, Model model){
        try {
            File file = new File(commonPropsUtils.getHtmlDownloadPath());
            File[] files = file.listFiles();
            List<String> fileNames = new ArrayList<>();
            Stream.of(files).forEach(fl->fileNames.add(fl.getName()));
            model.addAttribute("files",fileNames);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "downloadIndex";
    }


}
