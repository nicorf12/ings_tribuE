package com.example.demo.repository;

import com.example.demo.model.LoadHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface LoadHoursRepository extends JpaRepository<LoadHours, Long> {

    @Query(value = "SELECT * FROM load_hour l WHERE l.idResource = :idResource AND l.date >= :start AND l.date <= :end", nativeQuery = true)
    public List<LoadHours> findHoursInPeriodOfResource(
            @Param("start") Date start,
            @Param("end") Date end,
            @Param("idResource") Long idResource

    );


    @Query(value = "SELECT * FROM load_hour l WHERE l.date >= :start AND l.date <= :end", nativeQuery = true)
    public List<LoadHours> findHoursInPeriod(
            @Param("start") Date start,
            @Param("end") Date end

    );

}
