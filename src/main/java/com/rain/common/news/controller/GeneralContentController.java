package com.rain.common.news.controller;

import com.alibaba.fastjson.JSON;
import com.rain.common.news.utils.CommonPropsUtils;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.PicturesManager;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.hwpf.usermodel.PictureType;
import org.apache.poi.xwpf.converter.core.FileImageExtractor;
import org.apache.poi.xwpf.converter.core.FileURIResolver;
import org.apache.poi.xwpf.converter.xhtml.XHTMLConverter;
import org.apache.poi.xwpf.converter.xhtml.XHTMLOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
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

    @RequestMapping(value = "convertDoc2Html" , method = {RequestMethod.GET, RequestMethod.POST})
    public String convertDoc2Html(HttpServletRequest request, HttpServletResponse response, Model model) {
        try {
            String filepath = commonPropsUtils.getHtmlUploadPath();
            String fileName = "abcd.doc";
            String htmlName = "abcd.html";
            final String file = filepath +"/" + fileName;
            HWPFDocument wordDocument = new HWPFDocument(new FileInputStream(file));
            WordToHtmlConverter wordToHtmlConverter = new WordToHtmlConverter(
                    DocumentBuilderFactory.newInstance().newDocumentBuilder()
                            .newDocument());
            wordToHtmlConverter.setPicturesManager( new PicturesManager(){
                @Override
                public String savePicture(byte[] content,
                                          PictureType pictureType, String suggestedName,
                                          float widthInches, float heightInches ){
//                    File file = new File(imageAbsolutePath + suggestedName);
//                    try {
//                        OutputStream out = new FileOutputStream(file);
//                        out.write(content);
//                        out.close();
//                    } catch (FileNotFoundException e) {
//                        // TODO Auto-generated catch block
//                        e.printStackTrace();
//                    } catch (IOException e) {
//                        // TODO Auto-generated catch block
//                        e.printStackTrace();
//                    }
//                    //webImagePath为最终html中img标签要读取的服务器上的地址，如<img src="/csdn/a.png"/>
//                    //改路径自己设定，不要使用imageAbsolutePath路径，该路径为存本地时的完整路径
//                    return webImagePath + suggestedName;

                    return commonPropsUtils.getHtmlImagePath()+"/"+suggestedName;
                }
            });
            wordToHtmlConverter.processDocument(wordDocument);
            //save pictures
            List pics=wordDocument.getPicturesTable().getAllPictures();
            if(pics!=null){
                for(int i=0;i<pics.size();i++){
                    Picture pic = (Picture)pics.get(i);
                    System.out.println();
                    try {
                        pic.writeImageContent(new FileOutputStream(commonPropsUtils.getHtmlImagePath()+"/"
                                + pic.suggestFullFileName()));
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    }
                }
            }
            Document htmlDocument = wordToHtmlConverter.getDocument();
            OutputStream out = new FileOutputStream(new File(filepath+ "/" + htmlName));
            DOMSource domSource = new DOMSource(htmlDocument);
            StreamResult streamResult = new StreamResult(out);

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer serializer = tf.newTransformer();
            serializer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            serializer.setOutputProperty(OutputKeys.INDENT, "yes");
            serializer.setOutputProperty(OutputKeys.METHOD, "html");
            serializer.transform(domSource, streamResult);
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @RequestMapping(value = "convertDocx2Html" , method = {RequestMethod.GET, RequestMethod.POST})
    public String convertDocx2Html(HttpServletRequest request, HttpServletResponse response, Model model) {
        try {
            String filepath = commonPropsUtils.getHtmlUploadPath();
            String fileName = "abc.docx";
            String htmlName = "abc.html";
            final String file = filepath +"/" + fileName;
            File f = new File(file);
            if (!f.exists()) {
                System.out.println("Sorry File does not Exists!");
            } else {
                if (f.getName().endsWith(".docx") || f.getName().endsWith(".DOCX")) {

                    // 1) 加载word文档生成 XWPFDocument对象
                    InputStream in = new FileInputStream(f);
                    XWPFDocument document = new XWPFDocument(in);

                    // 2) 解析 XHTML配置 (这里设置IURIResolver来设置图片存放的目录)
                    File imageFolderFile = new File(commonPropsUtils.getHtmlImagePath());
                    XHTMLOptions options = XHTMLOptions.create().URIResolver(new FileURIResolver(imageFolderFile));
                    //使用相对路径时，使用BasicURIResolver，使用绝对路径可以使用FileURIResolver
//                    options.URIResolver(new BasicURIResolver(webImagePath));
                    options.setExtractor(new FileImageExtractor(imageFolderFile));
                    options.setIgnoreStylesIfUnused(false);
                    options.setFragment(true);

                    // 3) 将 XWPFDocument转换成XHTML
                    OutputStream out = new FileOutputStream(new File(filepath+ "/" + htmlName));
                    XHTMLConverter.getInstance().convert(document, out, options);

                    //也可以使用字符数组流获取解析的内容
//                ByteArrayOutputStream baos = new ByteArrayOutputStream();
//                XHTMLConverter.getInstance().convert(document, baos, options);
//                String content = baos.toString();
//                System.out.println(content);
//                 baos.close();
                } else {
                    System.out.println("Enter only MS Office 2007+ files");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
