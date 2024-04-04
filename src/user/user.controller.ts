import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.userService.create(createUserDto);
    return res.status(201).json(result);
  }
  @Public()
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.findAll();
    return res.status(200).json(result);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.userService.findOne(id);
    res.status(200).json(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send('User not found');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.userService.remove(id);
    if (result) {
      res.status(204).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  }
}
