import { ExpenseCategory } from "src/expense-category/expense-category.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity("expenses")
export class Expense {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number;

    @Column()
    description: string;

    @ManyToOne(() => ExpenseCategory, category => category.expenses, { eager: true })
    @JoinColumn({ name: 'expense_category_id' })
    expenseCategory: ExpenseCategory | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'varchar', unique: true })
    uuid: string;

    @BeforeInsert()
    generateUuid() {
        this.uuid = uuidv4();
    }
}