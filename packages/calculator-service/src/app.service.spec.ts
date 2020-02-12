import { AppService } from './app.service';

describe('service', () => {
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
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
