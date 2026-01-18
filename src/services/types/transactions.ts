export interface TransactionOverview {
    totalCashInflow: number,
    totalApprovedWithdrawals: number,
    netBalance: number,
    transactionsThisMonth: number,
}

export interface MonthlyDuesPayment {
    month: string;
    totalPayment: number
}

export interface DuesPaymentVisualsResponse {
    year: number;
    monthlyDuesPayment: MonthlyDuesPayment[]
}