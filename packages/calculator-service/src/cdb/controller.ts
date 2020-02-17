import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AppService } from './service';

type postFixedCdbDTO = {
  investmentDate: string,
  cdbRate: number,
  currentDate: string,
  price?: number
}

@Controller('/cdb')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/post-fixed')
  @HttpCode(200)
  // TODO: remover any
  cdb(@Body() postfixedDTO: postFixedCdbDTO): any {
    return this.appService.calculateCDB(postfixedDTO);
  }
}
