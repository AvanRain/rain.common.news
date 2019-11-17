package com.rain.common.news.dao;

import com.rain.common.news.model.PageInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Rain
 */
@Mapper
public interface PageInfoMapper {

    /**
     * 插入
     * @param po
     * @return
     */
   int insertPageInfo(PageInfoPo po);

    /**
     * 批量插入
     * @param po
     * @return
     */
   int insertBatchPageInfo(List<PageInfoPo> po);

}
