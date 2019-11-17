package com.rain.common.news.service.impl;

import com.rain.common.news.dao.PageInfoMapper;
import com.rain.common.news.model.PageInfoPo;
import com.rain.common.news.service.PageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Rain
 */
@Service("pageService")
public class PageServiceImpl implements PageService {

    private static final Logger log = LoggerFactory.getLogger(PageService.class);

    @Autowired
    private PageInfoMapper pageInfoMapper;

    @Override
    public int addPageInfo(PageInfoPo po) {
        try {
            return pageInfoMapper.insertPageInfo(po);
        } catch (Exception e) {
            log.error("插入异常",e);
        }
        return -1;
    }

    @Override
    public int addPageInfoList(List<PageInfoPo> po) {
        return 0;
    }
}
