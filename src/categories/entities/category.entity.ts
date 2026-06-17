import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";


import { User } from "src/users/entities/user.entity";


@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({
        nullable: true,
    })
    description?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.categories)
    user!: User;
}