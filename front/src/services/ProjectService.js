// src/services/ProjectService.js
import {get} from '../utils/HttpRequest.js';

const baseUrl = {
    prod: "https://two0242c-is-squad12.onrender.com/finance/projects/reports",
    test: "http://localhost:9290/finance/projects/reports"
};

export const getProjects = async (year) => {
    return await testProjects();
    const url = `${baseUrl.prod}?year=${year}`;
    return await get(url);
};


const testProjects = async() => [
    { project: { id: 1, name: 'P1', description: 'Description P1' }, cost: { byMonth: { 1: '100,1', 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: '1200,1' } },
    { project: { id: 2, name: 'P2', description: 'Description P2' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 0, 12: 0 }, total: 1000 }},
    { project: { id: 3, name: 'P3', description: 'Description P3' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 1200 } },
    { project: { id: 4, name: 'P4', description: 'Description P4' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 1200 }},
    { project: { id: 5, name: 'P5', description: 'Description P5' }, cost: { byMonth: { 1: 50000, 2: 50000, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 51000 }},
];
