import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import {
  InputCDBcalculation,
  CalculationResult,
} from '@cdb-calculator/typings';
import { CdbService } from './service';

@Controller('/cdb')
export class CdbController {
  constructor(private readonly appService: CdbService) {}

  @Post('/post-fixed')
  @HttpCode(200)
  cdb(@Body() postfixedDTO: InputCDBcalculation): CalculationResult {
    return this.appService.calculateCDB(postfixedDTO);
  }
}
