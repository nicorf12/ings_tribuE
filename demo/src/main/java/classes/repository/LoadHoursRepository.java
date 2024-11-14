package classes.repository;

import classes.model.LoadHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface LoadHoursRepository extends JpaRepository<LoadHours, Long> {

    @Query(value = "SELECT * FROM loadhour l WHERE l.idResource = :idResource AND l.date >= :start AND l.date <= :end", nativeQuery = true)
    public List<LoadHours> findHoursInPeriodOfResource(
            @Param("start") Date start,
            @Param("end") Date end,
            @Param("idResource") Long idResource

    );


    @Query(value = "SELECT * FROM loadhour l WHERE l.date >= :start AND l.date <= :end", nativeQuery = true)
    public List<LoadHours> findHoursInPeriod(
            @Param("start") Date start,
            @Param("end") Date end

    );

}
