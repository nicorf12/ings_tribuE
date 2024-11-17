package com.example.demo.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "loadHour")
public class LoadHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long idResource;
    private long idTask;
    private Date date;
    private Time time;
    private int costPerHour;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getIdResource() {
        return idResource;
    }

    public void setIdResource(long idResource) {
        this.idResource = idResource;
    }

    public long getIdTask() {
        return idTask;
    }

    public void setIdTask(long idTask) {
        this.idTask = idTask;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public int getCostPerHour() {
        return costPerHour;
    }

    public void setCostPerHour(int costPerHour) {
        this.costPerHour = costPerHour;
    }
}
