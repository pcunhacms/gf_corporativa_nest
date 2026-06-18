export type DashboardData = {
    balance: number;
    totalIncome: number;
    totalExpense: number;
    topCategories: {
        name: string;
        total: number;
    }[];

};