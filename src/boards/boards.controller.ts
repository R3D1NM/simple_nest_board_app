import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from 'src/entity/board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardService:BoardsService){}
    
    // @Get() //Get all board list
    // getAllBoard() : Board[] {
    //     return this.boardService.getAllBoards();
    // }

    // @Post() //Create new Board
    // @UsePipes(ValidationPipe) //validate
    // createBoard(@Body() createBoardDto: CreateBoardDto) : Board{
    //     return this.boardService.createBoard(createBoardDto);
    // }

    @Get('/:id') //Get a board by id
    getBoardById(@Param('id') id :number): Promise<Board> {
        return this.boardService.getBoardById(id)
    }

    // @Delete('/:id') //Delete a board by id
    // deleteBoard(@Param('id') id : string) : void {
    //     this.boardService.deleteBoard(id)
    // }

    // @Patch('/:id/status') //Update status of a board by id
    // updateBoardStatus(@Param('id') id : string, @Body('status',BoardStatusValidationPipe) status : BoardStatus): Board {
    //     return this.boardService.updateBoardStatus(id,status)
    // }
}
