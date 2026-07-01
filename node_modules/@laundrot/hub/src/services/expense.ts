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

const EXPENSES: Expense[] = [];

export function createExpense(params: {
  id_cabang: string;
  nominal: number;
  deskripsi: string;
  kategori: Expense['kategori'];
}): Expense {
  const expense: Expense = {
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

export function getExpenseById(id_expense: string): Expense | undefined {
  return EXPENSES.find((e) => e.id_expense === id_expense);
}

export function getExpensesByBranch(id_cabang: string): Expense[] {
  return EXPENSES.filter((e) => e.id_cabang === id_cabang);
}

export function updateExpenseStatus(
  id_expense: string,
  status: ExpenseStatus,
  catatan?: string,
): Expense | null {
  const expense = getExpenseById(id_expense);
  if (!expense) return null;

  expense.status = status;
  expense.updated_at = new Date();

  if (status === 'Approve' || status === 'Reject') {
    expense.tanggal_approval = new Date();
    expense.catatan_approval = catatan;
  }

  return expense;
}

export function getAllExpenses(): Expense[] {
  return [...EXPENSES];
}
