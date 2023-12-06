import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    description: string;

    @Column({name: 'is_completed', default: false})
    isCompleted?: boolean;

    @CreateDateColumn({type: 'timestamp with time zone', name: 'created_at'})
    createdAt?: Date;

    @UpdateDateColumn({type: 'timestamp with time zone', name: 'updated_at'})
    updatedAt?: Date;
}
