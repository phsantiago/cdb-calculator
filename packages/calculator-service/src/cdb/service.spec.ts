import { CdbService } from './service';

describe('service', () => {
  let appService: CdbService;

  beforeEach(async () => {
    appService = new CdbService();
  });
  describe('TCDI', () => {
    describe('given 13.88', () => {
      it('should return 0.00051591', () => {
        const CDI = 13.88;
        
        expect(appService.calculateTCDI(CDI)).toBe(0.00051591);
      });
    });
  });
})
