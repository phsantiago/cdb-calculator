import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Health check ok!"', () => {
      expect(appController.getHello()).toBe('Health check ok!');
    });
  });
  describe('/cdb/post-fixed', () => {
    describe('given an investment date, cdbRate and currentDate', () => {
      it('should return a daily unit price', () => {
        const mockConsumer = {
          "investmentDate":"2016-11-14",
          "cdbRate": 103.5,
          "currentDate":"2016-11-16"
        }

        expect(appController.cdb(mockConsumer)).toBe([
          {
            "date": "2016-11-14",
            "unitPrice": 1000.53397
          },
          {
            "date": "2016-11-16",
            "unitPrice": 1001.06822
          }
        ]);
      });
    });
  });
});
