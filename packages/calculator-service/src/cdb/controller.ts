import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import {
  InputCDBcalculation,
  CalculationResult,
} from '@cdb-calculator/typings';
import { AppService } from './service';

@Controller('/cdb')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/post-fixed')
  @HttpCode(200)
  cdb(@Body() postfixedDTO: InputCDBcalculation): CalculationResult {
    return this.appService.calculateCDB(postfixedDTO);
  }
}
