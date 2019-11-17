package com.rain.common.news;

import com.alibaba.fastjson.JSON;
import com.rain.common.news.model.PageInfoPo;
import com.rain.common.news.service.PageService;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
class ApplicationTests {

	@Autowired
	private PageService pageService;

	@Test
	void contextLoads() {

		PageInfoPo po = new PageInfoPo();
		po.setCode("abcd");
		po.setName("1234567");
		po.setPageType(1);
		po.setPageUrl("http://www.abd.com/aba/a.actoin?a=1234");
		po.setVideoUrl("http://www.abd.com/aba/video?a=1234");
		po.setExcelUrl("d:/abade/abad");
		po.setCreateUser("test");
		po.setIssue(12);
		po.setRemark("测试");
		int i = pageService.addPageInfo(po);
		System.out.println(i);

	}

	@Test
	public void readExcel(){
		String fileName = "C:\\Users\\Rain\\Desktop\\文档\\对应表副本.xlsx";
		String fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
		List<PageInfoPo> poList = new ArrayList<>();
		//读取excel文件
		InputStream is = null;
		try {
			is = new FileInputStream(fileName);
			//获取工作薄
			Workbook wb = null;
			if (fileType.equals("xls")) {
				wb = new HSSFWorkbook(is);
			} else if (fileType.equals("xlsx")) {
				wb = new XSSFWorkbook(is);
			} else {
				System.out.println(1);
				return ;
			}

			//读取第一个工作页sheet
			int sheetNum = wb.getNumberOfSheets();
			if (sheetNum <= 0) {
				System.out.println(2);
				return;
			}
			for (int i = 0; i < sheetNum; i++){
				Sheet sheet = wb.getSheetAt(i);
				//第一行为标题
				for (Row row : sheet) {
					PageInfoPo po = new PageInfoPo();
					for(int j = 0; j < row.getLastCellNum(); j++){
						Cell cell = row.getCell(j);
						cell.setCellType(CellType.STRING);
						String value = cell.getStringCellValue();
						switch (j){
							case 0:
								po.setCode(value);
								break;
							case 1:
								po.setName(value);
								break;
							case 2:
								if (value.equalsIgnoreCase("T1")){
									po.setPageType(1);
								} else if (value.equalsIgnoreCase("T2")){
									po.setPageType(2);
								}
								break;
							case 3:
								po.setPageUrl(value);
								break;
							case 4:
								po.setVideoUrl(value);
								break;
							default:break;
						}
					}
					poList.add(po);
				}
			}
			System.out.println(JSON.toJSONString(poList));

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (is != null) is.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

}
