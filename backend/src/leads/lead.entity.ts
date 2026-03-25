import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 30 })
  phone: string;

  @Column({ length: 80, nullable: true })
  city: string;

  @Column({ length: 120, nullable: true })
  service: string;


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
