import { Injectable } from "@nestjs/common";
import { Board } from "src/entity/board.entity";
import { DataSource, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";
import { User } from "src/entity/user.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource : DataSource){
        super(Board, dataSource.createEntityManager())
    }

    //create new board
    async createBoard(createBoardDto: CreateBoardDto, user: User) : Promise <Board>{
        const {title, description} = createBoardDto
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })
        await this.save(board)
        return board;
    }

}