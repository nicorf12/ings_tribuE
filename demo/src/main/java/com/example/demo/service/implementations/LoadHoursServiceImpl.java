package com.example.demo.service.implementations;

import com.example.demo.model.LoadHours;
import com.example.demo.repository.LoadHoursRepository;
import com.example.demo.service.contracts.LoadHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class LoadHoursServiceImpl implements LoadHoursService {
    @Autowired
    private LoadHoursRepository loadHoursRepository;

    public List<LoadHours> getAllHourLoads() {
        return loadHoursRepository.findAll();
    }

    public LoadHours getHourLoadById(Long id) {
        return loadHoursRepository.findById(id).orElse(null);
    }

    public void saveHourLoad(LoadHours load) {
        loadHoursRepository.save(load);
    }

    public void updateHourLoad(LoadHours updatedLoad) {
        if (loadHoursRepository.existsById(updatedLoad.getId())) {
            loadHoursRepository.save(updatedLoad);
        }
    }

    public void deleteHourLoad(Long id) {
        loadHoursRepository.deleteById(id);
    }

    @Override
    public List<LoadHours> getResourceHoursInPeriod(Date start, Date end, long idRecurso) {
        return loadHoursRepository.findHoursInPeriodOfResource(start,end,idRecurso);
    }





    @Override
    public List<LoadHours> getAllHoursInPeriod(Date start, Date end) {
        return loadHoursRepository.findHoursInPeriod(start,end);
    }
}
