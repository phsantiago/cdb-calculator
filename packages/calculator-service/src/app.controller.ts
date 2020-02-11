import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/cdb/post-fixed')
  cdb(@Body() postfixedDTO): string {
    return this.appService.calculateCDB(postfixedDTO);
  }
}
