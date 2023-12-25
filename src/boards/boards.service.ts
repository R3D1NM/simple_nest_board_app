import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
    // Inject Repository
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){}

    // //Get all board list
    // getAllBoards() : Board[] {
    //     return this.boards;
    // }

    //Create new Board
    createBoard(createBoardDto: CreateBoardDto) : Promise <Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    //get board by id
    async getBoardById(id:number): Promise <Board>{
        const found = await this.boardRepository.findOneBy({id})

        if(!found){
            throw new NotFoundException(`Cannot Find Board Id: ${id}`)
        }

        return found;
    }

    //delete board by id
    async deleteBoard(id:number): Promise<void> {
        const result = await this.boardRepository.delete(id)
        console.log('[delete]',result);

        if(result.affected==0){
            throw new NotFoundException(`Cannot Find Board Id: ${id}`)
        }
    }

    //update status by id
    async updateBoardStatus(id: number, status: BoardStatus) : Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board)
        return board;
    }
}
