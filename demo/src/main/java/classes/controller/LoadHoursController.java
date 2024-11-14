package classes.controller;

import classes.model.LoadHours;

import classes.service.implementations.LoadHoursServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/")
public class LoadHoursController {

    @Autowired
    private LoadHoursServiceImpl loadHoursServiceImpl;


    @GetMapping
    public List<LoadHours> loadHours() {
        return loadHoursServiceImpl.getAllHourLoads();
    }

    @GetMapping("/{id}")
    public LoadHours loadHoursById(@PathVariable long id) {
        return loadHoursServiceImpl.getHourLoadById(id)  ;  }

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
    public List<LoadHours> getHoursInPeriod(@RequestParam Date initDate, @RequestParam Date endDate,@RequestParam long id_recurso) {
        return loadHoursServiceImpl.getResourceHoursInPeriod(initDate,endDate,id_recurso);

    }

    @GetMapping("/hours")
    public List<LoadHours> getAllHoursInPeriod(@RequestParam Date initDate, @RequestParam Date endDate) {
        return loadHoursServiceImpl.getAllHoursInPeriod(initDate, endDate);

    }
}
