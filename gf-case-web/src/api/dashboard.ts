import api from "./axios";

import type { DashboardData } from "../types/dashboard";


export async function getDashboard() {
    return api.get<DashboardData>("/dashboard");
}