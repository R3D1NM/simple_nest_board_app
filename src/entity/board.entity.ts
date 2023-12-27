import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "src/boards/board-status.enum";
import { User } from "./user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description : string;

    @Column()
    status : BoardStatus;

    @ManyToOne(() => User, user => user.boards, {eager:false})
    user: User
}