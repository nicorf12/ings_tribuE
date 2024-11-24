package com.example.demo.model;

public class IncomeDetail {

    private long id;

    private RoleApi role;

    private int incomeByHour;

    private int month;

    private int year;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



    public int getIncomeByHour() {
        return incomeByHour;
    }

    public void setIncomeByHour(int incomeByHour) {
        this.incomeByHour = incomeByHour;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
