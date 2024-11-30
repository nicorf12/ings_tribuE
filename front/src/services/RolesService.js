// src/services/ProjectService.js
import {get} from '../utils/HttpRequest.js';
import {put} from '../utils/HttpRequest';

const baseUrl = {
    getIncomes: {
        prod: "https://two0242c-is-squad12.onrender.com/finance/incomes",
        test: "http://localhost:9290/finance/projects/incomes"
    },
    saveIncomes: {
        prod: "https://two0242c-is-squad12.onrender.com/finance/incomes",
        test: "http://localhost:9290/finance/projects/incomes"
    }
};

export const getRoles = async (year, month) => {
    return await testRoles();
    try {
        const url = `${baseUrl.prod}?year=${year}&month=${month}`;
        return await get(url);
    } catch (error) {
        console.error("Error getting roles:", error);
        alert("Error obteniendo los roles. Por favor, intente nuevamente mas tarde.");
        return null;
    }
};


export const updateRoles = async (roles) => {
    try {
        const url = baseUrl.saveIncomes.prod;
        return await put(url, roles);
    } catch (error) {
        console.error("Error updating roles:", error);
        alert("Error actualizando los roles. Por favor, intente nuevamente mas tarde.");
        throw error;
    }
};


const testRoles = async() => [
    {id: 1, role: {id: '1', name: 'Desarrollador', experience: 'Junior'}, incomeByHour: 10},
    {id: 2, role: {id: '2', name: 'Desarrollador', experience: 'Semi Senior'}, incomeByHour: 15},
    {id: 3, role: {id: '3', name: 'Desarrollador', experience: 'Senior'}, incomeByHour: 20}
];
