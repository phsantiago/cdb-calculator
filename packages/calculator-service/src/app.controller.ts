import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/cdb/post-fixed')
  @HttpCode(200)
  cdb(@Body() postfixedDTO): any {
    return this.appService.calculateCDB(postfixedDTO);
  }
}
