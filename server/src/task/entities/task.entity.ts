import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['new', 'in_progress', 'done', 'archived'],
    default: 'new',
  })
  status: 'new' | 'in_progress' | 'done' | 'archived';

  @Column({ nullable: false })
  priority: number;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @Column({
    type: 'enum',
    enum: ['karada_u', 'prohuntr', 'other'],
  })
  karada_project: 'karada_u' | 'prohuntr' | 'other';

  @Column({ default: 'KARADA_FULLSTACK_TEST', nullable: false })
  karada_test_label: string;

  @Column({ nullable: false })
  importance_score: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
