import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from "src/expense/expense.entity";


@Entity('expense_categories')
export class ExpenseCategory {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @Column({ type: 'varchar', unique: true })
    uuid: string;

    @OneToMany(() => Expense, expense => expense.expenseCategory)
    expenses: Expense[];

    @BeforeInsert()
    generateUuid() {
        this.uuid = uuidv4();
    }
}
