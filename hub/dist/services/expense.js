"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpense = createExpense;
exports.getExpenseById = getExpenseById;
exports.getExpensesByBranch = getExpensesByBranch;
exports.updateExpenseStatus = updateExpenseStatus;
exports.getAllExpenses = getAllExpenses;
const EXPENSES = [];
function createExpense(params) {
    const expense = {
        id_expense: `EXP-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        id_cabang: params.id_cabang,
        nominal: params.nominal,
        deskripsi: params.deskripsi,
        kategori: params.kategori,
        status: 'Pending',
        tanggal_pengajuan: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    };
    EXPENSES.push(expense);
    return expense;
}
function getExpenseById(id_expense) {
    return EXPENSES.find((e) => e.id_expense === id_expense);
}
function getExpensesByBranch(id_cabang) {
    return EXPENSES.filter((e) => e.id_cabang === id_cabang);
}
function updateExpenseStatus(id_expense, status, catatan) {
    const expense = getExpenseById(id_expense);
    if (!expense)
        return null;
    expense.status = status;
    expense.updated_at = new Date();
    if (status === 'Approve' || status === 'Reject') {
        expense.tanggal_approval = new Date();
        expense.catatan_approval = catatan;
    }
    return expense;
}
function getAllExpenses() {
    return [...EXPENSES];
}
//# sourceMappingURL=expense.js.map