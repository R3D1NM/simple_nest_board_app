import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    // Inject Repository
    constructor(
        @InjectRepository(Board)
        private boardRepository : Repository<Board>
    ){}

    // //Get all board list
    // getAllBoards() : Board[] {
    //     return this.boards;
    // }

    //Create new Board
    async createBoard(createBoardDto: CreateBoardDto) : Promise <Board>{
        const {title, description} = createBoardDto
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.boardRepository.save(board)
        return board;
    }

    //get board by id
    async getBoardById(id:number): Promise <Board>{
        const found = await this.boardRepository.findOneBy({id})

        if(!found){
            throw new NotFoundException(`Cannot Find Board Id: ${id}`)
        }

        return found;
    }

    // //delete board by id
    // deleteBoard(id:string): void {
    //     const found = this.getBoardById(id)
    //     this.boards = this.boards.filter((board)=> board.id !==found.id);
    // }

    // //update status by id
    // updateBoardStatus(id: string, status: BoardStatus) : Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
