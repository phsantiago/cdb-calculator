import { InputCDBcalculation, CalculationResult } from '@cdb-calculator/typings';
import { CdbService } from './service';
export declare class CdbController {
    private readonly appService;
    constructor(appService: CdbService);
    cdb(postfixedDTO: InputCDBcalculation): CalculationResult;
}
