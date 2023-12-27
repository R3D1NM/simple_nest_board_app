import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/entity/user.entity';

@Injectable()
export class BoardsService {
    private logger = new Logger('BoardsController')

    // Inject Repository
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){}

    //Get all board list
    async getAllBoards(user: User) : Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board')
        query.where('board.userId = :userId',{userId: user.id})

        const boards = await query.getMany()
        return boards;
    }

    //Create new Board
    createBoard(createBoardDto: CreateBoardDto, user: User) : Promise <Board>{
        return this.boardRepository.createBoard(createBoardDto,user);
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
    async deleteBoard(id:number,user: User): Promise<void> {
        const result = await this.boardRepository.delete({id, user:{id: user.id}})
        //console.log('[delete]',result);

        if(result.affected==0){
            throw new NotFoundException(`Cannot Find Board Id: ${id}`)
        }
        this.logger.log(`User ${user.username} deleted board ${id}`)
    }

    //update status by id
    async updateBoardStatus(id: number, status: BoardStatus) : Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board)
        return board;
    }
}
