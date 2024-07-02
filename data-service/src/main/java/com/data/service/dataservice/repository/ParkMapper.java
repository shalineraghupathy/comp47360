package com.data.service.dataservice.repository;


import com.data.service.dataservice.entity.Park;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ParkMapper {

    List<Park> findAll();
}