package com.rain.common.news.service;

import com.rain.common.news.model.PageInfoPo;

import java.util.List;

/**
 * @author Rain
 */
public interface PageService {

    /**
     * 添加
     * @param po
     * @return
     */
    public int addPageInfo(PageInfoPo po);

    /**
     * 添加
     * @param po
     * @return
     */
    public int addPageInfoList(List<PageInfoPo> po);

}
