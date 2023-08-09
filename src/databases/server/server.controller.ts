import {
  Body,
  Query,
  Controller,
  HttpStatus,
  Post,
  Get,
  Res,
  Render,
} from '@nestjs/common';

import templateCreateServer from '../../json/template/server.json';
import { ServerService } from '../server/server.service';
import { JoinServerDto } from './dto/join-server.dto';
import { CreateServerDto } from './dto/create-server.dto';

@Controller('server')
export class ServerController {
  constructor(private readonly ServerService: ServerService) {}
  @Post('create')
  async createServer(@Res() response, @Body() body: CreateServerDto) {
    try {
      const createServer = structuredClone(templateCreateServer);
      createServer['name'] = body['name'];
      const newServer = await this.ServerService.createServer(createServer);

      // TODO: upgrade this
      return response.status(HttpStatus.CREATED).json({
        message: 'Server has been created successfully',
        newServer,
      });
    } catch (err) {
      // TODO: upgrade this
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('join')
  @Render('game')
  async joinPlayer(@Query() query: JoinServerDto): Promise<any> {
    return this.ServerService.joinPlayer(query);
  }
}
