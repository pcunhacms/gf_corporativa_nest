import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Transaction)
    private repo: Repository<Transaction>,
  ) {}

  async getDashboard(userId: string) {
    const transactions = await this.repo.find({
      where: {
        user: { id: userId },
      },
      relations: {
        category: true,
      },
    });

    const income = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((acc, t) => acc + Number(t.value), 0);

    const expense = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + Number(t.value), 0);

    const balance = income - expense;

    // agrupar por categoria (só expenses)
    const categoryMap: Record<string, number> = {};

    transactions
      .filter(t => t.type === 'EXPENSE')
      .forEach(t => {
        const name = t.category.name;

        categoryMap[name] = (categoryMap[name] || 0) + Number(t.value);
      });

    const topCategories = Object.entries(categoryMap)
      .map(([category, total]) => ({
        category,
        total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);

    return {
      balance,
      totalIncome: income,
      totalExpense: expense,
      topCategories,
    };
  }
}