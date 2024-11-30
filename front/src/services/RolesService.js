// src/services/ProjectService.js
import {get} from '../utils/HttpRequest.js';

const baseUrl = {
    prod: "https://two0242c-is-squad12.onrender.com/finance/incomes",
    test: "http://localhost:9290/finance/projects/incomes"
};

export const getRoles = async (year, month) => {
    return await testRoles();
    const url = `${baseUrl.prod}?year=${year}&month=${month}`;
    return await get(url);
};


const testRoles = async() => [
    {id: 1, role: {id: '1', name: 'Desarrollador', experience: 'Junior'}, incomeByHour: 10},
    {id: 2, role: {id: '2', name: 'Desarrollador', experience: 'Semi Senior'}, incomeByHour: 15},
    {id: 3, role: {id: '3', name: 'Desarrollador', experience: 'Senior'}, incomeByHour: 20}
];
