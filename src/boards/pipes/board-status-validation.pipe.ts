import { BadRequestException, PipeTransform } from "@nestjs/common";
import {BoardStatus} from '../board.model'

export class BoardStatusValidationPipe implements PipeTransform{
    readonly StatusOption = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    private isStatusValid(status:any) :boolean {
        const index = this.StatusOption.indexOf(status)
        return index!==-1;
    }


    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is Not a Status`)
        }
        
        return value
    }
}