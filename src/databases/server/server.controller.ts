import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common';

import templateCreateServer from '../../json/template/server.json';
import {CreateServerDto} from '../interfaces/create-server.dto';
import {UpdateServerDto} from '../interfaces/update-server.dto';
import {ServerService} from '../server/server.service';

interface req_body {
  name: string;
}

@Controller('server')
export class ServerController {
  constructor(private readonly ServerService: ServerService) {}
  @Post('create')
  async createServer(@Res() response, @Body() body: req_body) {
    try {
      const createServer = {...templateCreateServer};
      createServer['name'] = body['name'];
      const newServer = await this.ServerService.createServer(createServer);

      return response.status(HttpStatus.CREATED).json({
        message : 'Server has been created successfully',
        newServer,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message : 'Error: Student not created!',
        error : 'Bad Request'
      });
    }
  }
}
