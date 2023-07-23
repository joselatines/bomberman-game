import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import templateCreateServer from '../../json/template/server.json';
import { CreateServerDto } from './dto/create-server.dto';
import { ServerService } from '../server/server.service';

@Controller('server')
export class ServerController {
  constructor(private readonly ServerService: ServerService) {}
  @Post('create')
  async createServer(@Res() response, @Body() body: CreateServerDto) {
    try {
      const createServer = { ...templateCreateServer };
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
}
