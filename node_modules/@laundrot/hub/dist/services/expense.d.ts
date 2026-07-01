export type ExpenseStatus = 'Pending' | 'Approve' | 'Reject';
export interface Expense {
    id_expense: string;
    id_cabang: string;
    nominal: number;
    deskripsi: string;
    kategori: 'Operasional' | 'Dana Darurat' | 'Stok' | 'Mutasi';
    status: ExpenseStatus;
    tanggal_pengajuan: Date;
    tanggal_approval?: Date;
    catatan_approval?: string;
    created_at: Date;
    updated_at: Date;
}
export declare function createExpense(params: {
    id_cabang: string;
    nominal: number;
    deskripsi: string;
    kategori: Expense['kategori'];
}): Expense;
export declare function getExpenseById(id_expense: string): Expense | undefined;
export declare function getExpensesByBranch(id_cabang: string): Expense[];
export declare function updateExpenseStatus(id_expense: string, status: ExpenseStatus, catatan?: string): Expense | null;
export declare function getAllExpenses(): Expense[];
//# sourceMappingURL=expense.d.ts.map