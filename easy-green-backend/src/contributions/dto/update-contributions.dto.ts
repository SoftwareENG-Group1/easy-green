import { PartialType } from '@nestjs/mapped-types';
import { CreateContributionsDto } from './create-contributions.dto';


export class UpdateContributionsDto extends PartialType(CreateContributionsDto) {

    

}