package com.example.demo.service.contracts;

import com.example.demo.model.LoadHours;
import com.example.demo.repository.LoadHoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Date;
import java.util.List;

public interface LoadHoursService {

    public List<LoadHours> getAllHourLoads();

    public LoadHours getHourLoadById(Long id);

    public void saveHourLoad(LoadHours load);

    public void updateHourLoad( LoadHours updatedLoad);

    public void deleteHourLoad(Long id);

    public List<LoadHours> getResourceHoursInPeriod(Date start, Date end,long idRecurso);

    public List<LoadHours> getAllHoursInPeriod(Date initDate, Date endDate);
}
