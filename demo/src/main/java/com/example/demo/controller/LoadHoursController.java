package com.example.demo.controller;

import com.example.demo.model.LoadHours;

import com.example.demo.service.implementations.LoadHoursServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.sql.Date;


@RestController
@RequestMapping("/api")
public class LoadHoursController {

    @Autowired
    private LoadHoursServiceImpl loadHoursServiceImpl;


    @GetMapping("/loadhour")
    public List<LoadHours> loadHours() {
        return loadHoursServiceImpl.getAllHourLoads();
    }

    @GetMapping("/loadhour/{id}")
    public LoadHours loadHoursById(@PathVariable long id) { return loadHoursServiceImpl.getHourLoadById(id);  }

    @PostMapping("/add")
    public void addHours(@RequestBody LoadHours loadHour) {
        loadHoursServiceImpl.saveHourLoad(loadHour);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteHours(@PathVariable long id) {
        loadHoursServiceImpl.deleteHourLoad(id);
    }

    @PutMapping("/modify")
    public void modifyHours(@RequestBody LoadHours loadHour) {

        loadHoursServiceImpl.updateHourLoad(loadHour);
    }

    @GetMapping("/hours")
    public List<LoadHours> getHoursInPeriod(@RequestParam String initDate, @RequestParam String endDate,@RequestParam(required = false) Long idRecurso) {
        Date initDateAux = Date.valueOf(initDate);
        Date endDateAux = Date.valueOf(endDate);
        if (idRecurso != null) {
            return loadHoursServiceImpl.getResourceHoursInPeriod(initDateAux, endDateAux, idRecurso);
        } else {
            return loadHoursServiceImpl.getAllHoursInPeriod(initDateAux, endDateAux);
        }
    }

}
